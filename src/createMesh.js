import {
  computeFacetedNormals,
  computeSmoothNormals
} from './shapes'

class Mesh {
  constructor(shape, smooth, rotation) {
    this.vertices = shape
    this.color = { r: 0, g: 0, b: 0 }
    this.translation = { x: 0, y: 0, z: 0 }
    this.rotation = { x: 0, y: 0, z: 0 }
    this.wireframe = false
    if (smooth) {
      this.normals = computeSmoothNormals(shape)
    } else {
      this.normals = computeFacetedNormals(shape)
    }
    this.visible = true
  }

  setColor(color) {
    this.color = color
  }

  setTranslation(translation) {
    this.translation = translation
  }

  setRotation(rotation) {
    this.rotation = rotation
  }

  setWireFrame(wireframe) {
    this.wireframe = wireframe
  }
}
export default Mesh
