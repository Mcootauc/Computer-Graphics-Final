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
function sphere(radius, latitudeSegments, longitudeSegments) {
  let vertices = [];
  let facesByIndex = [];

  for (let i = 0; i <= latitudeSegments; i++) {
    let theta = i * Math.PI / latitudeSegments;
    let sinTheta = Math.sin(theta);
    let cosTheta = Math.cos(theta);

    for (let j = 0; j <= longitudeSegments; j++) {
      let phi = j * 2 * Math.PI / longitudeSegments;
      let sinPhi = Math.sin(phi);
      let cosPhi = Math.cos(phi);

      let x = radius * sinTheta * cosPhi;
      let y = radius * sinTheta * sinPhi;
      let z = radius * cosTheta;

      vertices.push(x, y, z);

      if (i < latitudeSegments && j < longitudeSegments) {
        let first = i * (longitudeSegments + 1) + j;
        let second = first + longitudeSegments + 1;

        facesByIndex.push(first, second, first + 1);
        facesByIndex.push(second, second + 1, first + 1);
      }
    }
  }
  console.log("radius: " + radius + "latitudeSegments: " + latitudeSegments + "longitudeSegments: " + longitudeSegments)
  console.log("vertices: " + vertices)
  console.log("facesByIndex: " + facesByIndex)
  return { vertices, facesByIndex };
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

const pentagonalPyramid = () => {
  return {
    vertices: [
      [0.5, 0.5, 0.5],
      [-0.5, 0.5, -0.5],
      [-0.5, -0.5, -0.5],
      [0.5, -0.5, -0.5],
      [0.5, 0.5, -0.5],
      [0.5, 0.5, -0.5]
    ],
    facesByIndex: [
      [0, 1, 2], // Around
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 5],
      [0, 1, 5],

      [1, 2, 3], // Base
      [1, 3, 4],
      [1, 4, 5]
    ]
  }
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
      [0, 1, 2], // Top Hexagon
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
      [0, 4, 5],

      [6, 7, 8], // Bottom Hexagon
      [7, 8, 9],
      [8, 9, 10],
      [9, 10, 11],

      [0, 6, 7], // edges to connect top & bottom heaxagon
      [1, 7, 8],
      [2, 8, 9],
      [3, 9, 10],
      [4, 10, 11],
      [5, 11, 6]
    ]
  }
}

export { sphere, cone, cylinder, toRawTriangleArray, toRawLineArray, pentagonalPyramid, hexagonalPrism }
