var Timer = {
    deltaTime: 0,
    time: 0,
    fps: 0,
    _previousFrameTime: Date.now(),
    update: () => {
        Timer.time = Date.now()
        Timer.deltaTime = (Timer.time - Timer._previousFrameTime) / 1000.0
        Timer.fps = Math.floor(1.0 / Timer.deltaTime)
        Timer._previousFrameTime = Timer.time
    }
}