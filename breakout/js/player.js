var player = {
    x: Screen.WIDTH / 2 - 100,
    y: Screen.HEIGHT - 30,
    w: 200,
    h: 10,
    vx: 0,
    vy:0,
    s: 10,
    attempt: GameSettings.LIFES,
    score: 0,
    c: "#CC0909",
    init: () => {
        player.x = Screen.WIDTH / 2 - 100
        player.y = Screen.HEIGHT - 30
        player.attempt = GameSettings.LIFES
        player.score = 0
    },
    draw: () => {
        drawRect(player)
    },
    update: () => {
        player.vx = 0
        if(Input.isKeyPressed('ArrowLeft')) {
            player.vx = -1
        }
        if(Input.isKeyPressed('ArrowRight')) {
            player.vx = 1
        }
         
        
        player.x += player.vx * player.s
        player.y += player.vy * player.s

        if(player.x < 0) {
            player.x = 0
        }
        if(player.x + player.w > Screen.WIDTH) {
            player.x = Screen.WIDTH - player.w
        }
    }
}