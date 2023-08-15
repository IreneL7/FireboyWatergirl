const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

let parsedCollision
let parsedDeathCollisions
let collisionBlocks
let deathCollisionBlocks
let background
let doors

const player = new Player({
    imageSrc: './img/idlefrog.png',
    frameRate: 11,
    position: {
        x: 70,
        y: 420,
    },
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/idlefrog.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 3,
            loop: true,
            imageSrc: './img/idlefrog.png',
        },
        runRight: {
            frameRate: 11,
            frameBuffer: 3,
            loop: true,
            imageSrc: './img/idlefrog.png',
        },
        runLeft: {
            frameRate: 11,
            frameBuffer: 3,
            loop: true,
            imageSrc: './img/idlefrog.png',
        },
        enterDoor: {
            frameRate: 11,
            frameBuffer: 4,
            loop: false,
            imageSrc: './img/idlefrog.png',
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        if (level === 4) level = 1
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    },
                })
            },
        },
    }
})

const player2 = new Player({
    imageSrc: './img/idleduck.png',
    frameRate: 11,
    position: {
        x: 100,
        y: 0,
    },
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/idleduck.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 3,
            loop: true,
            imageSrc: './img/idleduck.png',
        },
        runRight: {
            frameRate: 11,
            frameBuffer: 3,
            loop: true,
            imageSrc: './img/duckright.png',
        },
        runLeft: {
            frameRate: 11,
            frameBuffer: 3,
            loop: true,
            imageSrc: './img/duckleft.png',
        },
        enterDoor: {
            frameRate: 11,
            frameBuffer: 4,
            loop: false,
            imageSrc: './img/enterdoorduck.png',
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        if (level === 4) level = 1
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overlay, {
                            opacity: 0
                        })
                    },
                })
            },
        },
    }
})


let level = 1
let levels = {
    1: {
        init: () => {
            parsedCollisions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player2.collisionBlocks = collisionBlocks

            if (player.currentAnimation) player.currentAnimation.isActive = false
            if (player2.currentAnimation) player2.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/FireboyWatergirlBg.png',
            })
            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]
        }
    },
    2: {
        init: () => {
            parsedCollisions = collisionsLevel2.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 140

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/backgroundLevel2.png',
            })
            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]
        }
    },
    3: {
        init: () => {
            parsedCollisions = collisionsLevel3.parse2D()
            collisionBlocks = parsedCollisions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 750
            player.position.y = 230

            if (player.currentAnimation) player.currentAnimation.isActive = false

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0,
                },
                imageSrc: './img/backgroundLevel3.png',
            })
            doors = [
                new Sprite({
                    position: {
                        x: 176,
                        y: 335,
                    },
                    imageSrc: './img/doorOpen.png',
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoplay: false,
                }),
            ]
        }
    }
}

const keys = {
    w: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
}

const overlay = {
    opacity: 0,
}

//temporary lines of code below
parsedDeathCollisions = deathCollisions.parse2D()
deathCollisionBlocks = parsedDeathCollisions.createObjectsFrom2D()
//delete above later

function animate() {
    window.requestAnimationFrame(animate)
    
    background.draw()
    // Code below was commented out but I uncommented to show collision blocks
    collisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw()
    })

    deathCollisionBlocks.forEach(collisionBlock => {
        collisionBlock.draw()
    })
    // Changes end here
    doors.forEach((door) => {
        door.draw()
    })
    
    player.handleInput(keys)
    player.draw()
    player.update()

    player2.handleInputDuck(keys)
    player2.draw()
    player2.update()

    c.save()
    c.globalAlpha = overlay.opacity
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()
}

levels[level].init()
animate()