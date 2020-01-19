function init() {
    var stage = new createjs.Stage("demoCanvas");

    let gameContainer = new createjs.Shape() 
    gameContainer.graphics.beginFill("#FFFFFF").drawRect(40, 40, 720, 720);
    
    let nextColorContainer = new createjs.Shape() 
    nextColorContainer.graphics.beginFill("#FFFFFF").drawRect(800, 40, 215, 360);

    let scoreContainer = new createjs.Shape() 
    scoreContainer.graphics.beginFill("#FFFFFF").drawRect(800, 440, 215, 320);
    
    stage.addChild(gameContainer, nextColorContainer, scoreContainer);
    stage.update();
  }

window.onload = init;