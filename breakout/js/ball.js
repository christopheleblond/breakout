var frame = 0
function newBall() {
    return {
        x: 10,
        y: Screen.HEIGHT / 2 - 30,
        xp: 0,
        yp: 0,
        c: "#FFFFFF",
        dir: '',
        size: 10,
        vx: 1,
        vy: 1,
        s: 8,
        disabled: false,
        collision: false,
        init: () => {

        },
        isCollideWithRect(ball, rect) {
            // ball is on the left edge
            return false            
        },
        draw: () => {
            if(ball.disabled) {
                return;
            }        
            drawCircle(ball.x, ball.y, ball.size, ball.c)
        },
        update: () => {
            frame++
            if(ball.disabled) {
                return;
            }
            var collision = false
            // check collisions with Walls
            if((ball.x - ball.size < 0)
            || (ball.x + ball.size > Screen.WIDTH)) {
                Sounds.tomhi.play()
                ball.vx = -ball.vx
                //collision = true
            }
            
            if(ball.y - ball.size < 0) {
                Sounds.tomhi.play()
                ball.vy = -ball.vy
                //collision = true
            }            
            
            // ball lost
            if(ball.y > player.y + player.h) {
                ball.disabled = true
                player.attempt -= 1
                if(player.attempt < 0) {
                    currentScene = GameOver

                }else{
                    waitForSeconds(3).then(() => ball = newBall())
                    // Wait 3s                    
                }
            }

            // Check collision with paddle player
            if(ball.x >= player.x && ball.x <= player.x + player.w && ball.y + ball.size > player.y) {
                Sounds.tom.play()
                ball.vx = (ball.x - (player.x + (player.w / 2))) / (player.w / 2)
                ball.vy = -ball.vy
                ball.y = player.y - ball.size
            }
        
            // Check collision with all bricks     
            let closestHit = null
            let closestDistance = 99999    
            let closestCollisionBrick = null
            for(let i = 0; !collision && i < Grid.bricks.length; i++) {
                if(!Grid.bricks[i].enabled) {
                    continue;
                }
                let b = Grid.bricks[i]
                                 
                let hit = false
                if(ball.dir.indexOf('R') >= 0) {
                    hit = Physics.intersect(ball, { x: ball.x + ball.vx * ball.s, y: ball.y + ball.vy * ball.s }, 
                        { x: b.x - ball.size, y: b.y - ball.size }, { x: b.x - ball.size, y: b.y + b.h + ball.size }, 'left')

                }else if(ball.dir.indexOf('L') >= 0) {
                    hit = Physics.intersect(ball, { x: ball.x + ball.vx * ball.s , y: ball.y + ball.vy * ball.s },
                        { x: b.x + b.w + ball.size, y: b.y - ball.size }, { x: b.x + b.w + ball.size, y: b.y + b.h + ball.size }, 'right')
                }
                if(!hit) {
                    if(ball.dir.indexOf('U') >= 0) {
                        hit = Physics.intersect(ball, { x: ball.x + ball.vx * ball.s , y: ball.y + ball.vy * ball.s },
                            { x: b.x - ball.size, y: b.y + b.h + ball.size }, { x: b.x + b.w + ball.size, y: b.y + b.h + ball.size }, 'bottom')

                    }else if(ball.dir.indexOf('D') >= 0) {
                        hit = Physics.intersect(ball, { x: ball.x + ball.vx * ball.s , y: ball.y + ball.vy * ball.s },
                            { x: b.x - ball.size, y: b.y - ball.size }, { x: b.x + b.w + ball.size, y: b.y - ball.size }, 'top')
                    }
                }
                if(hit) {
                    let hitDistance = vectorDistance(ball, hit)                    
                    if(hitDistance < closestDistance) {
                        closestHit = hit
                        closestDistance = hitDistance
                        closestCollisionBrick = b                        
                    }
                }    
            }

            if(closestHit) {
                if(closestHit.dir === 'left' || closestHit.dir === 'right') {
                    ball.vx = -ball.vx
                }
                if(closestHit.dir === 'top' || closestHit.dir === 'bottom') {
                    ball.vy = -ball.vy
                }

                Grid.destroyBrick(closestCollisionBrick)
            }
            
            // animation
            ball.xp = ball.x
            ball.yp = ball.y
            ball.x += ball.vx * ball.s
            ball.y += ball.vy * ball.s
            
            ball.dir = ball.x - ball.xp > 0 ? 'R' : ball.x - ball.xp < 0 ? 'L' : ''
            ball.dir += ball.y - ball.yp > 0 ? 'D' : ball.y - ball.yp < 0 ? 'U' : ''
        }
    }
}

var ball = newBall()