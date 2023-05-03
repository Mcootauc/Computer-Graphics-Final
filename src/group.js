class Group {
  constructor() {
    this.parent = null
    this.children = []
    this.position = [0, 0, 0]
    this.scale = [1, 1, 1]
  }

  remove(object) {
    const index = this.children.indexOf(object)
    if (index !== -1) {
      object.parent = null
      this.children.splice(index, 1)
    }
  }

  add(object) {
    if (object.parent !== null) {
      object.parent.this.remove(object)
    } else if (!object.parent.includes(object)) {
      object.parent = this
      this.children.push(object)
    }
  }
}

export default Group
