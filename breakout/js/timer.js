var timer = {
    startTime: new Date().getTime(),
    frame: 0,
    start: () => {
        timer.startTime = new Date().getTime()
    },
    update: () => {
        timer.frame = new Date().getTime() - timer.startTime
    },
    waitForSeconds: (seconds, callback) => {
        let begin = timer.frame

        return {
            
        }
    }
}