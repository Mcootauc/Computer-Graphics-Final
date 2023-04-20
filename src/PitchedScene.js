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
  const sphereMesh = new Mesh(sphere(0.7, 0.0), true)
  sphereMesh.setColor({ r: 0, g: 0.7, b: 1 })
  sphereMesh.setTranslation({ x: -1.5, y: 0, z: 0 })
  //const cylinerMesh = cylinder(0.3, 0.3, 5)
  // This variable stores 3D model information. We inline it for now but will want to separate it later.
  // Think of these as proto-meshes, with no distinct geometry nor material.
  const [objectsToDraw] = useState([
    sphereMesh,
    // {
    //   color: { r: 1, g: 0, b: 0 },
    //   vertices: cylinerMesh,
    //   wireframe: false,
    //   translation: { x: 1.0, y: 0, z: 0 },
    //   normals: computeFacetedNormals(cylinerMesh),
    //   visible: true
    // }
    // {
    //   color: { r: 1, g: 0, b: 0 },
    //   //takes in a parameter of radius, height, and radial segments
    //   //also takes in a parameter true or false to choose whether you want a wireframe or not
    //   vertices: cylinder(0.3, 0.3, 5, false),
    //   mode: gl.TRIANGLES,
    //   translation: {x: 1.3, y: 0.1, z: 0},
    //   visible: false
    // },
    // {
    //   color: { r: 0.5, g: 0, b: 0 },
    //   vertices: toRawLineArray(cone()),
    //   mode: gl.LINES,
    //   translation: {x: -0.5, y: -1.0, z: 0},
    //   visible: false
    // },
    // {
    //   color: { r: 0.5, g: 0, b: 1 },
    //   vertices: toRawLineArray(hexagonalPrism()),
    //   mode: gl.LINES,
    //   translation: {x: 0.8, y: -0.8, z: 0},
    //   visible: false
    // },
  ])
  
  const [scene] = useState(new Scene());

  useEffect(() => {
    const pitchedCanvas = canvasContainerRef.current;
    if (!pitchedCanvas) {
      return;
    }

    scene.setCanvas(pitchedCanvas);
    scene.setObjectsToDraw(objectsToDraw);
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
      </div>
    </article>
  );
};

export default PitchedScene;
