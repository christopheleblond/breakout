var BRICK_PALETTE = [Sprites.brick0, Sprites.brick1, Sprites.brick2, Sprites.brick3, Sprites.brick4, Sprites.brick5, Sprites.brick6, Sprites.brick7]

var level1 = [
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    0,0,6,6,6,6,6,6,6,6,6,6,6,0,0,
    0,0,5,5,5,5,5,5,5,5,5,5,5,0,0,
    0,0,4,4,4,4,4,4,4,4,4,4,4,0,0,
    0,0,3,3,3,3,3,3,3,3,3,3,3,0,0,
    0,0,2,2,2,2,2,2,2,2,2,2,2,0,0,
    0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,
]

var currentLevel = level1

var Grid = {
    brickWidth: Screen.WIDTH / GameSettings.COLS,
    brickHeight: (Screen.HEIGHT * 0.40) / GameSettings.ROWS,
    bricks: [],
    createBrick: (id, x, y, c) => {
        return {
            x: x,
            y: y,
            w: Grid.brickWidth,
            h: Grid.brickHeight,
            c: c,
            vx: 0,
            vy: 0,
            s: 0,
            id: id,
            enabled: true,
            score: 100
        }
    },
    init: () => {
        Grid.bricks = []
        for(let i = 0; i < GameSettings.ROWS; i++) {
            for(let j = 0; j < GameSettings.COLS; j++) {
                let brickId = j * GameSettings.COLS + i
                if(currentLevel[brickId]) {
                    Grid.bricks.push(Grid.createBrick(brickId, i * (Grid.brickWidth + GameSettings.GAP),
                    j * (Grid.brickHeight + GameSettings.GAP),
                    BRICK_PALETTE[currentLevel[brickId] - 1]))                    
                }
            }
        }
    },
    destroyBrick: (brick) => {                
        brick.enabled = false
    },
    update: () => {
        let no = 0
        //Grid.brickWidth = Screen.WIDTH / GameSettings.COLS
        //Grid.brickHeight = (Screen.HEIGHT * 0.40) / GameSettings.ROWS        
    },
    draw: () => {
        Grid.bricks.filter(b => b.enabled).forEach(b => {
            //drawRect(b)
            drawSprite(b.c, b.x, b.y, b.w, b.h)
            //printText(b.id + '', b.x, b.y + 10, 10, 'white', 'left')
        })
    }
}
