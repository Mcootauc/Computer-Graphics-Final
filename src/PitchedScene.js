/**
 * Build out this component to display your pitched scene—the one that goes full circle to the first assignment,
 * but now done using your own 3D library. It doesn’t have to be the same scene of course—that was done with
 * a different group, many many weeks ago!
 * Build out this component to display your pitched scene—the one that goes full circle to the first assignment,
 * but now done using your own 3D library. It doesn’t have to be the same scene of course—that was done with
 * a different group, many many weeks ago!
 */
import { useEffect, useRef, useState } from 'react'
import {
  sphere,
  cone,
  cylinder,
  toRawLineArray,
  hexagonalPrism,
  box,
  computeFacetedNormals,
  computeSmoothNormals,
  toRawTriangleArray
} from './shapes'
import Scene from './scene/scene'
import Vector from './vector'
import Mesh from './createMesh'
import Group from './group'

const CANVAS_WIDTH = 512
const CANVAS_HEIGHT = 512

const PitchedScene = props => {
  const canvasContainerRef = useRef()

  const sunMesh = new Mesh(sphere(0.3, 2.0), true)
  sunMesh.setColor({ r: 1.0, g: 0.72, b: 0.0 })
  sunMesh.setTranslation({ x: 0, y: 0, z: 0 })

  const cylinderPlanet = new Mesh(cylinder(0.3, 0.3, 8), true)
  cylinderPlanet.setColor({ r: 0.0, g: 0.5, b: 1.0 })
  cylinderPlanet.setTranslation({ x: 1.5, y: 0.0, z: 0.0 })

  const planets = new Group()
  planets.add(sunMesh)
  planets.add(cylinderPlanet)

  const topSpaceship = new Mesh(cone(), false)
  topSpaceship.setColor({ r: 0.0, g: 1.0, b: 1.0 })
  topSpaceship.setTranslation({ x: 1.5, y: 1.0, z: 0.0 })

  const bottomSpaceship = new Mesh(hexagonalPrism(), false)
  bottomSpaceship.setColor({ r: 1.0, g: 0.0, b: 1.0 })
  bottomSpaceship.setTranslation({ x: 0.7, y: -1.5, z: 0 })

  const spaceship = new Group()
  spaceship.add(topSpaceship)
  spaceship.add(bottomSpaceship)

  // This variable stores 3D model information. We inline it for now but will want to separate it later.
  // Think of these as proto-meshes, with no distinct geometry nor material.
  const [objectsToDraw] = useState(planets.children, spaceship)

  const [scene] = useState(new Scene())

  useEffect(() => {
    const pitchedCanvas = canvasContainerRef.current
    if (!pitchedCanvas) {
      return
    }

    scene.setCanvas(pitchedCanvas)
    scene.setObjectsToDraw(objectsToDraw)
    scene.setLightPosition(1.5, 0.0, 1.0)
    scene.drawScene()
  }, [])

  const handleToggle = () => {
    objectsToDraw.forEach(element => {
      element.visible = !element.visible
    })
    scene.drawScene()
  }
  const handleWireframe = () => {
    objectsToDraw.forEach(element => {
      element.wireframe = !element.wireframe
    })
  }

  const handleTopView = () => {
    scene.setCameraPositionAndOrientation(new Vector(0, 1, 0), new Vector(0, 0, 0), new Vector(0, 0, -1))
  }
  const handleBottomView = () => {
    scene.setCameraPositionAndOrientation(new Vector(0, -1, 0), new Vector(0, 0, 0), new Vector(0, 0, -1))
  }
  const handleFrontView = () => {
    scene.setCameraPositionAndOrientation(new Vector(0, 0, 0), new Vector(0, 0, 1), new Vector(0, 1, 0))
  }
  const handleBehindView = () => {
    scene.setCameraPositionAndOrientation(new Vector(0, 0, 1), new Vector(0, 0, 0), new Vector(0, 1, 0))
  }

  const lightUp = () => {
    scene.setLightPosition(0.0, 2.0, 0.0)
  }
  const lightDown = () => {
    scene.setLightPosition(0.0, -2.0, 0.0)
  }
  const lightLeft = () => {
    scene.setLightPosition(-2.0, 0.0, 0.0)
  }
  const lightRight = () => {
    scene.setLightPosition(2.0, 0.0, 0.0)
  }
  const lightForward = () => {
    scene.setLightPosition(0.0, 0.0, -2.0)
  }
  const lightBackward = () => {
    scene.setLightPosition(0.0, 0.0, 2.0)
  }

  return (
    <article>
      <p>Use this component to implement your pitched scene—the one with an intended purpose, use cases, etc.</p>

      <section width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasContainerRef}>
        Your favorite update-your-browser message here.
      </section>
      <div>
        <div>
          <button onClick={handleToggle}>Show shape</button>
          <button onClick={handleWireframe}>Wireframe</button>
        </div>
        <div>
          <button onClick={handleTopView}>Top View</button>
          <button onClick={handleBottomView}>Bottom View</button>
          <button onClick={handleFrontView}>Front View</button>
          <button onClick={handleBehindView}>Behind View</button>
        </div>
        <div>
          <button onClick={lightUp}>Light Up</button>
          <button onClick={lightDown}>Light Down</button>
          <button onClick={lightRight}>Light Left</button>
          <button onClick={lightLeft}>Light Right</button>
          <button onClick={lightForward}>Light Forward</button>
          <button onClick={lightBackward}>Light Backward</button>
        </div>
      </div>
    </article>
  )
}

export default PitchedScene
