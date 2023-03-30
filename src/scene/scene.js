import { getGL, initVertexBuffer, initSimpleShaderProgram } from '../glsl-utilities'
import { translateMatrix, rotationMatrix, orthoProjection} from '../matrix'

const VERTEX_SHADER = `
  #ifdef GL_ES
  precision highp float;
  #endif

  attribute vec3 vertexPosition;
  uniform mat4 theTranslationMatrix;
  uniform mat4 theRotationMatrix;
  uniform mat4 theOrthoProjection;

  void main(void) {
    gl_Position = theOrthoProjection * theTranslationMatrix * theRotationMatrix * vec4(vertexPosition, 1.0);
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
const Scene = (canvas, objectsToDraw) => {
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
  const vertexPosition = gl.getUniformLocation(shaderProgram, 'vertexPosition')
  gl.enableVertexAttribArray(vertexPosition)
  const rotatingMatrix = gl.getUniformLocation(shaderProgram, 'theRotationMatrix')
  const translationMatrix = gl.getUniformLocation(shaderProgram, 'theTranslationMatrix')
  const orthographicProjection = gl.getUniformLocation(shaderProgram, 'theOrthoProjection')

  const drawObject = object => {
    // Set up the translation matrix with each object's unique translation on scene
    gl.uniformMatrix4fv(translationMatrix, gl.FALSE, new Float32Array(translateMatrix(object.translation.x, object.translation.y, object.translation.z)))
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
    gl.uniformMatrix4fv(rotatingMatrix, gl.FALSE, new Float32Array(rotationMatrix(currentRotation, 1, 1, 1)))

    // Set up the rotation matrix.
    gl.uniformMatrix4fv(orthographicProjection, gl.FALSE, new Float32Array(orthoProjection(-5/2, 5/2, -5/2, 5/2, -1, 1)))

    // Display the objects.
    objectsToDraw.forEach(drawObject);
  
    // All done.
    gl.flush();
  };

  let currentRotation = 0.0
  const FRAMES_PER_SECOND = 30
  const MILLISECONDS_PER_FRAME = 1000 / FRAMES_PER_SECOND
  const DEGREES_PER_MILLISECOND = 0.033
  const FULL_CIRCLE = 360.0

  let previousTimestamp
  const nextFrame = timestamp => {
    // Initialize the timestamp.
    if (!previousTimestamp) {
      previousTimestamp = timestamp
      window.requestAnimationFrame(nextFrame)
      return
    }

    // Check if it’s time to advance.
    const progress = timestamp - previousTimestamp
    if (progress < MILLISECONDS_PER_FRAME) {
      // Do nothing if it’s too soon.
      window.requestAnimationFrame(nextFrame)
      return
    }
    // All clear.
    currentRotation += DEGREES_PER_MILLISECOND * progress
    
    drawScene()

    if (currentRotation >= FULL_CIRCLE) {
      currentRotation -= FULL_CIRCLE
    }
    // This is not the code you’re looking for.

    // Request the next frame.
    previousTimestamp = timestamp
    window.requestAnimationFrame(nextFrame)
  }

  window.requestAnimationFrame(nextFrame)
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
