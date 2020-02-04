export default class ColorShape extends createjs.Shape {
    constructor(color, vertices, neighbors) {
        super();
        this.neighbors = neighbors;
        this.vertices = vertices;
        this.color = color;
        this.drawSelf(color);
    }

    // Check to see if any neighbor coordinates fit within the given shape
    isNeighbor(shape) {
        for(const neighbor of this.neighbors) {
            if (shape.hitTest(neighbor[0], neighbor[1])) {
                return true;
            }
        }

        return false;
    }

    // Permanently change the color
    changeColor(color) {
        this.drawSelf(color);
        this.color = color;
    }

    resetColor() {
        this.drawSelf(this.color);
    }

    drawSelf(color) {
        const { graphics, vertices } = this;
        graphics.clear();
        graphics.beginStroke('black');
        graphics.beginFill(color);
        graphics.moveTo(vertices[0][0], vertices[0][1]);
        for (let i = 1; i < vertices.length; i++) {
            const vertex = vertices[i];
            graphics.lineTo(vertex[0], vertex[1]);
        }
        graphics.endFill();
        graphics.closePath();
    }
       
}