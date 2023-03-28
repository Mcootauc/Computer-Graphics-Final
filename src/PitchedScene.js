/**
 * Build out this component to display your pitched scene—the one that goes full circle to the first assignment,
 * but now done using your own 3D library. It doesn’t have to be the same scene of course—that was done with
 * a different group, many many weeks ago!
 */
import { useEffect, useRef } from 'react'
import { sphere, cone, cylinder, toRawLineArray } from './shapes'
import { getGL, initVertexBuffer, initSimpleShaderProgram } from './glsl-utilities'

const VERTEX_SHADER = `
  #ifdef GL_ES
  precision highp float;
  #endif

  attribute vec3 vertexPosition;

  void main(void) {
    gl_Position = vec4(vertexPosition, 1.0);
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

const CANVAS_WIDTH = 512
const CANVAS_HEIGHT = 512

const FRAMES_PER_SECOND = 30
const MILLISECONDS_PER_FRAME = 1000 / FRAMES_PER_SECOND

const PitchedScene = props => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }
    // Grab the WebGL rendering context.
    const gl = getGL(canvas)
    if (!gl) {
      alert('No WebGL context found...sorry.')

      // No WebGL, no use going on...
      return
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.CULL_FACE)
    gl.clearColor(0.0, 0.0, 0.0, 0.0)
    gl.viewport(0, 0, canvas.width, canvas.height)

    // This variable stores 3D model information. We inline it for now but will want to separate it later.
    // Think of these as proto-meshes, with no distinct geometry nor material.\
    const obj =  toRawLineArray(cylinder())
    console.log(obj + "cylinder")
    const objectsToDraw = [

      // Shape library demonstration.
      {
        color: { r: 1, g: 0.5, b: 0 },
        vertices: toRawLineArray(cylinder()),
        mode: gl.LINES
      },
      {
        color: { r: 0.5, g: 1.0, b: 0 },
        vertices: toRawLineArray(cone()),
        mode: gl.LINES
      },
      {
        color: { r: 0.0, g: 0.0, b: 0 },
        vertices: toRawLineArray(sphere()),
        mode: gl.LINES
      }
    ];

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

    /*
     * Displays an individual object.
     */
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
    
      // Display the objects.
      objectsToDraw.forEach(drawObject);
    
      // All done.
      gl.flush();
    };

    // ...and finally, do the initial display.
    drawScene()

    const renderingContext = canvas.getContext('2d')
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

      // This is not the code you’re looking for.
      renderingContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      renderingContext.fillText(`timestamp: ${timestamp}`, 10, 20)

      // Request the next frame.
      previousTimestamp = timestamp
      window.requestAnimationFrame(nextFrame)
    }

    window.requestAnimationFrame(nextFrame)
  }, [canvasRef])

  return (
    <article>
      <p>Use this component to implement your pitched scene—the one with an intended purpose, use cases, etc.</p>

      <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef}>
        Your favorite update-your-browser message here.
      </canvas>
    </article>
  )
}

export default PitchedScene
