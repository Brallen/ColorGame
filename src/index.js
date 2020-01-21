var game = new Game();
game.addShape("DeepSkyBlue", [
  [0, 0],
  [100, 100],
  [100, 0],
  [0, 0],
], null);

game.addShape("Green", [
  [0, 0],
  [0, 100],
  [100, 100],
  [0, 0]
], null);

game.render();

// window.onload = game.render();