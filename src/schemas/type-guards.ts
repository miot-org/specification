import {OrtacLocaleObjectV1_0_0} from './locale.d.js';

export function isLocale2(json: any): json is OrtacLocaleObjectV1_0_0 {
  return true;
}

export const isOrtacLocale = {V1_0_0: (json: any): json is OrtacLocaleObjectV1_0_0 => {
  return true;
}};
