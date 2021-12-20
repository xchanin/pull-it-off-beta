// https://css-tricks.com/converting-color-spaces-in-javascript/

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorConverterService {

  constructor() { }

  /**
   * Convert RGBA to HEX
   *
   * @param rgba RGBA value to convert
   */
  public RGBAToHexA(rgba: any): string {

    let r = (+rgba[0]).toString(16);
    let g = (+rgba[1]).toString(16);
    let b = (+rgba[2]).toString(16);
    let a = Math.round(+rgba[3] * 255).toString(16);

    if (r.length === 1) {
      r = '0' + r;
    }

    if (g.length === 1) {
      g = '0' + g;
    }

    if (b.length === 1) {
      b = '0' + b;
    }

    if (a.length === 1) {
      a = '0' + a;
    }


    return '#' + r + g + b + a;
  }
}
