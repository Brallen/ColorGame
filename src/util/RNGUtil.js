import seedrandom from 'seedrandom';
import ColorUtil from './ColorUtil';

export default class RNGUtil {
  static getRNG() {
    return this.rng;
  }
  
  static setRNGBySeed(seed) {
    this.rng = seedrandom(seed);
  }
  
  static randInRange(start, end) {
    if (this.rng) {
      return ((end - start) * this.rng()) + start;
    }
  }

  static randColor(a) {
    // If alpha not specified, get random alpha
    const alpha = a || this.rng();

    return [
      RNGUtil.randInRange(0, 255),
      RNGUtil.randInRange(0, 255),
      RNGUtil.randInRange(0, 255),
      alpha];
  }

  static randCSSColor(a) {
    // If alpha not specified, get random alpha
    const alpha = a || this.rng();
    
    return ColorUtil.rgbaToCSSRgba(
      RNGUtil.randInRange(0, 255),
      RNGUtil.randInRange(0, 255),
      RNGUtil.randInRange(0, 255),
      alpha);
  }
}