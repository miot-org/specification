import {V1_0_0} from './schemas/locale-schema.js';
import {OrtacLocaleObjectV1_0_0} from './schemas/locale-d.js';
import {typeGuards} from './schemas/type-guards.js';
import {add} from './add.js';
import {subtract} from './subtract.js';

const schemas = {locale: {V1_0_0}};

export {
  OrtacLocaleObjectV1_0_0,
  typeGuards,
  schemas,
  add,
  subtract,
};
