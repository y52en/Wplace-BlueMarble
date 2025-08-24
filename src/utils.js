

/** Sanitizes HTML to display as plain-text.
 * This prevents some Cross Site Scripting (XSS).
 * This is handy when you are displaying user-made data, and you *must* use innerHTML.
 * @param {string} text - The text to sanitize
 * @returns {string} HTML escaped string
 * @since 0.44.2
 * @example
 * const paragraph = document.createElement('p');
 * paragraph.innerHTML = escapeHTML('<u>Foobar.</u>');
 * // Output:
 * // (Does not include the paragraph element)
 * // (Output is not HTML formatted)
 * <p>
 *   "<u>Foobar.</u>"
 * </p>
 */
export function escapeHTML(text) {
  const div = document.createElement('div'); // Creates a div
  div.textContent = text; // Puts the text in a PLAIN-TEXT property
  return div.innerHTML; // Returns the HTML property of the div
}

/** Converts the server tile-pixel coordinate system to the displayed tile-pixel coordinate system.
 * @param {string[]} tile - The tile to convert (as an array like ["12", "124"])
 * @param {string[]} pixel - The pixel to convert (as an array like ["12", "124"])
 * @returns {number[]} [tile, pixel]
 * @since 0.42.4
 * @example
 * void(serverTPtoDisplayTP(['12', '123'], ['34', '567'])); // [34, 3567]
 */
export function serverTPtoDisplayTP(tile, pixel) {
  return [((parseInt(tile[0]) % 4) * 1000) + parseInt(pixel[0]), ((parseInt(tile[1]) % 4) * 1000) + parseInt(pixel[1])];
}

/** Negative-Safe Modulo. You can pass negative numbers into this.
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @returns {number} Result
 * @author osuplace
 * @since 0.55.8
 */
export function negativeSafeModulo(a, b) {
  return (a % b + b) % b;
}

/** Bypasses terser's stripping of console function calls.
 * This is so the non-obfuscated code will contain debugging console calls, but the distributed version won't.
 * However, the distributed version needs to call the console somehow, so this wrapper function is how.
 * This is the same as `void()`.
 * @param {...any} args - Arguments to be passed into the `log()` function of the Console
 * @since 0.58.9
 */
export function consoleLog(...args) {((consoleLog) => consoleLog(...args))(void(0));}

/** Bypasses terser's stripping of console function calls.
 * This is so the non-obfuscated code will contain debugging console calls, but the distributed version won't.
 * However, the distributed version needs to call the console somehow, so this wrapper function is how.
 * This is the same as `console.error()`.
 * @param {...any} args - Arguments to be passed into the `error()` function of the Console
 * @since 0.58.13
 */
export function consoleError(...args) {((consoleError) => consoleError(...args))(console.error);}

/** Bypasses terser's stripping of console function calls.
 * This is so the non-obfuscated code will contain debugging console calls, but the distributed version won't.
 * However, the distributed version needs to call the console somehow, so this wrapper function is how.
 * This is the same as `console.warn()`.
 * @param {...any} args - Arguments to be passed into the `warn()` function of the Console
 * @since 0.58.13
 */
export function consoleWarn(...args) {((consoleWarn) => consoleWarn(...args))(console.warn);}

/** Encodes a number into a custom encoded string.
 * @param {number} number - The number to encode
 * @param {string} encoding - The characters to use when encoding
 * @since 0.65.2
 * @returns {string} Encoded string
 * @example
 * const encode = '012abcABC'; // Base 9
 * void(numberToEncoded(0, encode)); // 0
 * void(numberToEncoded(5, encode)); // c
 * void(numberToEncoded(15, encode)); // 1A
 * void(numberToEncoded(12345, encode)); // 1BCaA
 */
export function numberToEncoded(number, encoding) {

  if (number === 0) return encoding[0]; // End quickly if number equals 0. No special calculation needed

  let result = ''; // The encoded string
  const base = encoding.length; // The number of characters used, which determines the base

  // Base conversion algorithm
  while (number > 0) {
    result = encoding[number % base] + result; // Find's the character's encoded value determined by the modulo of the base
    number = Math.floor(number / base); // Divides the number by the base so the next iteration can find the next modulo character
  }

  return result; // The final encoded string
}

