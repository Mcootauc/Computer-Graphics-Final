/**
 * Build out this component to display your pitched scene—the one that goes full circle to the first assignment,
 * but now done using your own 3D library. It doesn’t have to be the same scene of course—that was done with
 * a different group, many many weeks ago!
 * Build out this component to display your pitched scene—the one that goes full circle to the first assignment,
 * but now done using your own 3D library. It doesn’t have to be the same scene of course—that was done with
 * a different group, many many weeks ago!
 */
import { useEffect, useRef, useState } from 'react'
import { sphere, cone, cylinder, hexagonalPrism } from './shapes'
import Scene from './scene/scene'
import Vector from './vector'
import Mesh from './createMesh'
import Group from './group'

const CANVAS_WIDTH = 512
const CANVAS_HEIGHT = 512

const PitchedScene = props => {
  const canvasContainerRef = useRef()

  // the planet doesn't rotate
  const bluePlanet = new Mesh(sphere(0.3, 4.0), true)
  bluePlanet.setColor({ r: 0.0, g: 0.5, b: 1.0 })
  bluePlanet.setTranslation({ x: 0, y: 0, z: 0 })
  bluePlanet.setRotationXYZ({ x: 0.0, y: 0.0, z: 0.0 })

  // the moon rotates around the planet (internal moving part)
  const bluePlanetGrayMoon = new Mesh(sphere(0.2, 1.0), false)
  bluePlanetGrayMoon.setColor({ r: 0.72, g: 0.68, b: 0.64 })
  bluePlanetGrayMoon.setTranslation({ x: 1.5, y: 0.0, z: 0.0 })
  bluePlanetGrayMoon.setRotationXYZ({ x: 0.0, y: 0.0, z: 1.0 })

  //Mitchell Cootauco:
  const planetAndMoon = new Group()
  planetAndMoon.add(bluePlanet)
  planetAndMoon.add(bluePlanetGrayMoon)

  // Kevin Perez:
  const topSpaceship = new Mesh(cone(), false)
  topSpaceship.setColor({ r: 1.0, g: 0.1, b: 1.0 })
  topSpaceship.setTranslation({ x: 0.5, y: 1.2, z: 0.0 })
  topSpaceship.setRotationXYZ({ x: 1.5, y: 0.5, z: -1.5 })

  const sideUFO = new Mesh(cone(), false)
  sideUFO.setColor({ r: 1.0, g: 0.1, b: 1.0 })
  sideUFO.setTranslation({ x: 0.5, y: 1.2, z: 0.0 })
  sideUFO.setRotationXYZ({ x: 1.5, y: 0.5, z: -1.5 })
  sideUFO.setRotationXY({ x: 1.0, y: 0.5 }, 0.5)

  const upperSpaceship = new Mesh(hexagonalPrism(), false)
  upperSpaceship.setColor({ r: 0.0, g: 1.0, b: 1.0 })
  upperSpaceship.setTranslation({ x: 0.5, y: 1.0, z: 0.0 })
  upperSpaceship.setRotationXYZ({ x: 1.5, y: 0.5, z: -1.5 })

  const lowerSpaceship = new Mesh(cylinder(0.3, 0.3, 8), false)
  lowerSpaceship.setColor({ r: 1.0, g: 1.0, b: 1.0 })
  lowerSpaceship.setTranslation({ x: 0.5, y: 0.5, z: 0.0 })
  lowerSpaceship.setRotationXYZ({ x: 1.5, y: 0.5, z: -1.5 })

  const universe = new Group()
  universe.add(bluePlanet)
  universe.add(bluePlanetGrayMoon)

  universe.add(sideUFO)

  universe.add(upperSpaceship)
  universe.add(lowerSpaceship)

  // This variable stores 3D model information. We inline it for now but will want to separate it later.
  // Think of these as proto-meshes, with no distinct geometry nor material.
  const [objectsToDraw] = useState(universe.children)

  const [scene] = useState(new Scene())

  useEffect(() => {
    const pitchedCanvas = canvasContainerRef.current
    if (!pitchedCanvas) {
      return
    }

    scene.setCanvas(pitchedCanvas)
    scene.setObjectsToDraw(objectsToDraw)
    scene.setLightPosition(-2.0, 0.0, 0.0)
    scene.drawScene()
  }, [objectsToDraw, scene])

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

  const orthoOrPerspective = () => {
    scene.setOrthoOrPerspective()
  }
  return (
    <article>
      <p>Use this component to implement your pitched scene—the one with an intended purpose, use cases, etc.</p>

      <section width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ref={canvasContainerRef}></section>
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
        <div>
          <button onClick={orthoOrPerspective}>Orthographic Or Perspective Projection</button>
        </div>
      </div>
    </article>
  )
}

export default PitchedScene
