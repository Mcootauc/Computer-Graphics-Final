class Group {
  constructor() {
    this.children = []
    this.position = { x: 0, y: 0, z: 0 }
  }

  add(object) {
    this.children.push(object)
  }

  remove(object) {
    const index = this.children.indexOf(object)
    if (index !== -1) {
      this.children.splice(index, 1)
    }
  }

  move(translation) {
    if (!this.children.length !== 0) {
      for (const element of this.children) {
        element.translation.x += translation.x
        element.translation.y += translation.y
        element.translation.z += translation.z
      }
    }
  }
}

export default Group
