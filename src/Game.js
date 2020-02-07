import { getVoronoiData } from './voronoi';
import RNGUtil from './util/RNGUtil';
import ColorShape from './ColorShape';
import ColorUtil from './util/ColorUtil';
import ColorQueue from './ColorQueue';

const SELECT_THICKNESS = 6;
const CURRENT_THICKNESS = 8;

export default class Game {
    constructor(count, width, height) {
        RNGUtil.setRNGBySeed('test');

        this.stage = new createjs.Stage('board');
        this.stage.enableMouseOver();
        this.generateBoard(count, width, height);

        // Player position tracking
        this.currentShape = this.stage.getChildAt(Math.round(RNGUtil.randInRange(0, count - 1)));
        this.currentShape.changeStrokeThickness(CURRENT_THICKNESS);
        this.currentShape.changeColor(RNGUtil.randCSSColor(1.0));
        this.currentShape.drawSelf();

        // Temporary random color stored as [r, g, b, a]
        // TODO: Replace assignment with color queue pop
        this.nextColor = RNGUtil.randColor(1.0);

        this.stage.addEventListener('click', this.onClick.bind(this));
        this.stage.addEventListener('mouseover', this.onMouseOver.bind(this));
        this.stage.addEventListener('mouseout', this.onMouseOut.bind(this));

        this.colorQueue = new createjs.Stage('color-queue');
        this.initColorQueue(205, 360);
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

        target.changeStrokeThickness(SELECT_THICKNESS);
        target.drawSelf(ColorUtil.rgbaToCSSRgba(nextColor[0], nextColor[1], nextColor[2], 0.5));
        this.render();
    }

    // Fired whenever the mouse exits a shape
    onMouseOut({ target }) {
        if (!this.validShape(target)) return;

        target.changeStrokeThickness()
        target.drawSelf();
        this.render();
    }

    onClick({ target }) {
        if (this.validShape(target)) {
            this.moveEvent(target);
        }
    }

    moveEvent(newShape) {
        newShape.changeStrokeThickness(CURRENT_THICKNESS);
        newShape.changeColor(ColorUtil.rgbaToCSSRgba(this.nextColor))
        newShape.drawSelf();

        this.currentShape.changeStrokeThickness();
        this.currentShape.drawSelf();
        
        this.nextColor = RNGUtil.randColor(1.0);
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

    initColorQueue(width, height) {
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
    }
}