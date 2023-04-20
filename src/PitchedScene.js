/**
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


const CANVAS_WIDTH = 512
const CANVAS_HEIGHT = 512

const PitchedScene = props => {
  const canvasContainerRef = useRef()

  const blueSphereMesh = new Mesh(sphere(0.6, 1.0), true)
  blueSphereMesh.setColor({ r: 0, g: 0.7, b: 1 })
  blueSphereMesh.setTranslation({ x: -1.5, y: 0.7, z: 0 })

  const pinkSphereMesh = new Mesh(sphere(0.6, 1.0), false)
  pinkSphereMesh.setColor({ r: 1, g: 0.5, b: 1 })
  pinkSphereMesh.setTranslation({ x: -1.5, y: -0.7, z: 0 })

  const redCylinderMesh = new Mesh(cylinder(0.3, 0.3, 8), true)
  redCylinderMesh.setColor({ r: 1, g: 0, b: 0 })
  redCylinderMesh.setTranslation({ x: 1.5, y: 0.7, z: 0 })

  const lightBlueCylinderMesh = new Mesh(cylinder(0.3, 0.3, 8), false)
  lightBlueCylinderMesh.setColor({ r: 0.5, g: 1, b: 1 })
  lightBlueCylinderMesh.setTranslation({ x: 1.5, y: -0.7, z: 0 })

  const yellowConeMesh = new Mesh(cone(), true)
  yellowConeMesh.setColor({ r: 1, g: 1, b: 0 })
  yellowConeMesh.setTranslation({ x: -0.3, y: 1.5, z: 0 })

  const lavenderConeMesh = new Mesh(cone(), false)
  lavenderConeMesh.setColor({ r: 1, g: 1, b: 2 })
  lavenderConeMesh.setTranslation({ x: 0.8, y: 1.5, z: 0 })

  const limeHexagonalPrismMesh = new Mesh(hexagonalPrism(), true)
  limeHexagonalPrismMesh.setColor({ r: 1, g: 1.5, b: 1 })
  limeHexagonalPrismMesh.setTranslation({ x: -0.4, y: -1.5, z: 0 })

  const orangeHexagonalPrismMesh = new Mesh(hexagonalPrism(), false)
  orangeHexagonalPrismMesh.setColor({ r: 1.0, g: 0.6, b: 0})
  orangeHexagonalPrismMesh.setTranslation({ x: 0.7, y: -1.5, z: 0 })

  // This variable stores 3D model information. We inline it for now but will want to separate it later.
  // Think of these as proto-meshes, with no distinct geometry nor material.
  const [objectsToDraw] = useState([
    blueSphereMesh,
    pinkSphereMesh,
    redCylinderMesh,
    lightBlueCylinderMesh,
    yellowConeMesh,
    lavenderConeMesh,
    limeHexagonalPrismMesh,
    orangeHexagonalPrismMesh
  ])
  
  const [scene] = useState(new Scene());

  useEffect(() => {
    const pitchedCanvas = canvasContainerRef.current;
    if (!pitchedCanvas) {
      return;
    }

    scene.setCanvas(pitchedCanvas);
    scene.setObjectsToDraw(objectsToDraw);
    scene.setLightPosition(1.5, 0.0, 1.0)
    scene.drawScene();
  }, []);

  const handleToggle = () => {
    objectsToDraw.forEach((element) => {
      element.visible = !element.visible;
    });
    scene.drawScene();
  };

  const handleBirdsEyeView = () => {
    scene.setCameraPositionAndOrientation(
      new Vector(0, 50, 0),
      new Vector(0, 0, 0),
      new Vector(0, 0, -1)
    );
    scene.updateCamera();
  };
  
  const handleBehindView = () => {
    scene.setCameraPositionAndOrientation(
      new Vector(0, 0, 50),
      new Vector(0, 0, 0),
      new Vector(0, 1, 0)
    );
    scene.updateCamera();
  };
  

  const handleWireframe = () => {
    objectsToDraw.forEach((element) => {
      element.wireframe = !element.wireframe;
    });
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

  return (
    <article>
      <p>
        Use this component to implement your pitched scene—the one with an
        intended purpose, use cases, etc.
      </p>

      <section
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        ref={canvasContainerRef}
      >
        Your favorite update-your-browser message here.
      </section>
      <div>
        <button onClick={handleToggle}>Show shape</button>
        <button onClick={handleWireframe}>Wireframe</button>
        <button onClick={handleBirdsEyeView}>Birds Eye View</button>
        <button onClick={handleBehindView}>Behind View</button>
        <button onClick={lightUp}>Light Up</button>
        <button onClick={lightDown}>Light Down</button>
        <button onClick={lightRight}>Light Left</button>
        <button onClick={lightLeft}>Light Right</button>
      </div>
    </article>
  );
};

export default PitchedScene;
