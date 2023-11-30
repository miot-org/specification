import * as ortacLocaleTypes from './locale-d.js';

export const typeGuards = {
  isLocale: {

    /**
     * TS type guard function for LocaleObjectV1_0_0
     * @param json - json to be checked
     * @returns boolean
     *
     * @example
     * ```ts
     * import * as ortac from '@ortac/specification';
     *
     * const someJson: any = {random: 'value'};
     * if (ortac.typeGuards.isLocale.V1_0_0(someJson)) {
     *   // work with known json in locale format
     * }
     * ```
     */
    V1_0_0: (json: any): json is ortacLocaleTypes.V1_0_0 => {
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
