var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth - 30
canvas.height = window.innerHeight - 30

var Screen = {
    WIDTH: canvas.width,
    HEIGHT: canvas.height,
    clear: () => ctx.clearRect(0, 0, Screen.WIDTH, Screen.HEIGHT),
    resize: (event) => {
        canvas.width = window.innerWidth - 30
        canvas.height = window.innerHeight - 30
        Screen.WIDTH = canvas.width
        Screen.HEIGHT = canvas.height
    }
}

var GameSettings = {
    speed: 10,
    COLS: 15,
    ROWS: 15,
    GAP: 0,
    LIFES: 2
}

var Random = {
    nextInt: (a) => Math.random() * a,
    nextColor: () => "rgb(" + Math.random() * 256 +"," + Math.random() * 256 + "," + Math.random() * 256+ ")"
}
var FrameCount = 0

var Input = {
    keypressed: false,
    keydown: false,
    key: null,
    keys: [],
    onKeyDown: (e) => {
        Input.keypressed = true
        if (Input.keys.indexOf(e.code) < 0) Input.keys.push(e.code) 
    },
    onKeyUp: (e) => {
        Input.keypressed = false,
        Input.keys.splice(Input.keys.indexOf(e.code), 1)
    },
    isKeyPressed: (key) => Input.keys.includes(key)
}

function loadImage(src, loadedCallback) {
    let img = new Image()
    img.src = src
    img.onload = loadedCallback
    return img
}

document.addEventListener("keydown", Input.onKeyDown, false)
document.addEventListener("keyup", Input.onKeyUp, false)
window.addEventListener("resize", Screen.resize)

function drawLine(p1, p2, color) {
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.closePath()
}
function drawRect(r) {
    ctx.beginPath();
    ctx.rect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = r.c;
    ctx.fill();
    ctx.closePath();
}

function printText(text, x, y, size, color, align = 'center') {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.font = size + 'px Aldo'
    ctx.textAlign = align
    ctx.fillText(text, x, y)
    ctx.closePath()
}

function drawCircle(x, y, size, color) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI*2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh) {
    ctx.beginPath()
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.closePath()
}

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
