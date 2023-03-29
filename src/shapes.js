/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */

/**
 *
 *
 * Let’s call the resulting data structure a “proto-geometry” because it has
 * the beginnings of a geometry but nothing close to what three.js has (yet).
 */
const sphere = () => {
  // The core icosahedron coordinates.
  const X = 0.525731112119133606
  const Z = 0.850650808352039932
  function midpoint (v1, v2) {
    //((x1 + x2)/2, (y1 + y2)/2, (z1 + z2)/2)
    return [((v1[0] + v2[0])/2), ((v1[1] + v2[1])/2), ((v1[2] + v2[2])/2)]
  }
  const vertices = [
    [-X, 0.0, Z],
    [X, 0.0, Z],
    [-X, 0.0, -Z],
    [X, 0.0, -Z],
    [0.0, Z, X],
    [0.0, Z, -X],
    [0.0, -Z, X],
    [0.0, -Z, -X],
    [Z, X, 0.0],
    [-Z, X, 0.0],
    [Z, -X, 0.0],
    [-Z, -X, 0.0]
  ]
  const facesByIndex = [
    [1, 4, 0],
    [4, 9, 0],
    [4, 5, 9],
    [8, 5, 4],
    [1, 8, 4],
    [1, 10, 8],
    [10, 3, 8],
    [8, 3, 5],
    [3, 2, 5],
    [3, 7, 2],
    [3, 10, 7],
    [10, 6, 7],
    [6, 11, 7],
    [6, 0, 11],
    [6, 1, 0],
    [10, 1, 6],
    [11, 0, 9],
    [2, 11, 9],
    [5, 2, 9],
    [11, 2, 7],
  ]
  //Subdivide each face into four smaller triangles by adding 
  //new vertices at the midpoint of each edge 
  for (let i = 0; i < 1; i++) {
    const initVertLength = vertices.length
    for (let i = 0; i < facesByIndex.length; i++) {
      const v1 = midpoint(vertices[facesByIndex[i][0]], vertices[facesByIndex[i][1]])
      const v2 = midpoint(vertices[facesByIndex[i][1]], vertices[facesByIndex[i][2]])
      const v3 = midpoint(vertices[facesByIndex[i][2]], vertices[facesByIndex[i][0]])
      vertices.push(v1, v2, v3)
    }
    for (let i = initVertLength - 1; i < vertices.length - 3; i = i + 3) {
      facesByIndex.push([i + 1, i + 2, i + 3])
    }
  }
  return { vertices, facesByIndex }
}


const cylinder = (radius, height, radialSegments) => {
  const vertices = [
    [0, height, 0] // top vertex
  ]
  // generate base vertices around the top vertex
  for (let i = 0; i < radialSegments; i++) {
    const angle = (i / radialSegments) * Math.PI * 2
    const x = Math.sin(angle) * radius
    const y = height
    const z = Math.cos(angle) * radius
    vertices.push([x, y, z])
  }

  vertices.push([0, -height, 0]) // bottom vertex
  // generate base vertices around the bottom vertex
  for (let i = 0; i < radialSegments; i++) {
    const angle = (i / radialSegments) * Math.PI * 2
    const x = Math.sin(angle) * radius
    const y = -height
    const z = Math.cos(angle) * radius
    vertices.push([x, y, z])
  }

  const facesByIndex = []
  // generate faces for the top
  for (let i = 1; i < radialSegments; i++) {
    facesByIndex.push([0, i, i + 1])
  }
  facesByIndex.push([0, radialSegments, 1])
  // generate faces for the base
  for (let i = 1; i < radialSegments; i++) {
    facesByIndex.push([1 + radialSegments, i + 1 + radialSegments, i + 2 + radialSegments])
  }
  facesByIndex.push([1 + radialSegments, 1 + radialSegments + radialSegments, 2 + radialSegments])
  // generate faces for the sides
  facesByIndex.push([radialSegments + 2, 1, radialSegments])
  facesByIndex.push([radialSegments + 2, 1 + radialSegments + radialSegments, radialSegments])
  for (let i = 2; i < radialSegments + 1; i++) {
    facesByIndex.push([i + 1 + radialSegments, i, i - 1])
    facesByIndex.push([i + 1 + radialSegments, i + radialSegments, i - 1])
  }

  return { vertices, facesByIndex }
}

/**
 * Utility function for turning our nascent geometry object into a “raw” coordinate array
 * arranged as triangles.
 */
const toRawTriangleArray = protoGeometry => {
  const result = []

  protoGeometry.facesByIndex.forEach(face => {
    face.forEach(vertexIndex => {
      result.push(...protoGeometry.vertices[vertexIndex])
    })
  })

  return result
}

/*
 * Utility function for turning indexed vertices into a “raw” coordinate array
 * arranged as line segments.
 */
const toRawLineArray = protoGeometry => {
  const result = []

  protoGeometry.facesByIndex.forEach(face => {
    // Oddly enough, the inner loop here is clearer as a `for` loop because we
    // need to access the current vertex index and the one after that (wrapping
    // around once we get to the end).
    for (let i = 0, maxI = face.length; i < maxI; i += 1) {
      // “Connect the dots.”
      result.push(
        ...protoGeometry.vertices[face[i]],
        ...protoGeometry.vertices[face[(i + 1) % maxI]] // Lets us wrap around to 0.
      )
    }
  })

  return result
}

const cone = () => {
  const radius = 0.9 * 0.5
  const height = 1.2 * 0.5

  const vertices = [
    [0, height, 0] // top vertex
  ]

  // generate base vertices around the circle
  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2
    const x = Math.sin(angle) * radius
    const y = 0
    const z = Math.cos(angle) * radius
    vertices.push([x, y, z])
  }

  const facesByIndex = []

  // generate faces for the base
  for (let i = 1; i < 8; i++) {
    facesByIndex.push([0, i, i + 1])
  }
  facesByIndex.push([0, 8, 1])

  // generate faces for the sides
  for (let i = 1; i < 8; i++) {
    facesByIndex.push([i, i + 1, 0])
  }
  facesByIndex.push([8, 1, 0])

  return { vertices, facesByIndex }
}

const hexagonalPrism = () => {
  return {
    vertices: [
      [0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5],
      [0.5, 0.5, 0.5]
    ],
    facesByIndex: [
      [0, 1, 2],
      [0, 2, 3]

      // [0, 1, 2], // Top Hexagon
      // [1, 2, 3],
      // [2, 3, 4],
      // [3, 4, 5],
      // [0, 4, 5],
      // [6, 7, 8], // Bottom Hexagon
      // [7, 8, 9],
      // [8, 9, 10],
      // [9, 10, 11],
      // [0, 6, 7], // edges to connect top & bottom heaxagon
      // [1, 7, 8],
      // [2, 8, 9],
      // [3, 9, 10],
      // [4, 10, 11],
      // [5, 11, 6]
    ]
  }
}

export { sphere, cone, cylinder, toRawTriangleArray, toRawLineArray, hexagonalPrism }
