// game.js
// Game Engine

var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 30
canvas.height = window.innerHeight - 30

window.requestAnimFrame = window.requestAnimationFrame 
                        || window.webkitRequestAnimationFrame
                        || window.mozRequestAnimationFrame
                        || ((callback) => {
                            setTimeout(callback, 1000 / 60)
                        })

// Screen properties
var Screen = {
    WIDTH: canvas.width,
    HEIGHT: canvas.height,
    clear: () => ctx.clearRect(0, 0, Screen.WIDTH, Screen.HEIGHT),
    resize: (event) => {
        // User resize window, need to update game object positions and dimensions
        canvas.width = window.innerWidth - 30
        canvas.height = window.innerHeight - 30
        Screen.WIDTH = canvas.width
        Screen.HEIGHT = canvas.height
    }
}

// Global Settings
var GameSettings = {
    // Ball initial speed
    speed: 10,
    // Grid dimension
    COLS: 15,
    ROWS: 15,
    // Gap between two bricks
    GAP: 0,
    // Player lifes
    LIVES: 2
}

// Random utility
var Random = {
    // Random int between 0 and a
    nextInt: (a) => Math.random() * a,
    // Random color
    nextColor: () => "rgb(" + Math.random() * 256 +"," + Math.random() * 256 + "," + Math.random() * 256+ ")"
}

var FrameCount = 0

// Input manager
var Input = {
    // true if a key pressed
    keypressed: false,    
    keydown: false,
    // all keys pressed
    keys: [],
    keyUp: '',
    mouseX: 0,
    mouseY: 0,
    mouseClicked: [false, false, false], // left, center, right buttons
    onKeyDown: (e) => {
        // Player press a key
        Input.keypressed = true
        if (Input.keys.indexOf(e.code) < 0) Input.keys.push(e.code)         
    },
    onKeyUp: (e) => {
        // Player release a key
        Input.keypressed = false
        Input.keys.splice(Input.keys.indexOf(e.code), 1)
    },
    onMouseMove: (e) => {        
        Input.mouseX = e.offsetX
        Input.mouseY = e.offsetY
    },
    onMouseDown: (e) => {               
        Input.mouseClicked[e.button] = true
    },
    onMouseUp: (e) => {
        Input.mouseClicked[e.button] = false
    },
    // Check if the key key is pressed
    isKeyPressed: (key) => Input.keys.includes(key),
    // useful mappings
    action: () => Input.isKeyPressed('Space') || Input.mouseClicked[0],
    play: () => Input.isKeyPressed('KeyP')
}

// Events binding
document.addEventListener("keydown", Input.onKeyDown, false)
document.addEventListener("keyup", Input.onKeyUp, false)
canvas.addEventListener("mousemove", Input.onMouseMove, false)
canvas.addEventListener("mousedown", Input.onMouseDown)
canvas.addEventListener("mouseup", Input.onMouseUp)
window.addEventListener("resize", Screen.resize)

// Drawing utility

// Draw a line from point p1 to p2
function drawLine(p1, p2, color, alpha = 1) {
    ctx.beginPath()
    ctx.globalAlpha = alpha
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.closePath()
}

// Draw a rectangle filled
function drawRect(r, alpha = 1) {
    ctx.beginPath();
    ctx.globalAlpha = alpha
    ctx.rect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = r.c;
    ctx.fill();
    ctx.closePath();
}

// Display a text
function printText(text, x, y, size, color, align = 'center') {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.font = size + 'px Aldo'
    ctx.textAlign = align
    ctx.fillText(text, x, y)
    ctx.closePath()
}

// Draw a circle filled
function drawCircle(x, y, size, color, alpha = 1) {
    ctx.beginPath();
    ctx.globalAlpha = alpha
    ctx.arc(x, y, size, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

// Draw a image
function drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh, alpha = 1) {
    ctx.beginPath()
    ctx.globalAlpha = alpha
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.closePath()
}

// Draw a sprite
function drawSprite(sprite, x, y, w, h, alpha = 1) {
    let img = SpriteSheets[sprite.img].img
    drawImage(img, sprite.x, sprite.y, sprite.width, sprite.height, x, y, w, h, alpha)
}

// Waits
function waitForSeconds(seconds) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, seconds * 1000)
    })
}

Vector = function(x, y) {
    this.x = x
    this.y = y
}

function vectorDistance(va, vb) {
    return Math.sqrt((vb.x - va.x) * (vb.x - va.x) + (vb.y - va.y) * (vb.y - va.y))
}
