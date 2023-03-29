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

const cylinder = (radius, height, radialSegments) => {

  const vertices = [
    [0, height, 0], // top vertex
  ]; 
  // generate base vertices around the top vertex
  for (let i = 0; i < radialSegments; i++) {
    const angle = (i / radialSegments) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const y = height;
    const z = Math.cos(angle) * radius;
    vertices.push([x, y, z]);
  }

  vertices.push([0, -height, 0]); // bottom vertex
  // generate base vertices around the bottom vertex
  for (let i = 0; i < radialSegments; i++) {
    const angle = (i / radialSegments) * Math.PI * 2;
    const x = Math.sin(angle) * radius;
    const y = -height;
    const z = Math.cos(angle) * radius;
    vertices.push([x, y, z]);
  }

  const facesByIndex = [];
  // generate faces for the top
  for (let i = 1; i < radialSegments; i++) {
    facesByIndex.push([0, i, i + 1]);
  }
  facesByIndex.push([0, radialSegments, 1]);
  // generate faces for the base
  for (let i = 1; i < radialSegments; i++) {
    facesByIndex.push([1 + radialSegments, i + 1 + radialSegments, i + 2 + radialSegments]);
  }
  facesByIndex.push([1 + radialSegments, 1 + radialSegments + radialSegments, 2 + radialSegments]);
  // generate faces for the sides
  facesByIndex.push([radialSegments + 2, 1, radialSegments]);
  facesByIndex.push([radialSegments + 2, 1 + radialSegments + radialSegments, radialSegments]);
  for (let i = 2; i < radialSegments + 1; i++) {
    facesByIndex.push([i + 1 + radialSegments, i, i - 1]);
    facesByIndex.push([i + 1 + radialSegments, i + radialSegments, i - 1]);
  }

  return {vertices, facesByIndex}
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
  