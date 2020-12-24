// scenes.js
// Game scenes
var Scenes = {}

// Loading screen
Scenes.Loading = {
    name: 'Loading',
    init: () => {},
    draw: () => {
        Screen.clear()
        printText('Loading', Screen.WIDTH / 2, Screen.HEIGHT / 2, 22, 'gray')
    },
    update: () => {}
}

// Main menu screen
Scenes.Title = {
    name: 'Title',
    // title animation
    _animatedTitle: null,
    // Particles 
    _ps: null,
    // Main menu
    mainMenu: null,
    init: () => {        
        // Start scene
        Sounds.music.play()
        Scenes.Title._animatedTitle = new AnimatedTitle('Breakout', Screen.WIDTH / 2, Screen.HEIGHT / 2 - 200, 120, 'center')
        Scenes.Title.mainMenu = new Menu('', [
            { label: 'New Game', action: () => {
                sceneManager.setScene(Scenes.Game)
            }},            
            { label: 'Credits', action: () => {
                sceneManager.setScene(Scenes.Credits)
            }}
        ], Screen.WIDTH / 2 - Screen.WIDTH * 0.1, Screen.HEIGHT / 2, Screen.WIDTH * 0.20, Screen.WIDTH * 0.20)
        // Init the particles (looping)
        Scenes.Title._ps = new ParticleSystem(Screen.WIDTH / 2, Screen.HEIGHT / 2, {
            maxCount: 600,
            rect: { offsetX: 0, offsetY: 0, width: 10, height: 10 },
            acc: { x: 0, y: 9 },
            dir: { min: { x: -1, y: -1}, max: { x: 1, y: 1 } },
            force: 4,
            speed: { min: 10, max: 200 },
            maxAgeInSeconds: 2,
            color: 'red',
            size: { min: 1, max: 10 },
            decayInMillis: 0,
            gravity: { x: 0, y: 1 },
            particlesPerFrame: 300,
            looping: true
        })
    },
    draw: () => {
        Screen.clear()
        Scenes.Title._ps.draw()
        Scenes.Title._animatedTitle.draw()
        Scenes.Title.mainMenu.draw()
        printText('Use arrow key to navigate in the menu, Press [Enter] to validate', Screen.WIDTH / 2, Screen.HEIGHT - 30, 20, 'white')       
    },
    update: (dt) => {
        Scenes.Title.mainMenu.update(dt)
        Scenes.Title._animatedTitle.update(dt)
        // The particles follows the title
        Scenes.Title._ps.x = Scenes.Title._animatedTitle.x - 100
        Scenes.Title._ps.y = Scenes.Title._animatedTitle.y - 60        
        Scenes.Title._ps.update(dt)

    }
}

// main game screen
Scenes.Game = {
    name: 'Game',
    // Falling snow
    _ps: null,
    init: () => {                
        // Create the grid
        Grid.init()
        // Create paddle
        player = new Player(Screen.WIDTH / 2 - 100, Screen.HEIGHT - 60, 200, 24,
            { left: Sprites.paddleLeft, middle: Sprites.paddleMiddle, right: Sprites.paddleRight},
            10,
            GameSettings.LIVES)
        player.init()
        // new ball
        ball = newBall()
        // Creating snow
        Scenes.Game._ps = new ParticleSystem(0, 0, {
            maxCount: 300,
            rect: { offsetX: -100, offsetY: 0, width: Screen.WIDTH + 100, height: 10 },
            acc: { x: 0, y: 1 },
            dir: { min: { x: 0., y: 1}, max: { x: 0.5, y: 1 } },
            force: 1,            
            sprite: Sprites.flocon,
            speed: { min: 10, max: 200 },
            maxAgeInSeconds: 10,
            color: 'white',
            size: { min: 5, max: 10 },
            decayInMillis: 0,            
            particlesPerFrame: 300, 
            looping: true,            
            rigid: false,
            precalculate: 200,
            collideWithBricks: true
        })
    }, 
    draw: () => {
        Screen.clear()
        drawSprite(Sprites.background, 0, 0, Screen.WIDTH, Screen.HEIGHT)
        if(Scenes.Game._ps) {
            Scenes.Game._ps.draw()
        }
        Grid.draw()
        ball.draw()
        if(player) {
            player.draw()
        }        
        
        // gui
        for(let i = 0; i < player.attempt; i++) {
            drawSprite(Sprites.life, 30 + i * 30, Screen.HEIGHT - 30, 20, 20)
        }
        printText(player.score, Screen.WIDTH - 100, Screen.HEIGHT - 20, 23, 'white')
        printText(Timer.fps, 2, 10, 12, 'white', 'left')
    },
    update: (dt) => {
        // Check victory conditions
        Scenes.Game.checkVictory()
        Scenes.Game._ps.update(dt)
        Grid.update(dt)
        ball.update(dt)
        player.update(dt)
    },
    checkVictory: () => {        
        if(Grid.bricks.filter(b => b._enabled).length === 0) {
            // No more brick: Victory
            currentScene = Scenes.Victory
        }
    }
}

