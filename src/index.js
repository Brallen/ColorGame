import Game from './Game';

function init() {
    var stage = new createjs.Stage("demoCanvas");

    let circle = new createjs.Shape() 
    circle.graphics.beginFill("#43561B").drawCircle(355, 355, 50);
    
    stage.addChild(circle);
    stage.update();
  }

var game = new Game(25, 1000, 1000);

game.render();