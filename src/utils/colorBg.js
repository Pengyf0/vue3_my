/*
 * @Author: Pengyf 
 * @Date: 2023-10-12 17:31:41 
 * @Last Modified by:   Pengyf 
 * @Last Modified time: 2023-10-12 17:31:41 
 */

function hexToRgb(hex) {
  let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return rgb ? [
    parseInt(rgb[1], 16),
    parseInt(rgb[2], 16),
    parseInt(rgb[3], 16)
  ] : null;
}

let rgb = hexToRgb('#ccc');
console.log(rgb); // [204, 204, 204]