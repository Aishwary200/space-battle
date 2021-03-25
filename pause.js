class Pause {
    constructor() {
        var pauseImage = loadImage("images/blast1.png")
        this.pause = createButton(pauseImage)
    }
    hide() {
        this.pause.hide()
    }
    display() {
        this.pause.position(1000, 20)
        this.pause.scale = 0.5
        this.pause.mousePressed(() => {
            gameState = "pause"
        })
    }
}