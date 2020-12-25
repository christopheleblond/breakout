var GUI =  {
    draw: () => {
        if(currentScene === Game) {
            for(let i = 0; i < player.attempt; i++) {
                //drawCircle(30 + i * 30, Screen.HEIGHT - 20, 10, 'white')
                drawSprite(Sprites.life, 30 + i * 30, Screen.HEIGHT - 30, 20, 20)
            }
            printText(player.score, Screen.WIDTH - 100, Screen.HEIGHT - 20, 23, 'white')
            printText(Timer.fps, 2, 10, 12, 'white', 'left')
            //printText(JSON.stringify(ball), 10, Screen.HEIGHT - 20, 20, 'white', 'left')
        }
        
    },
    update: () => {

    }
}
