// bricks.js
// Brick and Grid

// Brick sprites
var BRICK_PALETTE = [Sprites.brick0, Sprites.brick1, Sprites.brick2, Sprites.brick3, Sprites.brick4, Sprites.brick5, Sprites.brick6, Sprites.brick7]
// Brick color (for explosion particles)
var COLORS = ['black', 'darkblue', 'lightgreen','purple','red','orange','lightblue','yellow']

// Levels : 0 = No brick, other = BRICK_PALETTE index
var level1 = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,2,2,2,2,2,2,2,2,2,2,2,0,0,
    0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,
    0,0,6,6,6,6,6,6,6,6,6,6,6,0,0,
    0,0,5,5,5,5,5,5,5,5,5,5,5,0,0,
    0,0,4,4,4,4,4,4,4,4,4,4,4,0,0,
    0,0,3,3,3,3,3,3,3,3,3,3,3,0,0
]

// Level to display
var currentLevel = level1

Brick = function(id, x, y, width, height, sprite, color) {
    // brick id for optimisation 
    this._id =  id
    // Position
    this.x = x
    this.y = y
    // Dimensions
    this.w = width
    this.h = height
    // Can collide 
    this._enabled = true
    // Score won if ball collide
    this.score = 100
    // Sprite 
    this._sprite = sprite
    // Color of explosion particles
    this._color = color

    this.update = (dt) => {
        // Noting to do 
    }

    this.draw = () => {
        // Simply draw the sprite if enabled
        if(!this._enabled) {
            return
        }
        drawSprite(this._sprite, this.x, this.y, this.w, this.h)
    }
}

var GridModel = function(brickWidth, brickHeight, rows, cols, gap) {
    // Bricks dimensions
    this.brickWidth = brickWidth
    this.brickHeight = brickHeight
    // Grid size
    this.rows = rows
    this.cols = cols
    this.gap = gap
    // All explosions
    this.explosions = []
    // All bricks
    this.bricks = []
    this.createBrick = (id, x, y, speed, color) => {
        // Build a new Brick with id, position
        return new Brick(id, x, y, this.brickWidth, this.brickHeight, speed, color)
    }
    this.init = () => {
        // Build the grid
        this.bricks = []
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                let brickId = j * this.cols + i
                if(currentLevel[brickId]) {                    
                    this.bricks.push(this.createBrick(brickId, i * (this.brickWidth + this.gap),
                    j * (this.brickHeight + this.gap),                    
                    BRICK_PALETTE[currentLevel[brickId] - 1], 
                    COLORS[currentLevel[brickId]]))
                }
            }
        }
    }
    this.update = (dt) => {        
        this.bricks.forEach(b => b.update(dt))        
        this.explosions.filter(e => !e._ended).forEach(e => e.update(dt))
    }
    this.draw = () => {
        this.bricks.forEach(b => b.draw())
        Grid.explosions.forEach(e => e.draw())
    }
    this.destroyBrick = (brick, force = 4) => {
        // Disable the brick
        brick._enabled = false
        // Add new explosion to brick position
        this.explosions.push(new ParticleSystem(brick.x + (brick.w / 2), brick.y + (brick.h / 2), {
            maxCount: 10,
            rect: { offsetX: 0, offsetY: 0, width: brick.w, height: brick.h },
            acc: { x: 0, y: 9 },
            dir: { min: { x: -1, y: -1}, max: { x: 1, y: 1 } },
            force: force,
            speed: { min: 10, max: 200 },
            maxAgeInSeconds: 1,
            color: brick._color,
            size: { min: this.brickWidth / 5, max: this.brickWidth / 4 },
            decayInMillis: 0,            
            particlesPerFrame: 10,
            looping: false
        }))
    }
}

var Grid = new GridModel(Screen.WIDTH / GameSettings.COLS, (Screen.HEIGHT * 0.40) / GameSettings.ROWS, GameSettings.ROWS, GameSettings.COLS, GameSettings.GAP)