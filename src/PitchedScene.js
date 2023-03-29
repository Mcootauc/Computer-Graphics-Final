/**
 * Build out this component to display your pitched scene—the one that goes full circle to the first assignment,
 * but now done using your own 3D library. It doesn’t have to be the same scene of course—that was done with
 * a different group, many many weeks ago!
 */
import { useEffect, useRef, useState } from 'react'
import { sphere, cone, cylinder, toRawLineArray, hexagonalPrism, pentagonalPyramid } from './shapes'
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
    const pitchedCanvas = canvasRef.current
    if (!pitchedCanvas) {
      return
    }

    const gl = getGL(pitchedCanvas)
    if (!gl) {
      alert('No WebGL context found...sorry.')

      // No WebGL, no use going on...
      return
    }

    // This variable stores 3D model information. We inline it for now but will want to separate it later.
    // Think of these as proto-meshes, with no distinct geometry nor material.
    const objectsToDraw = [
      {
        color: { r: 1, g: 0.5, b: 0 },
        //takes in a parameter of radius, height, and radial segments
        vertices: toRawLineArray(sphere(0.7, 4, 4)),
        mode: gl.LINES
      },
      //{
      //  color: { r: 1, g: 0.5, b: 0 },
      //  //takes in a parameter of radius, height, and radial segments
      //  vertices: toRawLineArray(cylinder(0.6, 0.75, 4)),
      //  mode: gl.LINES
      //},
      {
        color: { r: 0.5, g: 1.0, b: 0 },
        vertices: toRawLineArray(cone()),
        mode: gl.LINES
      },
      // {
      //   color: { r: 0.5, g: 0, b: 1 },
      //   vertices: toRawLineArray(pentagonalPyramid()),
      //   mode: gl.LINES
      // },
      {
        color: { r: 0.5, g: 0, b: 1 },
        vertices: toRawLineArray(hexagonalPrism()),
        mode: gl.LINES
      }
    ]

    let currentRotation = 0.0
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
      Scene(pitchedCanvas, objectsToDraw, currentRotation)

      if (currentRotation >= FULL_CIRCLE) {
        currentRotation -= FULL_CIRCLE
      }
      // This is not the code you’re looking for.

      // Request the next frame.
      previousTimestamp = timestamp
      window.requestAnimationFrame(nextFrame)
    }

    window.requestAnimationFrame(nextFrame)
  }, [canvasRef, objectsToDraw])

  const addHexagonalPrism = () => {
    const hexagonalObject = {
      color: { r: 0, g: 1.0, b: 0.5 },
      vertices: toRawLineArray(hexagonalPrism()),
      mode: gl.LINES
    }
    setObjectsToDraw(prevObjects => [...prevObjects, hexagonalObject])
  }

  const addPentagonalPyramid = () => {
    const pentagonalObject = {
      color: { r: 0.5, g: 0, b: 0.5 },
      vertices: toRawLineArray(pentagonalPyramid()),
      mode: gl.LINES
    }
    setObjectsToDraw(prevObjects => [...prevObjects, pentagonalObject])
  }

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

  const removePrevious = () => {
    setObjectsToDraw(prevObjects => {
      const newObjects = [...prevObjects]
      newObjects.pop()
      return newObjects
    })
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
        <button onClick={addHexagonalPrism}>Add Hexagonal Prism</button>
        <button onClick={addPentagonalPyramid}>Add Pentagonal Pyramid</button>
        <button onClick={removePrevious}>Remove the previous shape</button>
      </div>
    </article>
  )
}
export default PitchedScene
