/**
 * Build out this component to display your pitched scene—the one that goes full circle to the first assignment,
 * but now done using your own 3D library. It doesn’t have to be the same scene of course—that was done with
 * a different group, many many weeks ago!
 */
import { useEffect, useRef, useState } from 'react'
import { sphere, cone, cylinder, toRawLineArray, hexagonalPrism } from './shapes'
import { getGL } from './glsl-utilities'
import Scene from './scene/scene'

const CANVAS_WIDTH = 512
const CANVAS_HEIGHT = 512

const PitchedScene = props => {
  const canvasRef = useRef()
  const [objectsToDraw] = useState([])

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
        //takes in a parameter true or false to choose whether you want a wireframe or not
        vertices: sphere(true),
        mode: gl.LINES,
        translation: { x: -1.0, y: 0.5, z: 0 },
        visible: false
      },
      {
        color: { r: 1, g: 0.5, b: 0 },
        //takes in a parameter true or false to choose whether you want a wireframe or not
        vertices: sphere(false),
        mode: gl.TRIANGLES,
        translation: { x: -0.2, y: 1, z: 0 },
        visible: false
      },
      {
        color: { r: 0, g: 0, b: 0 },
        //takes in a parameter of radius, height, and radial segments
        //also takes in a parameter true or false to choose whether you want a wireframe or not
        vertices: cylinder(0.3, 0.3, 4, false),
        mode: gl.TRIANGLES,
        translation: { x: 1.0, y: 1.2, z: 0 },
        visible: false
      },
      {
        color: { r: 0, g: 0, b: 0 },
        //takes in a parameter of radius, height, and radial segments
        //also takes in a parameter true or false to choose whether you want a wireframe or not
        vertices: cylinder(0.3, 0.3, 4, false),
        mode: gl.LINE_LOOP,
        translation: { x: 1.4, y: 0.3, z: 0 },
        visible: false
      },
      {
        color: { r: 0.5, g: 0, b: 0 },
        vertices: toRawLineArray(cone()),
        mode: gl.LINES,
        translation: { x: -0.5, y: -1.0, z: 0 },
        visible: false
      },
      {
        color: { r: 0.5, g: 0, b: 1 },
        vertices: toRawLineArray(hexagonalPrism()),
        mode: gl.LINES,
        translation: { x: 0.8, y: -0.8, z: 0 },
        visible: false
      }
    ]

    Scene(pitchedCanvas, objectsToDraw)

    const toggle = document.querySelector('#toggle')
    toggle.addEventListener('click', function () {
      for (const element of objectsToDraw) {
        element.visible = !element.visible
      }
    })
  }, [canvasRef, objectsToDraw])

  return (
    <article>
      <p>Use this component to implement your pitched scene—the one with an intended purpose, use cases, etc.</p>

      <canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasRef}>
        Your favorite update-your-browser message here.
      </canvas>
      <div>
        <button id="toggle">Show shape</button>
      </div>
    </article>
  )
}

export default PitchedScene
