class UserInterface {
    constructor() {
        this.start = createButton('START')
        this.setting = createButton('SETTINGS')
        this.title = createElement('h2');
    }
    hide() {
        this.start.hide()
        this.setting.hide()
        this.title.hide()
    }
    display() {
        this.title.html("SPACE BATTLE");
        this.title.position(300, 10);
        this.title.style('font-size', '70px');
        this.title.style('color', 'skyblue');
        this.title.style('font-family', 'Tarrget')
        
        this.start.position(600, 300)
        this.start.style('borderRadius', '10px')
        this.start.style('width', '150px');
        this.start.style('height', '40px');
        this.start.style('size', '50')
        this.start.style('color', 'white')
        this.start.style('background', 'blue');

        this.setting.position(600, 400)
        this.setting.style('borderRadius', '10px')
        this.setting.style('width', '150px');
        this.setting.style('height', '40px');
        this.setting.style('size', '50')
        this.setting.style('color', 'white')
        this.setting.style('background', 'blue');

        this.start.mousePressed(() => {
            this.title.hide()
            this.setting.hide()
            this.start.hide()
            gameState = "play"
        })
    }
}