var player = {
    x: Screen.WIDTH / 2 - 100,
    y: Screen.HEIGHT - 30,
    w: 200,
    h: 24,
    vx: 0,
    vy:0,
    s: 10,
    attempt: GameSettings.LIFES,
    score: 0,
    multiple: 1,
    c: "#CC0909",
    init: () => {
        player.x = Screen.WIDTH / 2 - 100
        player.y = Screen.HEIGHT - 30
        player.attempt = GameSettings.LIFES
        player.score = 0
    },
    draw: () => {
        //drawRect(player)
        drawSprite(Sprites.paddleLeft, player.x, player.y, 48, player.h)
        drawSprite(Sprites.paddleMiddle, player.x + 47, player.y, player.w - 96, player.h)
        drawSprite(Sprites.paddleRight, player.x + player.w - 50, player.y, 48, player.h)
    },
    update: () => {
        player.vx = 0
        if(Input.isKeyPressed('ArrowLeft')) {
            player.vx = -1
        }
        if(Input.isKeyPressed('ArrowRight')) {
            player.vx = 1
        }
        if(ball.locked && Input.isKeyPressed('Space')) {
            ball.locked = false
            ball.vx = 1
            ball.vy = -1
        }

        player.x += player.vx * player.s
        player.y = Screen.HEIGHT - 30

        if(player.x < 0) {
            player.x = 0
        }
        if(player.x + player.w > Screen.WIDTH) {
            player.x = Screen.WIDTH - player.w
        }
    }
}