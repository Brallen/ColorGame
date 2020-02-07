import { getVoronoiData } from './voronoi';
import RNGUtil from './util/RNGUtil';
import ColorShape from './ColorShape';
import ColorUtil from './util/ColorUtil';
import ColorQueue from './ColorQueue';
import QueueDisplay from './QueueDisplay';

export default class Game {
    constructor(count, width, height) {
        RNGUtil.setRNGBySeed('test');
        this.colorQueue = new ColorQueue();
        this.colorQueue.fillQueue();

        this.stage = new createjs.Stage('board');
        this.stage.enableMouseOver();
        this.generateBoard(count, width, height);

        this.queueContainer = new createjs.Stage('color-queue');
        this.initQueueContainer(205, 360);

        // Player position tracking
        this.currentShape = this.stage.getChildAt(Math.round(RNGUtil.randInRange(0, count - 1)));
        this.currentShape.changeColor(ColorUtil.rgbaToCSSRgba(this.colorQueue.getNextColor()));

        //set the next color to be next in queue
        this.nextColor = this.colorQueue.getNextColor();

        this.stage.addEventListener('click', this.onClick.bind(this));
        this.stage.addEventListener('mouseover', this.onMouseOver.bind(this));
        this.stage.addEventListener('mouseout', this.onMouseOut.bind(this));
    }

    validShape(shape) {
        return (
            (shape.id !== this.currentShape.id) &&
            this.currentShape.isNeighbor(shape));
    }

    // Fired whenever the mouse enters a shape
    onMouseOver({ target }) {
        if (!this.validShape(target)) return;

        const { nextColor } = this;

        target.drawSelf(ColorUtil.rgbaToCSSRgba(nextColor[0], nextColor[1], nextColor[2], 0.5));
        this.render();
    }

    // Fired whenever the mouse exits a shape
    onMouseOut({ target }) {
        if (!this.validShape(target)) return;

        target.resetColor();
        this.render();
    }

    onClick({ target }) {
        if (this.validShape(target)) {
            this.moveEvent(target);
        }
    }

    moveEvent(newShape) {
        newShape.changeColor(ColorUtil.rgbaToCSSRgba(this.nextColor));
        
        this.nextColor = this.colorQueue.getNextColor();
        this.currentShape = newShape;



        this.render();
    }

    generateBoard(count, width, height) {
        this.updateCanvas('board', width, height);
        const data = getVoronoiData(count, width, height);
        data.forEach((item) => {
            this.addShape('white', item.cell, item.neighbors);
        });
    }

    initQueueContainer(width, height) {
        this.updateCanvas('color-queue', width, height);
    }

    updateCanvas(stage, width, height) {
        const canvas = document.getElementById(stage);
        canvas.width = width;
        canvas.height = height;
    }

    addShape(color, vertices, neighbors) {
        const shape = new ColorShape(color, vertices, neighbors);
        this.stage.addChild(shape);
    }

    render() {
        this.stage.update();
        this.queueContainer.update();
    }
}