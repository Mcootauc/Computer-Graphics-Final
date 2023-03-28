/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */

/**
 * Returns the vertices and faces for a small icosahedron.
 *
 * Let’s call the resulting data structure a “proto-geometry” because it has
 * the beginnings of a geometry but nothing close to what three.js has (yet).
 */
const cylinder = () => {
    // The core icosahedron coordinates.
    const X = 0.9
    const Z = 0.636
  
    return {
      vertices: [
        [0.0,  X, 0.0], //1
        [0.0,  X,  -X], //2
        [-Z,   X,  -Z], //3
        [-X,   X, 0.0], //4
        [-Z,   X,   Z], //5
        [0.0,  X,   X], //6
        [Z,    X,   Z], //7
        [X,    X, 0.0], //8
        [Z,    X,  -Z], //9

        [0.0, -X, 0.0], //10
        [0.0, -X,  -X], //11
        [-Z,  -X,  -Z], //12
        [-X,  -X, 0.0], //13
        [-Z,  -X,   Z], //14
        [0.0, -X,   X], //15
        [Z,   -X,   Z], //16
        [X,   -X, 0.0], //17
        [Z,   -X,  -Z], //18
      ],
  
      facesByIndex: [
        [1, 2, 3], //Top
        [1, 3, 4],
        [1, 4, 5],
        [1, 5, 6],
        [1, 6, 7],
        [1, 7, 8],
        [1, 8, 9],
        [1, 9, 2],

        [10, 11, 12], //Bottom
        [10, 12, 13],
        [10, 13, 14],
        [10, 14, 15],
        [10, 15, 16],
        [10, 16, 17],
        [10, 17, 18],
        [10, 18, 11],

        [15, 6,  7], //Middle
        [15, 7, 16],
        [16, 7,  8],
        [16, 8, 17],
        [17, 8,  9],
        [17, 9, 18],
        [18, 9,  2],
        [18, 2, 11],

        [11, 2,  3], 
        [11, 3, 12],
        [12, 3,  4],
        [12, 4, 13],
        [13, 4,  5],
        [13, 5, 14],
        [14, 5,  6],
        [14, 6, 15],
      ]
    }
  }

  const icosahedron = () => {
    // The core icosahedron coordinates.
    const X = 0.525731112119133606
    const Z = 0.850650808352039932
  
    return {
      vertices: [
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
      ],
  
      facesByIndex: [
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
  
  export { cylinder, icosahedron, toRawTriangleArray, toRawLineArray }
  