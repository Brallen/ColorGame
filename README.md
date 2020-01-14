# Color Game

## Framework

We will be using CreateJS as a framework to develop ColorGame. This is a suite of JavaScript libraries which allow us to draw, animate, play audio, and manage asset loading. Primarily we will use EaselJS to handle the drawing of graphics on the screen,
but may use other libraries in the CreateJS suite as needed/desired

https://www.createjs.com/

## Webhosting & CI/CD pipeline

The site will be hosted on github pages at https://Brallen.github.io/ColorGame. For our web application bundler, we are using Parcel. This is a zero configuration asset bundler that will allow us to use ES6+ features throughout development. It also provides us with a local development server that hot reloads on every file change. The development server can be launched locally by running `npm start` and viewed at `localhost:1234`. Continuous Integration/Deployment will be implemented through TravisCI which is easily able to support deployment to github pages.

https://parceljs.org/

https://travis-ci.com/

## Design
Design can be found over in the [wiki.](https://github.com/Brallen/ColorGame/wiki/Design)

## How The Game is Played

### Setup
The game board consists of a 2d square board which is cut up into tetris shaped pieces. Every piece starts as white and one piece is randomly selected for the player to start on.
Next to the game board is the color queue. The queue shows the player the next 3 colors that will be played over the player's next 3 turns.

### Playing The Game
The player starts each turn by selecting an adjacent tile to move to. Upon landing on the tile it will change color to the color at the top of the color queue. It will then check if it is part of a "set" of pieces. A set is 3 or more pieces of the same color.
Should the player's move complete a set of tiles, this will turn all tiles in the set black and combine the tiles into one black super tile. Once a player leaves a black tile, they may not return to it. The game is over when all tiles have been turned black.

### Points
Giving their player feedback on how well they are doing is difficult due to the following observations:

- For any single board configuration it is difficult/impossible to determine the lowest amount of moves it can be solved in
- Randomness factors such as colors in the queue and player starting position change the difficulty every play through.
- One Game configuration can only be meaningfully compared to itself

The following are possible metrics to compare performance for a given configuration:

- Time elapsed since the start of play (incentivizes quick thinking over deliberate strategy. Attractive to exeperienced players looking for a challenge, intimidating to new/casual players)
- How many moves were used to win (incentivizes slow deliberate play. Similar scoring system to golf, every move is one less move the player wants to make)
- How many piece sets were completed (fun for experienced players looking for a challenge to use more than 3 pieces per set to minimize total sets completed)

Due to the nature of the game as a strategic mind game in similar veins to sudoku or chess, it may be adviseable to remove randomness factors. Rather, while randomness factors are used to generate a level, once generated a configuration is named and replayable, including the entire color queue, the starting position, and the actual pieces on the board. An AI program could learn to play the game, and using the above metrics rate the difficulty of a level and set per metrics level that a player can compare their own performance against. This has benefits to intellectual players as they can analyze a board, some may even want to build tools that help them solve it easier. This also increases the social value of the game, as players can compare their score to other players for the same "map", an impossible feature while randomness persists.

## Generating the "grid"

### Voronoi Diagram
Given a random set of points in a plane; A Voronoi Diagram is a partition of a plane into regions (cells) which are defined by the closest point to them.

 - Wikipedia: [https://en.wikipedia.org/wiki/Voronoi_diagram](https://en.wikipedia.org/wiki/Voronoi_diagram)
 - Interactive Example: [http://alexbeutel.com/webgl/voronoi.html](http://alexbeutel.com/webgl/voronoi.html)

### The d3-delaunay Library
We will use the [d3-delaunay](https://github.com/d3/d3-delaunay) library to store and perform computations on the set of data points used to define our Voronoi diagram. Some useful actions available to us through this library include:
 
 - Rendering a Voronoi diagram to a provided context
 - Random generation of Voronoi diagram data
 - Cell computation and boundary definitions
 - Locate which cell a point is within
 - Find all adjacent cells (Using [this solution](https://observablehq.com/@fil/unconnected-delaunay-neighbors) for artificially bounded Voronoi Diagrams)

Since the data is represented in Euclidean space and related data structures, we can render in the Voronoi diagram whilst using the d3 library capabilities to implement interactivity with the diagram.

By randomly computing a set of points and generating a Voronoi diagram from them, we are able to create an immense variety of unique playing fields for our players to explore and solve.
