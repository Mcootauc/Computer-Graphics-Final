import { getGL, initVertexBuffer, initSimpleShaderProgram } from '../glsl-utilities'
import { translateMatrix, rotationMatrix, orthoProjection } from '../matrix'
import { toRawLineArray, toRawTriangleArray } from '../shapes'
import Vector from '../vector'

const VERTEX_SHADER = `
  #ifdef GL_ES
  precision highp float;
  #endif

  attribute vec3 vertexPosition;

  // Note this new additional output.
  attribute vec3 vertexColor;
  varying vec4 finalVertexColor;
  uniform mat4 rotationMatrix;

  attribute vec3 normalVector;

  void main(void) {
    vec3 hardcodedLightVector = normalize(vec3(0.25, 1.0, -1.0));
    float lightContribution = dot(normalize(normalVector), hardcodedLightVector);
    gl_Position = rotationMatrix * vec4(vertexPosition, 1.0);
    finalVertexColor = vec4(vertexColor, 1.0) * lightContribution;
  }
`

const FRAGMENT_SHADER = `
  #ifdef GL_ES
  precision highp float;
  #endif

  varying vec4 finalVertexColor;

  void main(void) {
    gl_FragColor = vec4(finalVertexColor.rgb, 1.0);
  }
`

class Scene {
  constructor() {
    this.canvas = null
    this.objectsToDraw = []
    this.gl = null
  }

  setCanvas(canvas) {
    this.canvas = canvas

    // Update the gl property when the canvas changes
    this.gl = getGL(canvas)
  }

  setObjectsToDraw(objectsToDraw) {
    this.objectsToDraw = objectsToDraw
  }

  drawScene() {
    if (!this.gl) {
      alert('No WebGL context found...sorry.')

      // No WebGL, no use going on...
      return
    }

    this.gl.enable(this.gl.DEPTH_TEST)
    this.gl.enable(this.gl.CULL_FACE)
    this.gl.clearColor(0.0, 0.0, 0.0, 0.0)
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height)

    // Pass the vertices to WebGL.
    this.objectsToDraw.forEach(objectToDraw => {
      if (objectToDraw.wireframe === true) {
        objectToDraw.verticesBuffer = initVertexBuffer(this.gl, toRawLineArray(objectToDraw.vertices))
      } else {
        objectToDraw.verticesBuffer = initVertexBuffer(this.gl, toRawTriangleArray(objectToDraw.vertices))
      }
      objectToDraw.normalsBuffer = initVertexBuffer(this.gl, objectToDraw.normals)
    })

    // Initialize the shaders.
    let abort = false
    const shaderProgram = initSimpleShaderProgram(
      this.gl,
      VERTEX_SHADER,
      FRAGMENT_SHADER,

      // Very cursory error-checking here...
      shader => {
        abort = true
        alert('Shader problem: ' + this.gl.getShaderInfoLog(shader))
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
    this.gl.useProgram(shaderProgram)

    // Hold on to the important variables within the shaders.
    const vertexPosition = this.gl.getUniformLocation(shaderProgram, 'vertexPosition')
    this.gl.enableVertexAttribArray(vertexPosition)
    const vertexColor = this.gl.getAttribLocation(shaderProgram, 'vertexColor')
    this.gl.enableVertexAttribArray(vertexColor)
    const normalVector = this.gl.getAttribLocation(shaderProgram, 'normalVector')
    this.gl.enableVertexAttribArray(normalVector)
    const theRotationMatrix = this.gl.getUniformLocation(shaderProgram, 'theRotationMatrix')
    // const translationMatrix = this.gl.getUniformLocation(shaderProgram, 'theTranslationMatrix')
    const orthographicProjection = this.gl.getUniformLocation(shaderProgram, 'theOrthoProjection')    

    const drawObject = object => {
      // Set up the translation matrix with each object's unique translation on scene
      // this.gl.uniformMatrix4fv(translationMatrix, this.gl.FALSE, new Float32Array(translateMatrix(object.translation.x, object.translation.y, object.translation.z)));
      // this.gl.uniform3f(this.gl.getUniformLocation(shaderProgram, 'color'), object.color.r, object.color.g, object.color.b);
    
      // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.verticesBuffer);
      // this.gl.vertexAttribPointer(vertexPosition, 3, this.gl.FLOAT, false, 0, 0);

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.colorsBuffer)
      this.gl.vertexAttribPointer(vertexColor, 3, this.gl.FLOAT, false, 0, 0)

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.normalsBuffer)
      this.gl.vertexAttribPointer(normalVector, 3, this.gl.FLOAT, false, 0, 0)

      // Set the varying vertex coordinates.
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.verticesBuffer)
      this.gl.vertexAttribPointer(vertexPosition, 3, this.gl.FLOAT, false, 0, 0)
      this.gl.drawArrays(object.mode, 0, object.vertices.length / 3)

      // const normalPosition = this.gl.getAttribLocation(shaderProgram, 'normalVector'); 
      // this.gl.enableVertexAttribArray(normalPosition); 
      // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.normalsBuffer); 
      // this.gl.vertexAttribPointer(normalPosition, 3, this.gl.FLOAT, false, 0, 0); 
    
      if (object.wireframe === true) {
        this.gl.drawArrays(this.gl.LINES, 0, toRawLineArray(object.vertices).length / 3)
      } else {
        this.gl.drawArrays(this.gl.TRIANGLES, 0, toRawTriangleArray(object.vertices).length / 3)
      }
    }

    /*
     * Displays the scene.
     */
    const drawScene = () => {
      // Clear the display.
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)

      // Set up the rotation matrix.
      this.gl.uniformMatrix4fv(
        theRotationMatrix,
        this.gl.FALSE,
        new Float32Array(rotationMatrix(currentRotation, 1, 1, 1))
      )

      // Set up the rotation matrix.
      this.gl.uniformMatrix4fv(
        orthographicProjection,
        this.gl.FALSE,
        new Float32Array(orthoProjection(-5 / 2, 5 / 2, -5 / 2, 5 / 2, -1, 1))
      )

      // Display the objects.
      for (let i = 0; i < this.objectsToDraw.length; i++) {
        const object = this.objectsToDraw[i]
        if (object.visible) {
          drawObject(object)
        }
      }

      // All done.
      this.gl.flush()
    }
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
        <canvas width="512" height="512" ref={this.canvas}>
          Your favorite update-your-browser message here.
        </canvas>
      </article>
    )
  }
}
export default Scene