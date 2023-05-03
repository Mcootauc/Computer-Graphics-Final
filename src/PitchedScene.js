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

  const sunMesh = new Mesh(sphere(0.5, 6.0), true)
  sunMesh.setColor({ r: 1.0, g: 0.72, b: 0.0})
  sunMesh.setTranslation({ x: 0, y: 0, z: 0 })

  // This variable stores 3D model information. We inline it for now but will want to separate it later.
  // Think of these as proto-meshes, with no distinct geometry nor material.
  const [objectsToDraw] = useState([
    sunMesh,
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

  const handleBirdsEyeView = () => {  //attempted this and behind view but couldn't figure it out in the end 
    console.log("bird")
    scene.setCameraPositionAndOrientation(
      new Vector(0, 1, 0),
      new Vector(0, 0, 0),
      new Vector(0, 0, -1)
    );
  };
  
  const handleBehindView = () => {
    console.log("behind")
    scene.setCameraPositionAndOrientation(
      new Vector(0, 0, 1),
      new Vector(0, 0, 0),
      new Vector(0, 1, 0)
    );
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
