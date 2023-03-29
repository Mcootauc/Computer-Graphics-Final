import { getGL, initVertexBuffer, initSimpleShaderProgram } from '../glsl-utilities'
import { rotationMatrix } from '../matrix'
const VERTEX_SHADER = `
  #ifdef GL_ES
  precision highp float;
  #endif

  attribute vec3 vertexPosition;

  uniform mat4 theRotationMatrix;

  void main(void) {
    gl_Position = theRotationMatrix * vec4(vertexPosition, 1.0);
  }
`

const FRAGMENT_SHADER = `
  #ifdef GL_ES
  precision highp float;
  #endif

  uniform vec3 color;

  void main(void) {
    gl_FragColor = vec4(color, 1.0);
  }
`
const Scene = (canvas, objectsToDraw, currentRotation) => {
  const gl = getGL(canvas)
  if (!gl) {
    alert('No WebGL context found...sorry.')

    // No WebGL, no use going on...
    return
  }
  
  gl.enable(gl.DEPTH_TEST)
  gl.enable(gl.CULL_FACE)
  gl.clearColor(0.0, 0.0, 0.0, 0.0)
  gl.viewport(0, 0, canvas.width, canvas.height)

  // Pass the vertices to WebGL.
  objectsToDraw.forEach(objectToDraw => {
    objectToDraw.verticesBuffer = initVertexBuffer(gl, objectToDraw.vertices)
  })

  // Initialize the shaders.
  let abort = false
  const shaderProgram = initSimpleShaderProgram(
    gl,
    VERTEX_SHADER,
    FRAGMENT_SHADER,

    // Very cursory error-checking here...
    shader => {
      abort = true
      alert('Shader problem: ' + gl.getShaderInfoLog(shader))
    },

    // Another simplistic error check: we don't even access the faulty
    // shader program.
    shaderProgram => {
      abort = true
      alert('Could not link shaders...sorry.')
    }
  )
    // If the abort variable is true here, we can't continue.
  if (abort) {
    alert('Fatal errors encountered; we cannot continue.')
    return
  }

  // All done --- tell WebGL to use the shader program from now on.
  gl.useProgram(shaderProgram)

  // Hold on to the important variables within the shaders.
  const vertexPosition = gl.getAttribLocation(shaderProgram, 'vertexPosition')
  gl.enableVertexAttribArray(vertexPosition)
  const theRotationMatrix = gl.getUniformLocation(shaderProgram, 'theRotationMatrix')

  const drawObject = object => {
    gl.uniform3f(gl.getUniformLocation(shaderProgram, 'color'), object.color.r, object.color.g, object.color.b)
    gl.bindBuffer(gl.ARRAY_BUFFER, object.verticesBuffer)
    gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0)
    gl.drawArrays(object.mode, 0, object.vertices.length / 3)
  }
  
  /*
    * Displays the scene.
    */
  const drawScene = () => {
    // Clear the display.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Set up the rotation matrix.
    gl.uniformMatrix4fv(theRotationMatrix, gl.FALSE, new Float32Array(rotationMatrix(currentRotation, 1, 1, 1)))

    // Display the objects.
    objectsToDraw.forEach(drawObject);
  
    // All done.
    gl.flush();
  };

  // ...and finally, do the initial display.
  drawScene()

  return (
    <article>
      {/* The canvas is square because the default WebGL space is a cube. */}
      <canvas width="512" height="512" ref={canvas}>
        Your favorite update-your-browser message here.
      </canvas>
    </article>
  )
}

export default Scene;
