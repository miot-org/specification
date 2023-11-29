import {V1_0_0} from './schemas/locale-schema.js';
import {OrtacLocaleObjectV1_0_0} from './schemas/locale.d.js';
import {isOrtacLocale} from './schemas/type-guards.js';
import {add} from './add.js';
import {subtract} from './subtract.js';

const jsonSchemas = {locale: {V1_0_0}};

export {
  OrtacLocaleObjectV1_0_0,
  isOrtacLocale,
  jsonSchemas,
  add,
  subtract,
};
