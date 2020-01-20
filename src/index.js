function init() {
    var stage = new createjs.Stage("demoCanvas");

    let circle = new createjs.Shape() 
    circle.graphics.beginFill("#43561B").drawCircle(355, 355, 50);
    
    stage.addChild(circle);
    stage.update();
  }

window.onload = init;