/** Converts a Uint8 array to base64 using the browser's built-in binary to ASCII function
 * @param {Uint8Array} uint8 - The Uint8Array to convert
 * @returns {Uint8Array} The base64 encoded Uint8Array
 * @since 0.72.9
 */
export function uint8ToBase64(uint8) {
  let binary = '';
  for (let i = 0; i < uint8.length; i++) {
    binary += String.fromCharCode(uint8[i]);
  }
  return btoa(binary); // Binary to ASCII
}

/** Decodes a base 64 encoded Uint8 array using the browser's built-in ASCII to binary function
 * @param {Uint8Array} base64 - The base 64 encoded Uint8Array to convert
 * @returns {Uint8Array} The decoded Uint8Array
 * @since 0.72.9
 */
export function base64ToUint8(base64) {
  const binary = atob(base64); // ASCII to Binary
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return array;
}

/** Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
export function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [h * 360, s, l];
}

/** Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
export function hslToRgb(h, s, l) {
  let r, g, b;
  h /= 360; // Convert hue to [0, 1] range

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/** Returns the coordinate input fields
 * @returns {Element[]} The 4 coordinate Inputs
 * @since 0.74.0
 */
export function selectAllCoordinateInputs(document) {
  coords = [];

  coords.push(document.querySelector('#bm-input-tx'));
  coords.push(document.querySelector('#bm-input-ty'));
  coords.push(document.querySelector('#bm-input-px'));
  coords.push(document.querySelector('#bm-input-py'));

  return coords;
}

/** The color palette used by wplace.live
 * @since 0.78.0
 * @examples
 * import utils from 'src/utils.js';
 * void(utils[5]?.name); // "White"
 * void(utils[5]?.rgb); // [255, 255, 255]
 */
