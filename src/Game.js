    class Game {

    constructor() {
        this.stage = new createjs.Stage("demoCanvas");
        
    }

    addShape(color, vertices) {
        let shape = new createjs.Shape();
        shape.graphics.beginFill(color);
        
        shape.graphics.moveTo(vertices[0][0], vertices[0][1]);
        for (let i = 1; i < vertices.length; i++) {
            let vertice = vertices[i];
            shape.graphics.lineTo(vertice[0], vertice[1]);
        }
        shape.graphics.closePath();
        shape.graphics.endFill();
        this.stage.addChild(shape);
    }

    render() {
        this.stage.update();
    }
}