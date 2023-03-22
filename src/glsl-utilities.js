/**
 * Returns the WebGL rendering context.
 */
const getGL = canvas => canvas.getContext('webgl')

/**
 * Initializes a vertex buffer for the given array of vertices.
 */
const initVertexBuffer = (gl, vertices) => {
  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
  return buffer
}

export { getGL, initVertexBuffer}