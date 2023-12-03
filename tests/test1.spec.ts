import fs from 'fs';

import {globSync} from 'glob';
import ajvModule from 'ajv';
import {expect} from 'chai';
import yaml from 'js-yaml';
import jmespath from 'jmespath';

import * as ortac from '../src/index.js';

const Ajv = ajvModule.default;
const ajv = new Ajv();

const resources = yaml.load(fs.readFileSync('./src/json/resources.yaml', {encoding: 'utf-8'}));

// the type guards never error and they provide typing
if (!ortac.typeGuards.isResources.V1_0_0(resources)) {
  // resources doesn't validate against the schema
  // call validate which will throw an error with the explanation
  ortac.validators.ResourcesV1_0_0(resources);
  // can't get here, but throw an error if we do. This also allows resources to be of known type in code below
  throw new Error('resources.yaml fails type guard test');
}
const kinds = resources.kinds;
const quantities = resources.quantities;
const contexts = resources.contexts;
const instances = resources.instances;

// before running tests on yaml, run tests on support functions
describe('Supporting code used in tests', () => {
  it('_contextCompare() function works', () => {
    const tests: [string, string, boolean][] = [
      ['_Motor/<insMotorType>/<insLocation>/_Fuel', '_Motor/+/+/_Something', false],
      ['_Motor/<insMotorType>/<insLocation>/_Fuel', '_Motor/+/+/_Fuel', true],
      ['_Motor/<insMotorType>/<insLocation>/_Fuel', '_Motor/<insMotorType>/+/_Fuel', true],
      ['_Motor/<insMotorType>/<insLocation>/_Fuel', '_Motor/#', true],
      ['_Motor/<insMotorType>/<insLocation>/_Fuel', '_Motor/_insPropulsion/+/_Fuel', true],
      ['_Motor/<insMotorType>/<insLocation>/_Fuel', '_Motor/_insWrong/+/_Fuel', false],
      ['_Motor/<insMotorType>/<insLocation>/_Fuel', '_Motor/_insPropulsion/_insMain/_Fuel', true],
      ['_Motor/<insMotorType>/<insLocation>/_Fuel', '_Motor/_insPropulsion/_wrong/_Fuel', false],
      ['_Motor/<insMotorType>/<insLocation>/_Fuel', '_Motor/<insMotorType>/+', false],
    ];
    tests.forEach((test) => {
      expect(_compareContext(test[0], test[1], resources)).to.equal(test[2], `_compareContext("${test[0]}", "${test[1]}", resources) function not working correctly`);
    });
  });
});

describe('All Schemas are valid', () => {
  const files = globSync('./src/schemas/**/*.schema.json');
  for (const filePath of files) {
    it(`Schema ${filePath} is a valid schema`, () => {
      const data = JSON.parse(fs.readFileSync(filePath).toString());
      expect(ajv.validateSchema(data)).to.equal(true, JSON.stringify(ajv.errors, null, 2));
    });
  }
});

describe('Type Guards work as expected', () => {
  it('Api-Version', () => {
    const apiVersion = JSON.parse(fs.readFileSync('./tests/validJson/api-version.json').toString());
    if (ortac.typeGuards.isAPIVersion.V1_0_0(apiVersion)) {
      expect(ortac.validators.APIVersionV1_0_0(apiVersion)).to.equal(true, 'validation failed');
    }
  });
  it('Api-Quantities', () => {
    const apiQuantities = JSON.parse(fs.readFileSync('./tests/validJson/api-quantities.json').toString());
    if (ortac.typeGuards.isAPIQuantities.V1_0_0(apiQuantities)) {
      expect(ortac.validators.APIQuantitiesV1_0_0(apiQuantities)).to.equal(true, 'validation failed');
    }
  });
  it('Locale', () => {
    const locale = JSON.parse(fs.readFileSync('./tests/validJson/locale.json').toString());
    if (ortac.typeGuards.isLocale.V1_0_0(locale)) {
      expect(ortac.validators.LocaleV1_0_0(locale)).to.equal(true, 'validation failed');
    }
  });
});

