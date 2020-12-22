function lerp(a, b, t) {
    //console.log(a, b, t)
    return a + (b - a) * t
}

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

