// anim.js
// Animation utility

// Interpolation between two values
function lerp(a, b, t) {    
    return a + (b - a) * t
}

// Title animated
var AnimatedTitle = function(text, x, y, size, align = 'left') {
    this.x0 = x
    this.y0 = y
    this.x = x
    this.y = y 
    this.dx = x + 200
    this.dy = y
    this.size = size
    this.text = text
    this.align = align
    this._colors = ['red', 'green', 'blue']
    this.color = 'red'
    this.tickTime = 0
    this.duration = 300
    
    this.update = (dt) => {        
        if(Timer.time - this.tickTime > this.duration) {
            let i = this._colors.indexOf(this.color)
            this.color = this._colors[ (i + 1) % this._colors.length ]
            this.tickTime = Timer.time
            this.duration = Random.nextInt(200)
            this.dx = this.x0 + (Random.nextInt(Screen.WIDTH / 5) - Random.nextInt(Screen.WIDTH / 5))
            this.dy = this.y0 + (Random.nextInt(Screen.HEIGHT / 5) - Random.nextInt(Screen.HEIGHT / 5))
        }               
        this.x = lerp(this.x, this.dx, dt)
        this.y = lerp(this.y, this.dy, dt)        
    }
    this.draw = (dt) => {
        printText(this.text, this.x, this.y, this.size, this.color, this.align)
    }
}

// Define the animated sprite
var AnimatedSprite = function(sprite, x, y, w, h, speed = 100) {
    this.img = SpriteSheets[sprite.img].img
    this.rect = { x: x, y: y, w: w, h: h }
    this.anim = {
        frames: sprite.sprites,
        speed: speed
    }
    this.framesCount = this.anim.frames.length
    this._lastUpdateFrameTime = Timer.time
    this._currentFrameIndex = 0;
    this._currentFrame = this.anim.frames[this._currentFrameIndex]
    this.debug = false

    this.update = (dt) => {
        if(Timer.time - this._lastUpdateFrameTime > this.anim.speed) {
            this._currentFrameIndex = (this._currentFrameIndex+1) % this.framesCount
            this._currentFrame = this.anim.frames[ this._currentFrameIndex ]
            this._lastUpdateFrameTime = Timer.time
        }
    }

    this.draw = () => {
        if(this.debug) {
            printText(this._currentFrameIndex, this.rect.x, this.rect.y, 20, 'white', 'left')
        }
        drawImage(this.img, this._currentFrame.x, this._currentFrame.y, this._currentFrame.w, this._currentFrame.h, this.rect.x, this.rect.y, this.rect.w, this.rect.h)
    }
}
