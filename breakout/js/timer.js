// timer.js
// Timing management (delta and frames...)
Clock = function() {
    this.deltaTime = 0
    this.time = 0
    this.fps = 0
    this._previousFrameTime = Date.now()

    this.update = () => {
        this.time = Date.now()
        this.deltaTime = (this.time - this._previousFrameTime) / 1000.0
        this.fps = Math.floor(1.0 / this.deltaTime)
        this._previousFrameTime = this.time
    }
}

var Timer = new Clock()