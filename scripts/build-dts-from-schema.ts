import fs from 'fs';

import {compile} from 'json-schema-to-typescript';

import {locale} from '../src/schemas/locale-schema.js';

compile(locale.V1_0_0, 'OrtacLocaleObjectV1_0_0')
  .then((ts) => fs.writeFileSync('src/schemas/locale-d.ts', ts))
  // eslint-disable-next-line no-console
  .catch((err) => console.log('Error building .d.ts:', JSON.stringify(err)));
