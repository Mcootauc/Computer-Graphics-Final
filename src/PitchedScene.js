/**
 * Build out this component to display your pitched scene—the one that goes full circle to the first assignment,
 * but now done using your own 3D library. It doesn’t have to be the same scene of course—that was done with
 * a different group, many many weeks ago!
 */
import { useEffect, useRef, useState } from 'react'
import { cone, cylinder, toRawLineArray } from './shapes'
import { getGL } from './glsl-utilities'
import Scene from './scene/scene'

const CANVAS_WIDTH = 512
const CANVAS_HEIGHT = 512

const FRAMES_PER_SECOND = 30
const MILLISECONDS_PER_FRAME = 1000 / FRAMES_PER_SECOND

const PitchedScene = props => {
  const canvasRef = useRef()
  const [objectsToDraw, setObjectsToDraw] = useState([])
  let gl // Declare gl as a global variable

  useEffect(() => {
    const pitchCanvas = canvasRef.current
    if (!pitchCanvas) {
      return
    }
    gl = getGL(pitchCanvas) // Assign the WebGL context to gl
    if (!gl) {
      alert('No WebGL context found...sorry.')

      // No WebGL, no use going on...
      return
    }

    let currentRotation = 0.0
    const DEGREES_PER_MILLISECOND = 0.033
    const FULL_CIRCLE = 360.0

    const renderingContext = pitchCanvas.getContext('2d')
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

      currentRotation += DEGREES_PER_MILLISECOND * progress
      //Sends canvas and objects to draw to the scene
      Scene(pitchCanvas, objectsToDraw, currentRotation)
      if (currentRotation >= FULL_CIRCLE) {
        currentRotation -= FULL_CIRCLE
      }
      // This is not the code you’re looking for.
      renderingContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
      renderingContext.fillText(`timestamp: ${timestamp}`, 10, 20)

      // Request the next frame.
      previousTimestamp = timestamp
      window.requestAnimationFrame(nextFrame)
    }

    window.requestAnimationFrame(nextFrame)
  }, [canvasRef, objectsToDraw])

const addCylinder = () => {
  const cylinderObject = {
    color: { r: 1, g: 0.5, b: 0 },
    //takes in a parameter of radius, height, and radial segments
    vertices: toRawLineArray(cylinder(1.2 * 0.5, 1.5 * 0.5, 4)),
    mode: gl.LINES
  }
  setObjectsToDraw(prevObjects => [...prevObjects, cylinderObject])
}

const addCone = () => {
  const coneObject = {
    color: { r: 0.5, g: 1.0, b: 0 },
    vertices: toRawLineArray(cone(1.8 * 0.5, 1.2 * 0.5)),
    mode: gl.LINES
  }
  setObjectsToDraw(prevObjects => [...prevObjects, coneObject])
}

const removeCylinder = () => {
  setObjectsToDraw(prevObjects => prevObjects.slice(0, -1))
}

const removeCone = () => {
  setObjectsToDraw(prevObjects => prevObjects.slice(0, -1))
}


return (
  <article>
    <p>Use this component to implement your pitched scene—the one with an intended purpose, use cases, etc.</p>

    <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef}>
      Your favorite update-your-browser message here.
    </canvas>
    <div>
    <button onClick={addCylinder}>Add Cylinder</button>
    <button onClick={addCone}>Add Cone</button>
    <button onClick={removeCylinder}>Remove Cylinder</button>
    <button onClick={removeCone}>Remove Cone</button>
    </div>
  </article>
)
}
export default PitchedScene
