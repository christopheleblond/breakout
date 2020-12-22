
var Loading = {
    draw: () => {
        Screen.clear()
        printText('Loading', Screen.WIDTH / 2, Screen.HEIGHT / 2, 22, 'gray')
    },
    update: () => {}
}
var Title = {
    _animatedTitle: new AnimatedTitle('Breakout', Screen.WIDTH / 2, Screen.HEIGHT / 2, 48, 'center'),
    init: () => {        
        Sounds.title.play()        
    },
    draw: () => {
        Screen.clear()
        Title._animatedTitle.draw()     
        printText('Press [Space] to play', Screen.WIDTH / 2, Screen.HEIGHT - 30, 20, 'white')       
    },
    update: (dt) => {
        if(Input.isKeyPressed('Space')) {            
            currentScene = Game
        }
        Title._animatedTitle.update(dt)
    }
}
var Game = {
    init: () => {
        Sounds.music.play()
        Grid.init()
        player.init()
        ball = newBall()
    },
    draw: () => {
        Screen.clear()
        drawSprite(Sprites.background, 0, 0, Screen.WIDTH, Screen.HEIGHT)
        // draw
        Grid.draw()

        ball.draw()

        player.draw()

        GUI.draw()
    },
    update: (dt) => {
        Game.checkVictory()        
        ball.update()
        player.update()
        GUI.update()
    },
    checkVictory: () => {        
        if(Grid.bricks.filter(b => b.enabled).length === 0) {
            // No more brick: Victory
            currentScene = Victory
        }
    }
}

var Victory = {
    init: () => {
        Sounds.win.play()
    },
    draw: () => {
        Screen.clear()
        printText('You Win !', Screen.WIDTH / 2, Screen.HEIGHT / 2, 30, 'white')
        printText('Score: ' + player.score, Screen.WIDTH / 2, Screen.HEIGHT / 2 + 30, 20, 'yellow')
        printText('Press [Enter] to replay', Screen.WIDTH / 2, Screen.HEIGHT - 30, 20, 'green')
    },
    update: () => {
        if(Input.isKeyPressed('Enter')) {            
            currentScene = Game
        }
    }
}

var GameOver = {
    init: () => {
        Sounds.loose.play()
    },
    draw: () => {
        Screen.clear()
        printText('GAME OVER', Screen.WIDTH / 2, Screen.HEIGHT / 2, 30, 'white')
        printText('Score: ' + player.score, Screen.WIDTH / 2, Screen.HEIGHT / 2 + 30, 20, 'yellow')
        printText('Press [Enter] to replay', Screen.WIDTH / 2, Screen.HEIGHT - 30, 20, 'green')
    },
    update: () => {
        if(Input.isKeyPressed('Enter')) {            
            currentScene = Game
        }
    }
}

var currentScene = Loading
var pause = false

window.requestAnimFrame = window.requestAnimationFrame 
                        || window.webkitRequestAnimationFrame
                        || window.mozRequestAnimationFrame
                        || ((callback) => {
                            setTimeout(callback, 1000 / 60)
                        })
var dt = 0
var previousScence = null

function mainLoop() {

    Timer.update()

    if(previousScence !== currentScene) {
        if(currentScene.init) {
            currentScene.init()
        }
        previousScence = currentScene
    }

    currentScene.update(Timer.deltaTime)
    currentScene.draw()   

    window.requestAnimFrame(mainLoop)
}

loadAssets().then(() => {
    console.log('All assets are loaded')
    currentScene = Title
    console.log('Game starting...')
    mainLoop()
})


