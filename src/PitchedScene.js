/**
 * Build out this component to display your pitched scene—the one that goes full circle to the first assignment,
 * but now done using your own 3D library. It doesn’t have to be the same scene of course—that was done with
 * a different group, many many weeks ago!
 */
import { useEffect, useRef } from 'react'
import { cone, cylinder, toRawLineArray } from './shapes'
import { getGL } from './glsl-utilities'
import Scene from './scene/scene'

const CANVAS_WIDTH = 512
const CANVAS_HEIGHT = 512

const FRAMES_PER_SECOND = 30
const MILLISECONDS_PER_FRAME = 1000 / FRAMES_PER_SECOND

const PitchedScene = props => {
  const canvasRef = useRef()

  useEffect(() => {
    const pitchCanvas = canvasRef.current
    if (!pitchCanvas) {
      return
    }
    const gl = getGL(pitchCanvas)
    if (!gl) {
      alert('No WebGL context found...sorry.')

      // No WebGL, no use going on...
      return
    }

    // This variable stores 3D model information. We inline it for now but will want to separate it later.
    // Think of these as proto-meshes, with no distinct geometry nor material.
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
      }
    ];

    //Sends canvas and objects to draw to the scene
    Scene(pitchCanvas, objectsToDraw, CANVAS_WIDTH, CANVAS_HEIGHT, MILLISECONDS_PER_FRAME)

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