// Victory screen
Scenes.Victory = {
    name: 'Victory',
    init: () => {
        Sounds.win.play()
    },
    draw: () => {
        Screen.clear()
        printText('You Win !', Screen.WIDTH / 2, Screen.HEIGHT / 2, 30, 'white')
        printText('Score: ' + player.score, Screen.WIDTH / 2, Screen.HEIGHT / 2 + 30, 20, 'yellow')
        printText('Press [P] or left click to replay', Screen.WIDTH / 2, Screen.HEIGHT - 30, 20, 'green')
    },
    update: () => {
        if(Input.play()) {
            // Replay
            sceneManager.setScene(Scenes.Game)
        }
    }
}

// GameOver Screen
Scenes.GameOver = {
    name: 'GameOver',
    init: () => {
        Sounds.loose.play()
    },
    draw: () => {
        Screen.clear()
        printText('GAME OVER', Screen.WIDTH / 2, Screen.HEIGHT / 2, 30, 'white')
        printText('Score: ' + player.score, Screen.WIDTH / 2, Screen.HEIGHT / 2 + 30, 20, 'yellow')
        printText('Press [P] to replay or Left click', Screen.WIDTH / 2, Screen.HEIGHT - 30, 20, 'green')
    },
    update: () => {
        if(Input.play()) {
            // Replay
            sceneManager.setScene(Scenes.Game)
        }
    }
}

Scenes.Credits = {
    name: 'Credits',
    init: () => {},
    update: (dt) => {
        if(Input.isKeyPressed('Escape')) {
            sceneManager.setScene(Scenes.Title)
        }
    },
    draw: () => {
        Screen.clear()
        printText('Breakout', Screen.WIDTH / 2, Screen.HEIGHT / 2 - 300, 80, 'red')
        printText('Credits', Screen.WIDTH / 2, Screen.HEIGHT / 2 - 100, 40, 'white')

        printText('Developed by Christophe LEBLOND just for learning canvas drawing in javascript', Screen.WIDTH / 2, Screen.HEIGHT / 2, 20, 'white')
        printText('Assets from OpenGameArts (https://opengameart.org/)', Screen.WIDTH / 2, Screen.HEIGHT / 2 + 40, 20, 'white')
        printText('Christmas 2020 (CoVid19)', Screen.WIDTH / 2, Screen.HEIGHT / 2 + 80, 20, 'white')
        
        printText('Press [Esc] to return main menu', Screen.WIDTH / 2, Screen.HEIGHT - 30, 20, 'lightgreen')
    }
}

SceneManager = function(scenes) {
    this.scenes = scenes

    this.setScene = (scene) => {
        this.scene = scene
        this.scene.init()
    }

    this.update = (dt) => {
        this.scene.update(dt)
    }
    this.draw = () => {
        this.scene.draw()
    }

    this.setScene(this.scenes[0])
}

