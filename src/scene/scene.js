import { useEffect, useRef } from 'react'

// import { getGL, initVertexBuffer, initSimpleShaderProgram } from './glsl-utilities'

const Scene = props => {
    const canvasRef = useRef()

    useEffect(() => {
      const canvas = canvasRef.current
      if (!canvas) {
        return
      }
    const gl = getGL(canvas)
    if (!gl) {
      alert('No WebGL context found...sorry.')

      // No WebGL, no use going on...
      return
    }

    }, [canvasRef])
    return (
    <article>
      {/* The canvas is square because the default WebGL space is a cube. */}
      <canvas width="512" height="512" ref={canvasRef}>
        Your favorite update-your-browser message here.
      </canvas>
    </article>
    )
}

export default Scene