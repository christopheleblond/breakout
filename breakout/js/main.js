
var Title = {
    draw: () => {
        Screen.clear()
        printText('Breakout', Screen.WIDTH / 2, Screen.HEIGHT / 2, 48, 'green')
        printText('Press [Space] to play', Screen.WIDTH / 2, Screen.HEIGHT - 30, 20, 'white')
    },
    update: (dt) => {
        if(Input.isKeyPressed('Space')) {
            Game.init()
            currentScene = Game
        }
    }
}
var Game = {
    init: () => {
        Grid.init()
        player.init()
        ball = newBall()
    },
    draw: () => {
        Screen.clear()
        // draw
        Grid.draw()

        ball.draw()

        player.draw()

        GUI.draw()
    },
    update: (dt) => {
        timer.update()
        ball.update()
        player.update()
        GUI.update()
    }
}

var GameOver = {
    draw: () => {
        Screen.clear()
        printText('GAME OVER', Screen.WIDTH / 2, Screen.HEIGHT / 2, 30, 'white')
        printText('Score: ' + player.score, Screen.WIDTH / 2, Screen.HEIGHT / 2 + 30, 20, 'yellow')
        printText('Press [Enter] to replay', Screen.WIDTH / 2, Screen.HEIGHT - 30, 20, 'green')
    },
    update: () => {
        if(Input.key === 'Enter') {
            Game.init()
            currentScene = Game
        }
    }
}
var hitPoint = null

var lastFrameTime = 0
var Demo = {
    ball: {
        x: Screen.WIDTH /2,
        y: Screen.HEIGHT / 2,
        xp: 0,
        yp: 0,
        size: 20,
        s: 2,
        vx: 0,
        vy: 0,
        dir: ''
    },
    brick: {
        x: 200,
        y: 200,
        w: 100,
        h: 50,
        c: 'red'
    },
    draw: () => {
        Screen.clear()
        drawRect(Demo.brick)
        drawCircle(Demo.ball.x, Demo.ball.y, Demo.ball.size, 'green')
        
        
        drawLine(Demo.ball, { x: Demo.ball.xp, y: Demo.ball.yp }, 'white')

        if(hitPoint) {            
            printText(JSON.stringify(hitPoint) + '', Screen.HEIGHT - 10, 20, 20, 'white')
        }

        // Debug infos
        printText(JSON.stringify(Demo.ball), 20, Screen.HEIGHT - 20, 12, 'white', 'left')
    },
    update: () => {

        FrameCount += 1
        Demo.ball.vx = 0
        Demo.ball.vy = 0

        if(Input.isKeyPressed('ArrowLeft')) {
            Demo.ball.vx = -1
        }
        if(Input.isKeyPressed('ArrowRight')) {
            Demo.ball.vx = 1
        }
        if(Input.isKeyPressed('ArrowUp')) {
            Demo.ball.vy = -1
        }
        if(Input.isKeyPressed('ArrowDown')) {
            Demo.ball.vy = 1
        }

        Demo.ball.xp = Demo.ball.x
        Demo.ball.yp = Demo.ball.y
        Demo.ball.x = Demo.ball.x + Demo.ball.vx * Demo.ball.s
        Demo.ball.y = Demo.ball.y + Demo.ball.vy * Demo.ball.s
        Demo.ball.dir = Demo.ball.x - Demo.ball.xp > 0 ? 'right' : Demo.ball.x - Demo.ball.xp < 0 ? 'left' : ''
        Demo.ball.dir += Demo.ball.y - Demo.ball.yp > 0 ? 'down' : Demo.ball.y - Demo.ball.yp < 0 ? 'up' : ''

        hitPoint = Physics.intersect({x: Demo.brick.x, y: Demo.brick.y + Demo.brick.h },
            { x: Demo.brick.x + Demo.brick.w, y: Demo.brick.y + Demo.brick.h },
            Demo.ball, { x: Demo.ball.xp, y: Demo.ball.yp })
    }
}

var currentScene = Title
var pause = false

window.requestAnimFrame = window.requestAnimationFrame 
                        || window.webkitRequestAnimationFrame
                        || window.mozRequestAnimationFrame
                        || ((callback) => {
                            setTimeout(callback, 1000 / 60)
                        })
var dt = 0
var lastFrameTime = Date.now()
var refreshFpsGui = 0
var fps = 0
function mainLoop() {

    currentScene.update(dt)
    currentScene.draw()

    dt = Date.now() - lastFrameTime
    if(Date.now() - refreshFpsGui > 500) {
        fps = Math.floor(1.0 / (dt / 1000))
        refreshFpsGui = Date.now()
    }
    
    lastFrameTime = Date.now()

    window.requestAnimFrame(mainLoop)
}
mainLoop()