describe('resources.json file', () => {
  const schema = JSON.parse(fs.readFileSync('./src/schemas/resourcesV1_0_0.schema.json', {encoding: 'utf-8'}));
  const validate = ajv.compile(schema);
  it('is schema compliant', () => {
    const data = yaml.load(fs.readFileSync('./src/json/resources.yaml').toString());
    expect(validate(data)).to.equal(true, JSON.stringify(validate.errors, null, 2));
  });

  it('passes type guard', () => {
    expect(ortac.typeGuards.isResources.V1_0_0(resources)).to.equal(true, '');
  });

  it('Each `siUnit` exists in `conversion` array without factor, divisor, offset or logFactor', () => {
    Object.keys(kinds).forEach((key) => {
      const siUnit = kinds[key].siUnit;
      const siIndex = kinds[key].conversion.findIndex((conversion) => conversion.unit === siUnit);
      expect(siIndex).to.not.equal(-1, `At '${key}', siUnit '${siUnit}' not found in conversion array`);
      const err = `At '${key}', in conversion for unit '${siUnit}'`;
      // conversion for the isUnit
      const conversion = kinds[key].conversion[siIndex];
      expect(Object.prototype.hasOwnProperty.call(conversion, 'divisor')).to.equal(false, `${err}, 'divisor' is present (not required for the siUnit)`);
      expect(Object.prototype.hasOwnProperty.call(conversion, 'factor')).to.equal(false, `${err}, 'factor' is present (not required for the siUnit)`);
      expect(Object.prototype.hasOwnProperty.call(conversion, 'offset')).to.equal(false, `${err}, 'offset' is present (not required for the siUnit)`);
      expect(Object.prototype.hasOwnProperty.call(conversion, 'logFactor')).to.equal(false, `${err}, 'logFactor' is present (not required for the siUnit)`);
    });
  });

  it('Each Quantity has a `kind` which is present in the kinds list', () => {
    Object.keys(quantities).forEach((key) => {
      const kind = quantities[key].kind;
      expect(Object.prototype.hasOwnProperty.call(kinds, kind)).to.equal(true, `At '${key}', '${kind}' could not be found in Kinds list`);
    });
  });

  it('Each Quantity`s display object has a unit which is a found in the kinds list', () => {
    Object.keys(quantities).forEach((key) => {
      const kind = quantities[key].kind;
      const display = quantities[key].display;
      const unitIndex = kinds[kind].conversion.findIndex((conversion) => conversion.unit === display.unit);
      expect(unitIndex).to.not.equal(-1, `At '${key}' display.unit '${display.unit}' is not a valid unit in the kinds list for '${kind}' conversions.`);
    });
  });

  it('Each Quantity`s display object which has exponent set to log, doesn`t have min or max set to zero', () => {
    Object.keys(quantities).forEach((key) => {
      const display = quantities[key].display;
      if (Object.prototype.hasOwnProperty.call(display, 'exponent') && display.exponent === 'log') {
        expect(display.min).to.not.equal(0, `At '${key}' in 'display', 'min' is set to zero with 'log' 'exponent'.`);
        expect(display.max).to.not.equal(0, `At '${key}' in 'display', 'max' is set to zero with 'log' 'exponent'.`);
      }
    });
  });

  it('In Contexts, each use of `<ins...>` must be in the instances list', () => {
    Object.keys(contexts).forEach((topic) => {
      const arrTopic = topic.split('/');
      arrTopic.forEach((subTopic) => {
        if (/<ins[a-zA-Z0-9_]*>/.test(subTopic)) {
          expect(Object.prototype.hasOwnProperty.call(instances, subTopic)).to.equal(true, `In \`${topic}\`, \`${subTopic} is not in the list of instances`);
        }
      });
    });
  });

  it('In Contexts, each quantity must be in the quantities list', () => {
    Object.keys(contexts).forEach((topic) => {
      Object.keys(contexts[topic]).forEach((qty) => {
        expect(Object.prototype.hasOwnProperty.call(quantities, qty)).to.equal(true, `In \`${topic}\`, \`${qty} is not in the list of quantities`);
      });
    });
  });
});

