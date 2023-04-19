import { getGL, initVertexBuffer, initSimpleShaderProgram } from '../glsl-utilities'
import { translateMatrix, rotationMatrix, orthoProjection, lookAt, perspective } from '../matrix'
import { toRawLineArray, toRawTriangleArray } from '../shapes'
import Vector from '../vector'
const VERTEX_SHADER = `
  attribute vec3 vertexPosition;
  attribute vec3 normalVector;
  
  uniform vec3 vertexColor;
  varying vec4 finalVertexColor;
  
  uniform mat4 theTranslationMatrix;
  uniform mat4 theRotationMatrix;
  uniform mat4 theOrthoProjection;
  uniform mat4 cameraMatrix;

  void main(void) {
    vec4 worldPosition = theTranslationMatrix * theRotationMatrix * vec4(vertexPosition, 1.0);
    gl_Position = theRotationMatrix * cameraMatrix * vec4(vertexPosition, 1.0);
    
    vec3 worldNormal = mat3(theRotationMatrix) * normalVector;

    vec3 hardcodedLightVector = normalize(vec3(0.5, 1.0, 1.0));
    float lightContribution = max(dot(normalize(worldNormal), hardcodedLightVector), 0.0);

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
    this.canvas = document.createElement('canvas')
    this.canvas.width = 500
    this.canvas.height = 500
    this.objectsToDraw = []
    this.gl = getGL(this.canvas)

    // Initialize the shaders.
    let abort = false
    this.shaderProgram = initSimpleShaderProgram(
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
    this.gl.useProgram(this.shaderProgram)
  }

  setCanvas(canvasContainer) {
    canvasContainer.appendChild(this.canvas)
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
      if (!objectToDraw.colors) {
        // If we have a single color, we expand that into an array
        // of the same color over and over.
        objectToDraw.colors = []
        for (let i = 0, maxi = objectToDraw.vertices.length / 3; i < maxi; i += 1) {
          objectToDraw.colors = objectToDraw.colors.concat(
            objectToDraw.color.r,
            objectToDraw.color.g,
            objectToDraw.color.b
          )
        }
      }
      objectToDraw.colorsBuffer = initVertexBuffer(this.gl, objectToDraw.colors)
      objectToDraw.normalsBuffer = initVertexBuffer(this.gl, objectToDraw.normals)
    })

    // Hold on to the important variables within the shaders.
    const vertexPosition = this.gl.getAttribLocation(this.shaderProgram, 'vertexPosition')
    this.gl.enableVertexAttribArray(vertexPosition)
    // const vertexColor = this.gl.getAttribLocation(this.shaderProgram, 'vertexColor')
    // this.gl.enableVertexAttribArray(vertexColor)
    const normalVector = this.gl.getAttribLocation(this.shaderProgram, 'normalVector')
    this.gl.enableVertexAttribArray(normalVector)
    const theRotationMatrix = this.gl.getUniformLocation(this.shaderProgram, 'theRotationMatrix')
    const translationMatrix = this.gl.getUniformLocation(this.shaderProgram, 'theTranslationMatrix')
    const orthographicProjection = this.gl.getUniformLocation(this.shaderProgram, 'theOrthoProjection')
    const cameraMatrix = this.gl.getUniformLocation(this.shaderProgram, 'cameraMatrix')

    const P = new Vector(0, 0, 0)
    const Q = new Vector(0, 0, -1)
    const up = new Vector(1, 1, 0)

    const ze = P.subtract(Q).unit
    const ye = up.subtract(up.projection(ze)).unit
    const xe = ye.cross(ze)

    // prettier-ignore
    const cameraMatrixArray = [
      xe.x, ye.x, ze.x, 0,
      xe.y, ye.y, ze.y, 0,
      xe.z, ye.z, ze.z, 0,
      -P.dot(xe), -P.dot(ye), -P.dot(ze), 1
    ]

    const drawObject = object => {
      // Set up the translation matrix with each object's unique translation on scene
      this.gl.uniformMatrix4fv(
        translationMatrix,
        this.gl.FALSE,
        new Float32Array(translateMatrix(object.translation.x, object.translation.y, object.translation.z))
      )
      this.gl.uniform3f(
        this.gl.getUniformLocation(this.shaderProgram, 'vertexColor'),
        object.color.r,
        object.color.g,
        object.color.b
      )

      // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.colorsBuffer)
      // this.gl.vertexAttribPointer(vertexColor, 3, this.gl.FLOAT, false, 0, 0)

      // this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.normalsBuffer)
      // this.gl.vertexAttribPointer(normalVector, 3, this.gl.FLOAT, false, 0, 0)
      // Set the varying vertex coordinates.
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.verticesBuffer)
      this.gl.vertexAttribPointer(vertexPosition, 3, this.gl.FLOAT, false, 0, 0)
      // const normalPosition = this.gl.getAttribLocation(this.shaderProgram, 'normalVector');
      // this.gl.enableVertexAttribArray(normalPosition);
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, object.normalsBuffer)
      this.gl.vertexAttribPointer(normalVector, 3, this.gl.FLOAT, false, 0, 0)

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
      // Set up the orthographic matrix.
      this.gl.uniformMatrix4fv(
        orthographicProjection,
        this.gl.FALSE,
        new Float32Array(orthoProjection(-5 / 2, 5 / 2, -5 / 2, 5 / 2, -1, 1))
      )
      this.gl.uniformMatrix4fv(cameraMatrix, this.gl.FALSE, new Float32Array(cameraMatrixArray))

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
