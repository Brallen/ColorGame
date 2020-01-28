// Collection of util functions to help us do color conversions
export default class ColorUtil {
  // Can be "overloaded" with an rgba array at the first argument
  static rgbaToCSSRgba(r, g, b, a = 1.0) {
    if (r.length !== undefined) {
      const rgba = r;
      return `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`;
    }

    return `rgba(${r},${g},${b},${a})`;
  }
  
  static hexToRgb(hex) {
    return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                      ,(m, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1).match(/.{2}/g)
      .map(x => parseInt(x, 16));
  }
  
  static hexToCSSRgba(hex, a = 1.0) {
    const rgb = hexToRgb(hex);
    return rgbaToCSSRgba(rgb[0], rgb[1], rgb[2], a);
  }
}