describe('Locale Files', () => {
  const files = globSync(['./src/json/manufacturers/**/*.yaml', './src/json/languages/**/*.yaml']);

  // schema compliance
  files.forEach((file) => {
    const data = yaml.load(fs.readFileSync(file, {encoding: 'utf-8'}));

    it(`${file} is schema compliant`, () => {
      expect(ortac.validators.LocaleV1_0_0(data)).to.equal(true, `failed validation with errors:\n${JSON.stringify(ortac.validators.LocaleV1_0_0.errors, null, 2)}`);
    });

    // each context is present in contexts
    if (ortac.typeGuards.isLocale.V1_0_0(data)) {
      const specs: ortac.ResourceTypes.Specification[] = jmespath.search(data.locales, '*.displaySpecs[].*[].*[].specifications');
      it(`${file} only uses valid contexts`, () => {

        specs.forEach((spec) => {
          Object.keys(spec).forEach((mfrContext) => {
            // find the context from the contexts in the resources.yaml that matches this manufacturer context
            let matchingContext;
            Object.keys(contexts).forEach((context) => {
              if (_compareContext(context, mfrContext, resources)) {
                matchingContext = contexts[context];
              }
            });
            expect(typeof matchingContext).not.to.equal('undefined', `In ${file}, \`${mfrContext}\` does not match any valid contexts`);
          });
        });

      });

      it(`${file} uses valid quantities in specifications`, () => {
        specs.forEach((grp) => {
          Object.keys(grp).forEach((mfrContext) => {
            // find the context from the resources.yaml that matches this manufacturer context
            let matchingContext: any;
            Object.keys(contexts).forEach((context) => {
              if (_compareContext(context, mfrContext, resources)) {
                matchingContext = contexts[context];
              }
            });

            Object.keys(grp[mfrContext]).forEach((mfrQty) => {
              expect(typeof matchingContext[mfrQty]).not.to.equal('undefined', `In ${file}, \`${mfrContext}\`, \`${mfrQty}\` does not match any valid quantities in resources.yaml`);
            });
          });
        });
      });

      it(`${file} uses valid quantities`, () => {
        const langQuantities = jmespath.search(data.locales, '*.quantities');

        for (const grp of langQuantities) {
          Object.keys(grp).forEach((langQty) => {
            // find the quantity from the resources.yaml file that matches this quantity
            const matchingQty = quantities[langQty];
            expect(typeof matchingQty).not.to.equal('undefined', `In ${file}, 'locales/.../quantities/${langQty}' does not match any valid quantities in resources.yaml`);
            expect(isValidUnit(grp[langQty].display.unit, matchingQty.kind, resources)).to.equal(true, `In ${file}, 'locales/.../quantities/${langQty}/display/unit/${grp[langQty].display.unit}' does not match any valid quantities in kind '${matchingQty.kind}' in resources.yaml`);
          });
        }
      });

    } else {
      expect(true).to.equal(false, `${file} is not in Locale format`);
    }
  });
});


function _compareContext(context: string, contextWithWildcards: string, resources: ortac.ResourceTypes.ResourcesV1_0_0) {
  // compares to see if the wildcards match with the supplied context
  // eg. `_Motor/<insMotorType>/<insLocation>` would match with `+/_insPropulsion/+` or `_Motor/+/_insMain`
  // the context parameter cannot have wildcards, but can have <ins...>
  // the contextWithWildcards cannot have <ins...> but can have wildcards `+` or `#`
  const s1 = context.split('/');
  const s2 = contextWithWildcards.split('/');

  // check lengths and reject early if possible
  if (s2[s2.length - 1] === '#') {
    if (s2.length > s1.length) {
      return false;
    }
  } else if (s2.length !== s1.length) {
    return false;
  }

  // now s2 length must be shorter than or equal to s1 length
  for (let i = 0; i < s2.length; i++) {
    if (s2[i] === '#' && s2.length === i + 1) {
      return true;
    }
    if (s2[i] !== '+' && s2[i] !== s1[i]) {
      if (!/<ins[A-Za-z]+>/.test(s1[i])) {
        return false;
      }
      // we have a non wildcard in s2 and <ins...> in s1
      // we need to check if there's a match to the instances list
      if (!resources.instances[s1[i]].includes(s2[i])) {
        return false;
      }
    }
  }
  return true;
}

function isValidUnit(unit: string | undefined, kind: string | undefined, resources: ortac.ResourceTypes.ResourcesV1_0_0): boolean {
  // checks to see if the supplied unit is present in the specified kind within the supplied resources file
  let result = false;
  if (typeof unit !== 'undefined' && typeof kind !== 'undefined') {
    resources.kinds[kind].conversion.forEach((conversion) => {
      if (conversion.unit === unit) {
        result = true;
      }
    });
  }
  return result;
}
