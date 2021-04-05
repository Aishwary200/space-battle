class UserInterface {
    constructor() {
        this.start = createButton('START')
        this.control = createButton('HOW TO PLAY')
        this.title = createElement('h2');
        this.controlText = createElement('h2');
        this.back = createButton('BACK')
    }
    hide() {
        this.start.hide()
        this.control.hide()
        this.title.hide()
        this.controlText.hide()
        this.back.hide()
    }
    show() {
        this.start.show()
        this.control.show()
    }
    display() {
        this.title.html("SPACE BATTLE");
        this.title.position(windowWidth / 2 - 400, 10);
        this.title.style('font-size', '70px');
        this.title.style('color', 'skyblue');
        this.title.style('font-family', 'Tarrget')

        this.start.position(windowWidth / 2 - 100, 300)
        this.start.style('borderRadius', '10px')
        this.start.style('width', '150px');
        this.start.style('height', '40px');
        this.start.style('font-size', '20px');
        this.start.style('font-family', 'algerian')
        this.start.style('color', 'white');
        this.start.style('background', 'blue');

        this.control.position(windowWidth / 2 - 100, 400);
        this.control.style('borderRadius', '10px');
        this.control.style('width', '150px');
        this.control.style('height', '40px');
        this.control.style('font-size', '20px');
        this.control.style('font-family', 'algerian')
        this.control.style('color', 'white')
        this.control.style('background', 'blue');

        this.start.mousePressed(() => {
            this.title.hide()
            this.control.hide()
            this.start.hide()
            gameState = "play"
        })
        this.control.mousePressed(() => {
            this.start.hide()
            this.control.hide()
            this.controlText.html("Press space to fire , use WSAD for movement Good Luck!")
            this.controlText.position(windowWidth / 2 - 400, 200)
            this.controlText.style('font-size', '50px')
            this.controlText.style('color', 'blue');
            this.controlText.style('font-family', 'ALGERIAN')
            this.back.position(windowWidth / 2, 400)
            this.back.style('borderRadius', '10px');
            this.back.style('width', '150px');
            this.back.style('height', '40px');
            this.back.style('font-size', '20px');
            this.back.style('font-family', 'algerian')
            this.back.style('color', 'white')
            this.back.style('background', 'blue');
        })
        this.back.mousePressed(() => {
            this.controlText.hide()
            this.back.hide()
            this.start.show()
            this.control.show()
        })
    }
}