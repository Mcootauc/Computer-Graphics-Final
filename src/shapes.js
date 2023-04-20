  import Vector from './vector.js'
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

  //takes in a parameter of radius, height, and radial segments
  //also takes in a parameter true or false to choose whether you want a wireframe or not
  const sphere = (scaleFactor, subDivCount) => {
  // The core icosahedron coordinates.
  const X = 0.525731112119133606 * scaleFactor
  const Z = 0.850650808352039932 * scaleFactor

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
  
  let facesByIndex = [
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
    [11, 2, 7]
  ]

  // Subdivide the icosahedron
  function subdivideIcosahedron() {
    const newVertices = []
    const newFaces = []

    for (const element of facesByIndex) {
      const face = element
      const v1 = vertices[face[0]]
      const v2 = vertices[face[1]]
      const v3 = vertices[face[2]]

      // Get the midpoints of each edge
      const v4 = normalizeVertex(getMidpoint(v1, v2))
      const v5 = normalizeVertex(getMidpoint(v2, v3))
      const v6 = normalizeVertex(getMidpoint(v3, v1))

      // Add the new vertices to the list
      newVertices.push(v4, v5, v6)

      // Add the new faces to the list
      const v4Index = vertices.length + newVertices.length - 3
      const v5Index = vertices.length + newVertices.length - 2
      const v6Index = vertices.length + newVertices.length - 1
      newFaces.push([face[0], v4Index, v6Index])
      newFaces.push([face[1], v5Index, v4Index])
      newFaces.push([face[2], v6Index, v5Index])
      newFaces.push([v4Index, v5Index, v6Index])
    }

    // Add the new vertices and faces to the main arrays
    vertices.push(...newVertices)
    facesByIndex = newFaces
  }

  // Get the midpoint between two vertices
  function getMidpoint(v1, v2) {
    return [(v1[0] + v2[0]) / 2, (v1[1] + v2[1]) / 2, (v1[2] + v2[2]) / 2]
  }

  // Normalize a vertex to be on the surface of the sphere
  function normalizeVertex(v) {
    const length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2])
    const normalized = [v[0] / length, v[1] / length, v[2] / length]
    return [normalized[0] * scaleFactor, normalized[1] * scaleFactor, normalized[2] * scaleFactor]
  }

  //sub divides to the desired amount
  for (let i = 0; i < subDivCount; i++) {
    subdivideIcosahedron()
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
    facesByIndex.push([1 + radialSegments, i + 2 + radialSegments, i + 1 + radialSegments])
  }
  facesByIndex.push([1 + radialSegments, 2 + radialSegments, 1 + radialSegments + radialSegments])

  // generate faces for the sides
  facesByIndex.push([radialSegments + 2, 1, radialSegments])
  facesByIndex.push([radialSegments + 2, radialSegments, 1 + radialSegments + radialSegments])
  for (let i = 2; i < radialSegments + 1; i++) {
    facesByIndex.push([i + 1 + radialSegments, i, i - 1])
    facesByIndex.push([i + 1 + radialSegments, i - 1, i + radialSegments])
  }
  return { vertices, facesByIndex }
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

  const box = () => {
  return {
    vertices: [
      [0, 0, 0], //0
      [3, 0, 0], //1
      [3, 3, 0], //2
      [0, 3, 0], //3
      [0, 3, -3], // 4
      [0, 0, -3], // 5
      [3, 0, -3], // 6
      [3, 3, -3] // 7
    ],

    index: [
      [2, 0, 1], //far face
      [2, 0, 3],
      [2, 4, 7], //top face
      [2, 3, 4],
      [4, 3, 0], //left face
      [4, 0, 5],
      [7, 4, 5], //front face
      [7, 5, 6],
      [2, 7, 6], //right face
      [2, 6, 1],
      [6, 5, 1], //bottom face
      [0, 1, 5]
    ]
  }
  }

  const hexagonalPrism = () => {
  return {
    vertices: [
      // FACE
      [0.35, 0, 0.15],
      [0.15, 0.35, 0.15],
      [-0.15, 0.35, 0.15],
      [-0.35, 0, 0.15],
      [-0.15, -0.35, 0.15],
      [0.15, -0.35, 0.15],

      // BASE
      [0.35, 0, -0.15],
      [0.15, 0.35, -0.15],
      [-0.15, 0.35, -0.15],
      [-0.35, 0, -0.15],
      [-0.15, -0.35, -0.15],
      [0.15, -0.35, -0.15]
    ],

    facesByIndex: [
      [0, 1, 7],
      [0, 5, 6],
      [1, 2, 8],
      [2, 8, 9],
      [2, 3, 9],
      [3, 4, 10],
      [3, 9, 10],
      [4, 5, 11],
      [6, 7, 8],
      [6, 10, 11]
    ]
  }
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

  /**
  * Utility function for computing vertex normals.
  *
  * @param {object} protoGeometry
  */
  const computeFacetedNormals = protoGeometry => {
  const result = []
  protoGeometry.facesByIndex.forEach(face => {
    // Access each vertex of the triangle.
    const p0 = protoGeometry.vertices[face[0]]
    const p1 = protoGeometry.vertices[face[1]]
    const p2 = protoGeometry.vertices[face[2]]

    // Convert each point into a Vector instance so we can use the methods.
    const p0AsVector = new Vector(...p0)
    const p1AsVector = new Vector(...p1)
    const p2AsVector = new Vector(...p2)

    // Perform the actual vector calculation.
    const v1 = p1AsVector.subtract(p0AsVector)
    const v2 = p2AsVector.subtract(p0AsVector)

    // Calculate the normal.
    const N = v1.cross(v2).unit // ".unit" is not in the book.

    // Push that normnal onto our result, _one per vertex_.
    result.push(N.x, N.y, N.z)
    result.push(N.x, N.y, N.z)
    result.push(N.x, N.y, N.z)
  })
  return result
  }

  const computeAllFaceNormals = geometry => {
  let sumVector = new Vector(0, 0, 0)
  const result = []
  geometry.facesByIndex.forEach(face => {
    // Access each vertex of the triangle.
    const p0 = geometry.vertices[face[0]]
    const p1 = geometry.vertices[face[1]]
    const p2 = geometry.vertices[face[2]]

    // Convert each point into a Vector instance so we can use the methods.
    const p0AsVector = new Vector(...p0)
    const p1AsVector = new Vector(...p1)
    const p2AsVector = new Vector(...p2)

    // Perform the actual vector calculation.
    const v1 = p1AsVector.subtract(p0AsVector)
    const v2 = p2AsVector.subtract(p0AsVector)

    // Calculate the normal.
    const N = v1.cross(v2).unit // ".unit" is not in the book.

    //Sum of the normals of every triangle that the vertex is in
    sumVector = sumVector.add(N)
  })
  result.push(sumVector.x, sumVector.y, sumVector.z)
  // Push that normnal onto our result, _one per vertex_.
  return result
  }

  const computeSmoothNormals = protoGeometry => {
  const vertices =  protoGeometry.vertices
  const theFaces = []
  const smoothNormalArr = []
  for (let i = 0; i < vertices.length; i++) {
    const triangles = []
    for (const element of protoGeometry.facesByIndex) {
      if (element.includes(i)) {
        triangles.push(element)
      }
    }
    theFaces.push(triangles)
  }

  for (const element of theFaces) {
    const facesByIndex = element
    const geometry = {vertices, facesByIndex}
    const smoothNormal = computeAllFaceNormals(geometry)
    smoothNormalArr.push(smoothNormal)
  }
  const result = toRawTriangleArray({vertices: smoothNormalArr, facesByIndex: protoGeometry.facesByIndex})
  return result
  }

  export { sphere, cone, cylinder, toRawTriangleArray, toRawLineArray, hexagonalPrism, box, computeFacetedNormals, computeSmoothNormals }