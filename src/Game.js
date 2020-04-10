import { getVoronoiData } from './voronoi';
import RNGUtil from './util/RNGUtil';
import ColorShape from './ColorShape';
import ColorUtil from './util/ColorUtil';
import ColorQueue from './ColorQueue';
import MergingUtil from './util/MergingUtil';
import QueueDisplay from './QueueDisplay';

const SELECT_THICKNESS = 6;
const CURRENT_SHAPE_THICKNESS = 8;

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
        this.currentShape.setStrokeThickness(CURRENT_SHAPE_THICKNESS);
        this.currentShape.setColor(ColorUtil.rgbaToCSSRgba(this.colorQueue.getNextColor()));
        this.currentShape.drawSelf();

        //set the next color to be next in queue
        this.nextColor = this.colorQueue.getNextColor();
        this.updateQueueContainer();

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

        target.setStrokeThickness(SELECT_THICKNESS);
        target.drawSelf(ColorUtil.rgbaToCSSRgba(nextColor[0], nextColor[1], nextColor[2], 0.5));
        this.render();
    }

    // Fired whenever the mouse exits a shape
    onMouseOut({ target }) {
        if (!this.validShape(target)) return;

        target.setStrokeThickness()
        target.drawSelf();
        this.render();
    }

    onClick({ target }) {
        if (this.validShape(target)) {
            this.moveEvent(target);
        }
    }

    getMatches(shape) {
        const matchedShapes = new Map();
        this.findMatches(shape, shape.color, matchedShapes);

        return matchedShapes;
    }

    findMatches(shape, color, matches) {
        // If current shape does not match color or is a visited shape, exit
        if (shape.color !== color || matches.get(shape.id) !== undefined ) { return; }

        matches.set(shape.id, shape);
        // Check shape's neighbors
        shape.neighbors.forEach((neighbor) => {
            const adjacentShape = this.stage.getObjectUnderPoint(neighbor[0], neighbor[1]);
            if (adjacentShape !== undefined) {
                this.findMatches(adjacentShape, color, matches);
            }
        })
    }

    fillMatches(matches) {
        const shapes = [...matches.values()]
        let mergedShape = null;
        if (shapes.length >= 3) {
            mergedShape = shapes[0];
            for(let i = 1; i < shapes.length; i++) {
                mergedShape = MergingUtil.mergeShapes(mergedShape, shapes[i]);
                this.stage.removeChild(shapes[i]);
            }
            this.stage.removeChild(shapes[0]);
           
        }
        return mergedShape;
    }

    moveEvent(newShape) {

        newShape.setColor(ColorUtil.rgbaToCSSRgba(this.nextColor));

        newShape.setStrokeThickness(CURRENT_SHAPE_THICKNESS);
        newShape.setColor(ColorUtil.rgbaToCSSRgba(this.nextColor));
        newShape.drawSelf();
        
        this.currentShape.setStrokeThickness();
        this.currentShape.drawSelf();
        
        let mergedShape = this.fillMatches(this.getMatches(newShape));
        if (mergedShape !== null) {
            this.stage.addChild(mergedShape);
            this.currentShape = mergedShape;
        } else {
            this.currentShape = newShape;
        }


        this.nextColor = this.colorQueue.getNextColor();
        
        this.updateQueueContainer();

        this.render();
        console.log(this.stage.numChildren);
        console.log(this.stage.getObjectUnderPoint(1, 499));

    }

    generateBoard(count, width, height) {
        this.updateCanvas('board', width, height);
        const data = getVoronoiData(count, width, height);
        data.forEach((item) => {
            this.addShape('white', item.cell, item.neighbors, item.seed);
        });
    }

    initQueueContainer(width, height) {
        this.updateCanvas('color-queue', width, height);
        const text = new createjs.Text("Next", "32px Roboto", "#000000");
        text.x = 70;
        text.y = 15;
        this.queueContainer.addChild(text);
    }

    updateQueueContainer() {
        this.queueContainer.removeAllChildren();
        const colors = this.colorQueue.getQueue();
        const first = QueueDisplay.createSquare(ColorUtil.rgbaToCSSRgba(this.nextColor), 60, 60);
        const second = QueueDisplay.createSquare(ColorUtil.rgbaToCSSRgba(colors[0]), 60, 160);
        const third = QueueDisplay.createSquare(ColorUtil.rgbaToCSSRgba(colors[1]), 60, 260);
        this.queueContainer.addChild(first, second, third);
    }

    updateCanvas(stage, width, height) {
        const canvas = document.getElementById(stage);
        canvas.width = width;
        canvas.height = height;
    }

    addShape(color, vertices, neighbors, seed) {
        const shape = new ColorShape(color, vertices, neighbors, seed);
        this.stage.addChild(shape);
    }

    render() {
        this.stage.update();
        this.queueContainer.update();
    }
}