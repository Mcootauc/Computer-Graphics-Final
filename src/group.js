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
      for (let i = 0; i < this.children.length; i++) {
        console.log(
          'before move',
          this.children[i].translation.x,
          this.children[i].translation.y,
          this.children[i].translation.z
        )
        this.children[i].translation.x += translation.x
        this.children[i].translation.y += translation.y
        this.children[i].translation.z += translation.z
        console.log(
          'after move',
          this.children[i].translation.x,
          this.children[i].translation.y,
          this.children[i].translation.z
        )
      }
    }
  }
}

export default Group
