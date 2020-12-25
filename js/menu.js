Menu = function(title, items, x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.c = 'red'
    this.title = title
    this.items = items
    this.gap = 5
    this.size = 60
    this.keyDown = false

    this.itemSelected = false

    this.isMouseOnItem = () => {
    }

    this.update = (dt) => {
        this.h = this.items.length * (this.gap + this.size) + this.gap

        if(!this.keyDown && Input.isKeyPressed('ArrowDown')) {
            if(this.itemSelected + 1 >= this.items.length) {
                this.itemSelected = 0
            }else{
                this.itemSelected += 1
            }
            this.keyDown = true
        } else  if(!this.keyDown && Input.isKeyPressed('ArrowUp')) {
            if(this.itemSelected - 1 < 0) {
                this.itemSelected = this.items.length - 1
            }else{
                this.itemSelected -= 1
            }
            this.keyDown = true
        } else{
            this.keyDown = Input.isKeyPressed('ArrowUp') || Input.isKeyPressed('ArrowDown')
        }

        if(Input.isKeyPressed('Enter')) {
            this.items[this.itemSelected].action()
            return
        }
    }

    this.draw = () => {
        drawRect({ x: this.x, y: this.y + this.itemSelected * (this.size + this.gap), w: this.w, h: this.size + this.gap, c: 'red'}, 0.5)
        let offsets = { x: this.w / 2, y: this.size }
        this.items.forEach(it => {
            printText(it.label, this.x + offsets.x, this.y + offsets.y, this.size, 'white', 'center')
            offsets.y += this.size + this.gap
        });
    }

    this.itemSelected = 0
}