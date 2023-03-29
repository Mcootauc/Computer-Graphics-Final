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

const cylinder = () => {
  // The core cylinder coordinates.
  const X = 0.9
  const Z = 0.63

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
      [Z,   -X,  -Z] //18
    ],

    facesByIndex: [
      [0, 1, 2], //Top
      [0, 2, 3],
      [0, 3, 4],
      [0, 4, 5],
      [0, 5, 6],
      [0, 6, 7],
      [0, 7, 8],
      [0, 8, 1],


      [9, 10, 11], //Bottom
      [9, 11, 12],
      [9, 12, 13],
      [9, 13, 14],
      [9, 14, 15],
      [9, 15, 16],
      [9, 16, 17],
      [9, 17, 10],

      
      [14, 5,  6], //Middle
      [14, 6, 15],
      [15, 6,  7],
      [15, 7, 16],
      [16, 7,  8],
      [16, 8, 17],
      [17, 8,  1],
      [17, 1, 10],


      [10, 1,  2],
      [10, 2, 11],
      [11, 2,  3],
      [11, 3, 12],
      [12, 3,  4],
      [12, 4, 13],
      [13, 4,  5],
      [13, 5, 14],
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
  const cone = (radius , height ) => {

    const vertices = [
      [0, height, 0], // top vertex
    ];
  
    // generate base vertices around the circle
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const x = Math.sin(angle) * radius;
      const y = 0;
      const z = Math.cos(angle) * radius;
      vertices.push([x, y, z]);
    }
  
    const facesByIndex = [];
  
    // generate faces for the base
    for (let i = 1; i < 8; i++) {
      facesByIndex.push([0, i, i + 1]);
    }
    facesByIndex.push([0, 8, 1]);
  
    // generate faces for the sides
    for (let i = 1; i < 8; i++) {
      facesByIndex.push([i, i + 1, 0]);
    }
    facesByIndex.push([8, 1, 0]);
  
    return { vertices, facesByIndex };
  };
  

  
  
  export { cone, cylinder, toRawTriangleArray, toRawLineArray }
  