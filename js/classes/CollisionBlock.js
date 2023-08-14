class CollisionBlock {
    constructor({position}) {
        this.position = position
        this.width = 3
        this.height = 3
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.5)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}