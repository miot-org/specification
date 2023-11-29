import fs from 'fs';

// eslint-disable-next-line import/no-extraneous-dependencies
import {compile} from 'json-schema-to-typescript';

import {V1_0_0} from '../src/schemas/locale-schema.js';

compile(V1_0_0, 'OrtacLocaleObjectV1_0_0')
  .then((ts) => fs.writeFileSync('src/schemas/locale-d.ts', ts))
  // eslint-disable-next-line no-console
  .catch((err) => console.log('Error building .d.ts:', JSON.stringify(err)));
