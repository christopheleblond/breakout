var BRICK_PALETTE = ['black', 'red', 'green', 'yellow', 'blue', 'purple', 'orange', 'gray']


var level1 = [
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
    0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
    0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,
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
            enabled: true
        }
    },
    init: () => {
        for(let i = 0; i < GameSettings.ROWS; i++) {
            for(let j = 0; j < GameSettings.COLS; j++) {
                let brickId = j * GameSettings.COLS + i
                if(currentLevel[brickId]) {
                    Grid.bricks.push(Grid.createBrick(brickId, i * (Grid.brickWidth + GameSettings.GAP),
                    j * (Grid.brickHeight + GameSettings.GAP),
                    BRICK_PALETTE[currentLevel[brickId]]))
                }                
            }
        }
    },
    destroyBrick: (brick) => {
        var index = Grid.bricks.findIndex(b => b.id === brick.id)
        //Grid.bricks.splice(index, 1)
        brick.enabled = false
    },
    draw: () => {
        Grid.bricks.filter(b => b.enabled).forEach(b => {
            drawRect(b)
            //printText(b.id + '', b.x, b.y + 10, 10, 'white', 'left')
        })
    }
}
