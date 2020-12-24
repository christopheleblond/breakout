// particles.js
// Particle system 

// Define a particle
var Particle = function(x, y, options) {
    // Creation time
    this.birthTime = Timer.time
    // Random lifetime
    this.deathTime  = this.birthTime + Random.nextInt(options.maxAgeInSeconds) * 1000
    // Transfert options
    this._options = options
    // Move speed
    this._speed = this._options.speed.min + Random.nextInt(this._options.speed.max - this._options.speed.min)
    // Diplay color
    this.color = options.color
    // Move acceleration 
    this.ax = options.acc.x
    this.ay = options.acc.y
    // Creation position
    this.x0 = x
    this.y0 = y
    // Position
    this.x = x
    this.y = y
    // Velocity
    this.vx = (options.dir.min.x + Random.nextInt(options.dir.max.x - options.dir.min.x)) * this._options.force
    this.vy = (options.dir.min.y + Random.nextInt(options.dir.max.y - options.dir.min.y)) * this._options.force
    // Random size
    this._size = this._options.size.min + Random.nextInt(this._options.size.max - this._options.size.min)
    // Visibility / opacity
    this._alpha = 1

    this.update = (dt) => {
        // Movement
        this.vx += this.ax * dt
        this.vy += 0.5 * this.ay * dt
        this.x += this.vx * this._speed * dt
        this.y += this.vy * this._speed * dt
        // Opacity : 1 -> 0 in function age
        this._alpha = (this.deathTime - Timer.time) / (this.deathTime - this.birthTime)
        if(this._options.rigid){
            // Must bounce with walls
            if(this.x > Screen.WIDTH || this.x < 0) {
                this.vx = -this.vx
            }
        }
        if(this._options.collideWithBricks) {
            // Must collide with bricks
            Grid.bricks.filter(b => b._enabled).forEach(b => {
                if(Physics.collisionRect({ x: this.x, y: this.y, w: this._size, h: this._size}, b)) {
                    // Collision with brick detected
                    this.y = b.y - this._size
                    // Stop particle
                    this.vx = 0
                    this.ay = 0
                }
            })
        }
    }
    this.draw = () => {
        // Draw the particle sprite or shape rect/circle
        if(this._options.sprite) {
            drawSprite(this._options.sprite, this.x, this.y, this._size, this._size, this._alpha)
        }else if(this._options.shape === 'circle') {
            drawCircle(this.x, this.y, this._size, options.color, this._alpha)
        }else{
            drawRect({ x: this.x, y: this.y, w: this._size, h: this._size, c: options.color}, this._alpha)
        }
    }
}

// Define the system
var ParticleSystem = function(x, y, options) {
    // position
    this.x = x
    this.y = y
    // Current particles
    this._particles = []
    // Store all options    
    this._options = options
    // Is looping 
    this._looping = options.looping
    // All particles are created
    this._maxReached = false
    // Particle creation rate 
    this._particlesPerFrame = options.particlesPerFrame || 100
    // End of creation
    this._ended = false

    this._createParticle = () => {
        let _x = this.x + options.rect.offsetX + Random.nextInt(options.rect.width)
        let _y = this.y + options.rect.offsetY + Random.nextInt(options.rect.height)
        return new Particle(_x, _y, this._options)
    }

    this.update = (dt) => {
        // Hom many particles are create in this frame
        let particlesCreatedInThisFrame = 0
        while(this._particles.length < options.maxCount
            && (!this._maxReached || this._looping)
            && particlesCreatedInThisFrame < this._particlesPerFrame) {
            // Pop a new particle
            this._particles.push(this._createParticle())
        }
        // Check if all particles are created
        if(!this._maxReached && this._particles.length >= this._options.maxCount) this._maxReached = true

        for(let i = 0; i < this._particles.length; i++) {
            // Check age for all particles 
            if(Timer.time > this._particles[i].deathTime) {
                // Death of particle, remove from system
                this._particles.splice(this._particles.indexOf(this._particles[i]), 1)
            }else{
                // Simply update
                this._particles[i].update(dt)
            }
        }

        // Check end of system
        this._ended = this._maxReached && !this._looping && this._particles.length === 0
    }

    this.draw = () => {
        for(let i = 0; i < this._particles.length; i++) this._particles[i].draw()        
    }

    // Precalculate first frames
    if(options.precalculate) {
        for(let i = 0; i < options.precalculate; i++) {
            this.update(Timer.deltaTime)
        }
    }
}