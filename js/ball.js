// ball.js
var Ball = function(x, y, size, speed, sprite) {
    // Position
    this.x = x
    this.y = y
    // Previous position
    this.xp = x
    this.yp = y
    // Move direction
    this.dir = ''
    // Size
    this.size = size
    // Velocity
    this.vx = 1
    this.vy = 1,
    this.s = speed
    // Locked with paddle
    this.locked = true
    this.disabled = false
    // Sprite to display 
    this.sprite = sprite

    this.init = () => {
        // Nothing to do 
    }    

    // Check collisions and movement
    this.update = (dt) => {
        if(this.disabled) {
            return;
        }
        if(this.locked) {
        // Ball is not yet launched 
            this.x = player.x + player.w / 2
            this.y = player.y - ball.size
            return
        }
        
        var collision = false
        // check collisions with left wall
        if((this.x - this.size < 0)
        || (this.x + this.size > Screen.WIDTH)) {
            Sounds.bounce.play()
            this.vx = -this.vx                
        }
        
        // Check collision with right wall
        if(this.y - this.size < 0) {
            Sounds.bounce.play()
            this.vy = -this.vy
        }
        
        // Ball below paddle, loose
        if(this.y > player.y + player.h) {
            this.disabled = true
            player.attempt -= 1
            
            // Check lifes remaining
            if(player.attempt < 0) {
                // Game Over
                sceneManager.setScene(Scenes.GameOver)
                return

            }else{
                // Another attempt in 3 seconds
                Sounds.fail.play()
                waitForSeconds(3).then(() => ball = newBall())                                
            }
        }

        // Check collision with paddle player
        if(this.x >= player.x && this.x <= player.x + player.w && this.y + this.size > player.y) {
            Sounds.bounce.play()
            this.vx = (this.x - (player.x + (player.w / 2))) / (player.w / 2)
            this.vy = -this.vy
            this.y = player.y - ball.size
            // Accelerate the ball
            this.s += 0.2
            // Reset the score multiplier
            player.multiple = 1
        }
    
        // Check collision with all bricks     
        let closestHit = null
        let closestDistance = 99999    
        let closestCollisionBrick = null
        for(let i = 0; !collision && i < Grid.bricks.length; i++) {
            if(!Grid.bricks[i]._enabled) {
                continue;
            }
            let b = Grid.bricks[i]
                             
            let hit = false
            if(this.dir.indexOf('R') >= 0) {
                // Ball moving Right, check collision with left edge of brick
                hit = Physics.intersect(this, { x: this.x + this.vx * this.s, y: this.y + this.vy * this.s }, 
                    { x: b.x - this.size, y: b.y - this.size }, { x: b.x - this.size, y: b.y + b.h + this.size }, 'left')

            }else if(this.dir.indexOf('L') >= 0) {
                // Ball moving Left, check collision with right edge of brick
                hit = Physics.intersect(this, { x: this.x + ball.vx * this.s , y: this.y + this.vy * this.s },
                    { x: b.x + b.w + this.size, y: b.y - this.size }, { x: b.x + b.w + this.size, y: b.y + b.h + this.size }, 'right')
            }
            if(!hit) {
                // If collision with left or right edge, no need to check with other edges              
                if(this.dir.indexOf('U') >= 0) {
                     // Ball moving Up, check collision with bottom edge of brick
                    hit = Physics.intersect(this, { x: this.x + this.vx * this.s , y: this.y + this.vy * this.s },
                        { x: b.x - this.size, y: b.y + b.h + this.size }, { x: b.x + b.w + this.size, y: b.y + b.h + this.size }, 'bottom')

                }else if(this.dir.indexOf('D') >= 0) {
                     // Ball moving Down, check collision with top edge of brick
                    hit = Physics.intersect(this, { x: this.x + this.vx * this.s , y: this.y + this.vy * this.s },
                        { x: b.x - this.size, y: b.y - this.size }, { x: b.x + b.w + this.size, y: b.y - this.size }, 'top')
                }
            }
            if(hit) {
                // Collision detected
                let hitDistance = vectorDistance(this, hit)
                // Is it the closest collision ?
                if(hitDistance < closestDistance) {
                    closestHit = hit
                    closestDistance = hitDistance
                    closestCollisionBrick = b                        
                }
            }    
        }

        if(closestHit) {
            // Collision dectected
            Sounds.explosion.play()
            // Check collision position to find the bounce direction
            if(closestHit.dir === 'left' || closestHit.dir === 'right') {                
                this.vx = -ball.vx
            }
            if(closestHit.dir === 'top' || closestHit.dir === 'bottom') {
                this.vy = -ball.vy
            }

            // Remove brick
            Grid.destroyBrick(closestCollisionBrick, this.s * 0.2)
            // Update score
            player.score += closestCollisionBrick.score * player.multiple
            player.multiple++                
        }
        
        // Store previous position to determinate the direction
        this.xp = this.x
        this.yp = this.y
        
        // Movement
        this.x += this.vx * this.s
        this.y += this.vy * this.s
        
        // Determine the move direction
        this.dir = this.x - this.xp > 0 ? 'R' : this.x - this.xp < 0 ? 'L' : ''
        this.dir += this.y - this.yp > 0 ? 'D' : this.y - this.yp < 0 ? 'U' : ''
    }
    this.draw = () => {
        if(this.disabled) {
            return;
        }
        drawSprite(this.sprite, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2)
    }
}

function newBall() {
    Sounds.newBall.play()
    return new Ball(0, 0, 10, 8, Sprites.ball)
}

var ball = newBall()