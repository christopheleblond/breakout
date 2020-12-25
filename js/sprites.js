// sprites.js
// Sprites management

// Sprites sheets (containing multiple sprites)
var SpriteSheets = {
    sprites: {
        url: 'assets/images/sprites.png'
    },
    background: {
        url: 'assets/images/background.jpg'
    }
}

// Declares game sprites 
// img: sprite sheet
// x, y: position of top/left pixel
// width,height: dimensions 
var Sprites = {
    background: {
        img: 'background',
        x: 0,
        y: 0,
        width: 612,
        height: 408
    },
    brick0: {
        img: 'sprites',
        x: 20,
        y: 17,
        width: 170,
        height: 51
    },
    brick1: {
        img: 'sprites',
        x: 20,
        y: 91,
        width: 170,
        height: 51
    },
    brick2: {
        img: 'sprites',
        x: 20,
        y: 168,
        width: 170,
        height: 51
    },
    brick3: {
        img: 'sprites',
        x: 20,
        y: 243,
        width: 170,
        height: 51
    },
    brick4: {
        img: 'sprites',
        x: 20,
        y: 320,
        width: 170,
        height: 51
    },
    brick5: {
        img: 'sprites',
        x: 20,
        y: 395,
        width: 170,
        height: 51
    },
    brick6: {
        img: 'sprites',
        x: 20,
        y: 470,
        width: 170,
        height: 51
    },
    brick7: {
        img: 'sprites',
        x: 20,
        y: 545,
        width: 170,
        height: 51
    },
    ball: {
        img: 'sprites',
        x: 204,
        y: 104,
        width: 74,
        height: 74
    },
    life: {
        img: 'sprites',
        x: 203,
        y: 18,
        width: 74,
        height: 74
    },
    paddleLeft: {
        img: 'sprites',
        x: 212,
        y: 259,
        width: 48,
        height: 24
    },
    paddleRight: {
        img: 'sprites',
        x: 219,
        y: 353,
        width: 52,
        height: 24
    },
    paddleMiddle: {
        img: 'sprites',
        x: 226,
        y: 303,
        width: 24,
        height: 24
    },
    paddle: {
        img: 'sprites',
        x: 0,
        y: 0,
        width: 128,
        height: 24
    },
    flocon: {
        img: 'sprites',
        x: 219, 
        y: 192,
        width: 42,
        height: 42
    }
}

// Declares the animated sprites
// img: sprite sheet
// sprites: position and dimensions of all sprites animation
var AnimatedSprites = {
    /*bonus: {
        img: 'bonus',
        sprites: [
            { x: 1, y: 1, w: 154, h: 42 },
            { x: 155, y: 1, w: 154, h: 42 },
            { x: 1, y: 43, w: 154, h: 42 },
            { x: 155, y: 43, w: 154, h: 42 },
            { x: 1, y: 85, w: 154, h: 42 },
            { x: 155, y: 85, w: 154, h: 42 }
        ]
    }*/
}

// Load all sprite sheet asynchronously
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
            console.log('Loaded: ', SpriteSheets[images[i].id]['img'].src, SpriteSheets)
        }        
    })
}

// Load all game assets
function loadAssets() {
    return loadImages()
}