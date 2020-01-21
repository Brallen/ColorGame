    class Game {

    constructor() {
        this.stage = new createjs.Stage("demoCanvas");
        
    }

    addShape(color, vertices, neighbors) {
        let shape = new ColorShape(color, vertices, neighbors);
        this.stage.addChild(shape);
    }

    render() {
        this.stage.update();
    }
}