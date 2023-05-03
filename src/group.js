import { getGL, initVertexBuffer, initSimpleShaderProgram } from '../glsl-utilities'

class Group {
  constructor() {
    this.parent = null
    this.children = []
    this.position = [0, 0, 0]
    this.scale = [1, 1, 1]
  }

  add(object) {
    if (object.parent !== null) {
      object.parent.remove(object)
    } else if (!object.parent.includes(object)) {
      object.parent = this
      this.children.push(object)
    }
  }

  remove(object) {
    const index = this.children.indexOf(object)
    if (index !== -1) {
      object.parent = null
      this.children.splice(index, 1)
    }
  }
}

export default Group
