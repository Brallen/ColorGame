import seedrandom from 'seedrandom';

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
}