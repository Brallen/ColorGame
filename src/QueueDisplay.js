import ColorUtil from './util/ColorUtil';

export default class QueueDisplay {

    static createSquare(color, x, y) {
        var tile = new createjs.Shape();
        tile.graphics.beginFill(color);
        tile.graphics.drawRect(x, y, 85, 85);
        tile.graphics.endFill();

        return tile;
    }
}