window.addEventListener('keydown', (event) => {
    if (player.preventInput) return
    switch (event.key) {
        case 'w':
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]
                if (player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x && 
                    player.hitbox.position.y + player.hitbox.height >= door.position.y && 
                    player.hitbox.position.y <= door.position.y + door.height) {
                        player.velocity.x = 0
                        player.velocity.y = 0
                        //player.preventInput = true
                        player.switchSprite('enterDoor')
                        door.play()
                        return
                }
            }
            if (player.velocity.y === 0) player.velocity.y = -15
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
        case 'ArrowUp':
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]
                if (player2.hitbox.position.x + player2.hitbox.width <= door.position.x + door.width &&
                    player2.hitbox.position.x >= door.position.x && 
                    player2.hitbox.position.y + player2.hitbox.height >= door.position.y && 
                    player2.hitbox.position.y <= door.position.y + door.height) {
                        player2.velocity.x = 0
                        player2.velocity.y = 0
                        //player2.preventInput = true
                        player2.switchSprite('enterDoor')
                        door.play()
                        return
                }
            }
            if (player2.velocity.y === 0) player2.velocity.y = -15
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'a':
            keys.a.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})