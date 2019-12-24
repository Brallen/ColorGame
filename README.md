# Color Game

## Framework

We will be using CreateJS as a framework to develop ColorGame. This is a suite of JavaScript libraries which allow us to draw, animate, play audio, and manage asset loading. Primarily we will use EaselJS to handle the drawing of graphics on the screen,
but may use other libraries in the CreateJS suite as needed/desired

https://www.createjs.com/

## Webhosting & CI/CD pipeline

The site will be hosted on github pages at `https://Brallen.github.io/ColorGame`. For our web application bundler, we are using Parcel. This is a zero configuration asset bundler that will allow us to use ES6+ features throughout development. It also provides us with a local development server that hot reloads on every file change. The development server can be launched locally by running `npm start` and viewed at `localhost:1234`. Continuous Integration/Deployment will be implemented through TravisCI which is easily able to support deployment to github pages.

## Design
![alt text](./images/Design.png "Design")
![alt text](./images/Colors.png "Colors")