export const colorpalette = [
  { "id": 0,  "premium": false, "name": "Transparent",   "rgb": [0, 0, 0] },
  { "id": 1,  "premium": false, "name": "Black",         "rgb": [0, 0, 0] },
  { "id": 2,  "premium": false, "name": "Dark Gray",     "rgb": [60, 60, 60] },
  { "id": 3,  "premium": false, "name": "Gray",          "rgb": [120, 120, 120] },
  { "id": 4,  "premium": false, "name": "Light Gray",    "rgb": [210, 210, 210] },
  { "id": 5,  "premium": false, "name": "White",         "rgb": [255, 255, 255] },
  { "id": 6,  "premium": false, "name": "Deep Red",      "rgb": [96, 0, 24] },
  { "id": 7,  "premium": false, "name": "Red",           "rgb": [237, 28, 36] },
  { "id": 8,  "premium": false, "name": "Orange",        "rgb": [255, 127, 39] },
  { "id": 9,  "premium": false, "name": "Gold",          "rgb": [246, 170, 9] },
  { "id": 10, "premium": false, "name": "Yellow",        "rgb": [249, 221, 59] },
  { "id": 11, "premium": false, "name": "Light Yellow",  "rgb": [255, 250, 188] },
  { "id": 12, "premium": false, "name": "Dark Green",    "rgb": [14, 185, 104] },
  { "id": 13, "premium": false, "name": "Green",         "rgb": [19, 230, 123] },
  { "id": 14, "premium": false, "name": "Light Green",   "rgb": [135, 255, 94] },
  { "id": 15, "premium": false, "name": "Dark Teal",     "rgb": [12, 129, 110] },
  { "id": 16, "premium": false, "name": "Teal",          "rgb": [16, 174, 166] },
  { "id": 17, "premium": false, "name": "Light Teal",    "rgb": [19, 225, 190] },
  { "id": 18, "premium": false, "name": "Dark Blue",     "rgb": [40, 80, 158] },
  { "id": 19, "premium": false, "name": "Blue",          "rgb": [64, 147, 228] },
  { "id": 20, "premium": false, "name": "Cyan",          "rgb": [96, 247, 242] },
  { "id": 21, "premium": false, "name": "Indigo",        "rgb": [107, 80, 246] },
  { "id": 22, "premium": false, "name": "Light Indigo",  "rgb": [153, 177, 251] },
  { "id": 23, "premium": false, "name": "Dark Purple",   "rgb": [120, 12, 153] },
  { "id": 24, "premium": false, "name": "Purple",        "rgb": [170, 56, 185] },
  { "id": 25, "premium": false, "name": "Light Purple",  "rgb": [224, 159, 249] },
  { "id": 26, "premium": false, "name": "Dark Pink",     "rgb": [203, 0, 122] },
  { "id": 27, "premium": false, "name": "Pink",          "rgb": [236, 31, 128] },
  { "id": 28, "premium": false, "name": "Light Pink",    "rgb": [243, 141, 169] },
  { "id": 29, "premium": false, "name": "Dark Brown",    "rgb": [104, 70, 52] },
  { "id": 30, "premium": false, "name": "Brown",         "rgb": [149, 104, 42] },
  { "id": 31, "premium": false, "name": "Beige",         "rgb": [248, 178, 119] },
  { "id": 32, "premium": true,  "name": "Medium Gray",   "rgb": [170, 170, 170] },
  { "id": 33, "premium": true,  "name": "Dark Red",      "rgb": [165, 14, 30] },
  { "id": 34, "premium": true,  "name": "Light Red",     "rgb": [250, 128, 114] },
  { "id": 35, "premium": true,  "name": "Dark Orange",   "rgb": [228, 92, 26] },
  { "id": 36, "premium": true,  "name": "Light Tan",     "rgb": [214, 181, 148] },
  { "id": 37, "premium": true,  "name": "Dark Goldenrod","rgb": [156, 132, 49] },
  { "id": 38, "premium": true,  "name": "Goldenrod",     "rgb": [197, 173, 49] },
  { "id": 39, "premium": true,  "name": "Light Goldenrod","rgb": [232, 212, 95] },
  { "id": 40, "premium": true,  "name": "Dark Olive",    "rgb": [74, 107, 58] },
  { "id": 41, "premium": true,  "name": "Olive",         "rgb": [90, 148, 74] },
  { "id": 42, "premium": true,  "name": "Light Olive",   "rgb": [132, 197, 115] },
  { "id": 43, "premium": true,  "name": "Dark Cyan",     "rgb": [15, 121, 159] },
  { "id": 44, "premium": true,  "name": "Light Cyan",    "rgb": [187, 250, 242] },
  { "id": 45, "premium": true,  "name": "Light Blue",    "rgb": [125, 199, 255] },
  { "id": 46, "premium": true,  "name": "Dark Indigo",   "rgb": [77, 49, 184] },
  { "id": 47, "premium": true,  "name": "Dark Slate Blue","rgb": [74, 66, 132] },
  { "id": 48, "premium": true,  "name": "Slate Blue",    "rgb": [122, 113, 196] },
  { "id": 49, "premium": true,  "name": "Light Slate Blue","rgb": [181, 174, 241] },
  { "id": 50, "premium": true,  "name": "Light Brown",   "rgb": [219, 164, 99] },
  { "id": 51, "premium": true,  "name": "Dark Beige",    "rgb": [209, 128, 81] },
  { "id": 52, "premium": true,  "name": "Light Beige",   "rgb": [255, 197, 165] },
  { "id": 53, "premium": true,  "name": "Dark Peach",    "rgb": [155, 82, 73] },
  { "id": 54, "premium": true,  "name": "Peach",         "rgb": [209, 128, 120] },
  { "id": 55, "premium": true,  "name": "Light Peach",   "rgb": [250, 182, 164] },
  { "id": 56, "premium": true,  "name": "Dark Tan",      "rgb": [123, 99, 82] },
  { "id": 57, "premium": true,  "name": "Tan",           "rgb": [156, 132, 107] },
  { "id": 58, "premium": true,  "name": "Dark Slate",    "rgb": [51, 57, 65] },
  { "id": 59, "premium": true,  "name": "Slate",         "rgb": [109, 117, 141] },
  { "id": 60, "premium": true,  "name": "Light Slate",   "rgb": [179, 185, 209] },
  { "id": 61, "premium": true,  "name": "Dark Stone",    "rgb": [109, 100, 63] },
  { "id": 62, "premium": true,  "name": "Stone",         "rgb": [148, 140, 107] },
  { "id": 63, "premium": true,  "name": "Light Stone",   "rgb": [205, 197, 158] }
];
// All entries include fixed id (index-based) and premium flag by design.
