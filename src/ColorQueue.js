import RNGUtil from './util/RNGUtil';
import ColorUtil from './util/ColorUtil';

export default class ColorQueue {
    constructor() {
        this.colors = [
            [110, 125, 206, 1], // #6E7DCE
            [242, 126, 119, 1], // #F27E77
            [132, 224, 160, 1], // #84E0A0
            [242, 231, 150, 1]  // #F2E796
        ];
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
        return this.queue.shift();
    }
}