export default class ColorShape extends createjs.Shape {
    constructor(color, vertices, neighbors) {
        super();
        this.neighbors = neighbors;
        this.drawSelf(color, vertices);
    }

    drawSelf(color, vertices) {
        this.graphics.beginStroke('black');
        this.graphics.beginFill(color);
        this.graphics.moveTo(vertices[0][0], vertices[0][1]);
        for (let i = 1; i < vertices.length; i++) {
            let vertice = vertices[i];
            this.graphics.lineTo(vertice[0], vertice[1]);
        }
        this.graphics.closePath();
        this.graphics.endFill();
    }
       
}