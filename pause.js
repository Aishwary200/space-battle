class Pause {
    constructor() {
        this.pause = createButton('PAUSE')
        this.back = createButton('BACK')
    }
    hide() {
        this.pause.hide()
        this.back.hide()
    }
    show() {
        this.back.show()
    }
    display() {
        this.pause.position(windowWidth - 200, 20)
        this.back.position(windowWidth / 2, windowHeight / 2)
        this.back.hide()
        this.back.style('borderRadius', '10px');
        this.back.style('width', '150px');
        this.back.style('height', '40px');
        this.back.style('font-size', '20px');
        this.back.style('font-family', 'algerian')
        this.back.style('color', 'white')
        this.back.style('background', 'blue');
        this.pause.scale = 0.5
        this.pause.mousePressed(() => {
            gameState = "pause"
            this.back.show()
        })
        this.back.mousePressed(() => {
            this.back.hide()
            gameState = "play"
        })
    }
}