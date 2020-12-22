var SpriteSheets = {
    total: {
        url: 'assets/sprites.png'
    },
    simple: {
        url: 'assets/simple.png'
    },
    paddle: {
        url: 'assets/paddle.png'
    },
    background: {
        url: 'assets/background.jpg'
    }
}

var Sprites = {
    background: {
        img: 'background',
        x: 0,
        y: 0,
        width: 612,
        height: 408
    },
    brick0: {
        img: 'total',
        x: 20,
        y: 17,
        width: 170,
        height: 51
    },
    brick1: {
        img: 'total',
        x: 20,
        y: 91,
        width: 170,
        height: 51
    },
    brick2: {
        img: 'total',
        x: 20,
        y: 168,
        width: 170,
        height: 51
    },
    brick3: {
        img: 'total',
        x: 20,
        y: 243,
        width: 170,
        height: 51
    },
    brick4: {
        img: 'total',
        x: 20,
        y: 320,
        width: 170,
        height: 51
    },
    brick5: {
        img: 'total',
        x: 20,
        y: 395,
        width: 170,
        height: 51
    },
    brick6: {
        img: 'total',
        x: 20,
        y: 470,
        width: 170,
        height: 51
    },
    brick7: {
        img: 'total',
        x: 20,
        y: 545,
        width: 170,
        height: 51
    },
    ball: {
        img: 'total',
        x: 806,
        y: 548,
        width: 74,
        height: 74
    },
    life: {
        img: 'total',
        x: 806,
        y: 463,
        width: 74,
        height: 74
    },
    paddleLeft: {
        img: 'paddle',
        x: 0,
        y: 0,
        width: 48,
        height: 24
    },
    paddleRight: {
        img: 'paddle',
        x: 80,
        y: 0,
        width: 48,
        height: 24
    },
    paddleMiddle: {
        img: 'paddle',
        x: 48,
        y: 0,
        width: 28,
        height: 24
    },
    paddle: {
        img: 'paddle',
        x: 0,
        y: 0,
        width: 128,
        height: 24
    },
    simple: {
        img: 'simple',
        x: 0,
        y: 0,
        width: 200,
        height: 200
    }
}

function loadImages() {
    let sheets =  Object.keys(SpriteSheets)
    return Promise.all(sheets.map(sheet => new Promise(resolve => {
        let i = new Image()
        i.id = sheet
        i.src = SpriteSheets[sheet].url        
        i.onload = () => resolve(i)
    }))).then(images => {
        for(let i = 0; i < images.length; i++) {
            SpriteSheets[images[i].id]['img'] = images[i]
            console.log('Loaded: ', SpriteSheets[images[i].id]['img'].src)
        }        
    })
}

function loadAssets() {
    return loadImages()
}


function drawSprite(sprite, x, y, w, h) {
    let img = SpriteSheets[sprite.img].img
    drawImage(img, sprite.x, sprite.y, sprite.width, sprite.height, x, y, w, h)
}