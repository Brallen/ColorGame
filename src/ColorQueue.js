import RNGUtil from './util/RNGUtil';
import ColorUtil from './util/ColorUtil';

export default class ColorQueue {
    constructor() {
        this.colors = ['#6E7DCE', '#F27E77', '#84E0A0', '#F2E796'];
        this.queue = [];
    }

    fillQueue() {
        for(let i = 0; i < 3; i++) {
            this.addColorToQueue();
        }
    }

    addColorToQueue() {
        this.queue.push(this.colors[Math.floor(RNGUtil.randInRange(0,4))]);
    }

    getQueue() {
        return this.queue;
    }

    getNextColor() {
        this.addColorToQueue();
        return ColorUtil.hexToRgba(this.queue.shift());
    }
}