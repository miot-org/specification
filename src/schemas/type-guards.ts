import {OrtacLocaleObjectV1_0_0} from './locale-d.js';

export const typeGuards = {
  isLocale: {
    V1_0_0: (json: any): json is OrtacLocaleObjectV1_0_0 => {
      let output = false;
      if (typeof json === 'object' &&
          Object.prototype.hasOwnProperty.call(json, 'fileLayout') &&
          Object.prototype.hasOwnProperty.call(json.fileLayout, 'name') &&
          json.fileLayout.name === 'ortac-locale' &&
          Object.prototype.hasOwnProperty.call(json.fileLayout, 'version') &&
          json.fileLayout.version === '1.0.0') {
        output = true;
      }
      return output;
    },
  },
};
