import { getVoronoiData } from './voronoi';
import RNGUtil from './RNGUtil';
import ColorShape from './ColorShape';
import ColorQueue from './ColorQueue';

export default class Game {
    constructor(count, width, height) {
        this.stage = new createjs.Stage('board');
        this.colorQueue = new createjs.Stage('color-queue');
        RNGUtil.setRNGBySeed('test');
        this.initBoard(count, width, height);
        this.initColorQueue(205, 360);
    }

    initBoard(count, width, height) {
        this.updateCanvas('board', width, height);
        this.board = getVoronoiData(count, width, height);
        this.board.forEach((item) => {
            this.addShape('white', item.cell, item.neighbors);
        });
    }

    initColorQueue(width, height) {
        this.updateCanvas('color-queue', width, height);
    }

    updateCanvas(stage, width, height) {
        const canvas = document.getElementById(stage);
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