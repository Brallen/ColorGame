var game = new Game();
game.addShape("DeepSkyBlue", [
  [0, 0],
  [100, 100],
  [100, 0],
  [0, 0],
]);

game.addShape("Green", [
  [0, 0],
  [0, 100],
  [100, 100],
  [0, 0]
]);

game.render();

// window.onload = game.render();