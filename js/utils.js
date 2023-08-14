Array.prototype.parse2D = function () {
    const rows = []
    for (let i = 0; i < this.length; i += 330) {
        rows.push(this.slice(i, i + 330))
    for (let i = 0; i < this.length; i += 330) {
        rows.push(this.slice(i, i + 330))
    }
    return rows
}

Array.prototype.createObjectsFrom2D = function () {
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 23) {
                objects.push(new CollisionBlock({
                    position: {
                        x: x * 3,
                        y: y * 3,
                        x: x * 3,
                        y: y * 3,
                    },
                }))
            }
        })
    })

    return objects
}