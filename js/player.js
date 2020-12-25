// player.js
// Player paddle management
Player = function(x, y, w, h, sprites, speed, lives) {
    // Initial position
    this.x0 = x
    this.y0 = y
    // Position
    this.x = x
    this.y = y
    // Dimensions
    this.w = w
    this.h = h
    // Move speed
    this.s = speed
    // Sprites in 3 parts
    this.spriteLeft = sprites.left
    this.spriteMiddle = sprites.middle 
    this.spriteRight = sprites.right 
    // Player score
    this.score = 0
    // Current score multiplier
    this.multiple = 1
    // Remaining lives
    this.attempt = lives

    this.init = () => {
        // Replace the paddle
        this.x = this.x0
        this.y = this.y0
        // Reset lives and score
        this.attempt = GameSettings.LIVES
        this.score = 0
    }
    this.update = (dt) => {
        if(ball.locked && Input.action()) {
            // Launch the ball
            ball.locked = false
            ball.vx = 1
            ball.vy = -1
        }

        // Horizontal movement only        
        this.x = Input.mouseX - this.w / 2

        // Clamping movement on the screen
        if(this.x < 0) {
            this.x = 0
        }
        if(this.x + this.w > Screen.WIDTH) {
            this.x = Screen.WIDTH - this.w
        }
    }
    this.draw = () => {
        drawSprite(this.spriteLeft, this.x, this.y, 48, this.h)
        drawSprite(this.spriteMiddle, this.x + 47, this.y, this.w - 96, this.h)
        drawSprite(this.spriteRight, this.x + this.w - 50, this.y, 48, this.h)
        if(ball.locked) {
            printText('Press [Space] to launch the ball', Screen.WIDTH / 2, Screen.HEIGHT / 2, 20, 'white', 'center')
        }
    }
}

// Create the player
var player = null