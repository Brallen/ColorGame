import { getVoronoiData } from './voronoi';
import RNGUtil from './RNGUtil';
import ColorShape from './ColorShape';

export default class Game {
    constructor(count, width, height) {
        this.stage = new createjs.Stage("board");
        RNGUtil.setRNGBySeed('test');
        this.initBoard(count, width, height);
    }

    initBoard(count, width, height) {
        this.updateCanvas(width, height);
        this.board = getVoronoiData(count, width, height);
        this.board.forEach((item) => {
            this.addShape('white', item.cell, item.neighbors);
        });
    }

    updateCanvas(width, height) {
        const canvas = document.getElementById('board');
        canvas.width = width;
        canvas.height = height;
    }

    addShape(color, vertices, neighbors) {
        let shape = new ColorShape(color, vertices, neighbors);
        this.stage.addChild(shape);
    }

    render() {
        this.stage.update();
    }
}