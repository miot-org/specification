/*
 * This script builds files which need to be checked by a human (ie. manual tests)
 *
 * The files produced are stored in ./tests/manual-tests and are committed so that any changes
 * to the output must be reviewed and approved before being committed
 *
 * The nature of the tests is not functional, but correct assertions eg. conversion rates
 *
 * It also builds some documentation files (in markdown) which are inserted into the main
 * specification
 *
 * NB these are both present in the same file because the routines all make use of the same
 * translation object which in turn collects all words which have been used so these can be
 * put into the final manual test 'phrases-en.md'.
 */

// cspell:words conv
import fs from 'fs';

import yaml from 'js-yaml';
import {globSync, GlobOptionsWithFileTypesUnset} from 'glob';
import {Translator} from '@ortac/libs-js';

import * as ortac from '../src/index.js';

// clear output directory manual-tests, then repopulate with needed subdirectories
try {
  fs.rmSync('./tests/manual-tests', {recursive: true});
} catch {
  // ignore any error
}
fs.mkdirSync('./tests/manual-tests');

// clear output directory build-docs
try {
  fs.rmSync('./build_md', {recursive: true});
} catch {
  // ignore any error
}
fs.mkdirSync('./build_md');

// setting up the translator
// first we must convert the language yaml files to json
const globs: {pattern: string | string[]; options?: GlobOptionsWithFileTypesUnset;}[] = [{pattern: './src/json/languages**/*.yaml'}];
const tempFilenames: string[] = [];
globs.forEach((glob) => {
  const files = globSync(glob.pattern, glob.options);
  files.forEach((filename) => {
    const langJson = yaml.load(fs.readFileSync(filename, {encoding: 'utf-8'}));
    fs.writeFileSync(`${filename}.json.tmp`, JSON.stringify(langJson));
    tempFilenames.push(`${filename}.json.tmp`);
  });
});
// initiate translator using our temporary files
const translator = new Translator([{pattern: './src/json/languages**/*.yaml.json.tmp'}]);
translator.startLogging();
// delete temporary files
tempFilenames.forEach((filename) => {
  fs.rmSync(filename);
});

// read resources into resources variable
const resourcesTmp = yaml.load(fs.readFileSync('./src/json/resources.yaml', {encoding: 'utf-8'}));

// the type guards never error and they provide typing
if (!ortac.typeGuards.isResources.V1_0_0(resourcesTmp)) {
  // resources doesn't validate against the schema
  // call validate which will throw an error with the explanation
  ortac.validators.ResourcesV1_0_0(resourcesTmp);
  // can't get here, but throw an error if we do. This also allows resources to be of known type in code below
  throw new Error('resources.yaml fails type guard test');
}

// assign to resources so TS recognises it as ResourcesV1_0_0 even within functions
const resources: ortac.ResourceTypes.ResourcesV1_0_0 = resourcesTmp;

// create md support documentation
fs.writeFileSync('./build_md/kinds-table.md', buildKindsListMD('en-GB'));
fs.writeFileSync('./build_md/quantities-table.md', buildQuantitiesListMD('en-GB'));


// create Manual Test Plans
fs.writeFileSync('./tests/manual-tests/kinds-en-GB.md', quantityKind('en-GB'));
fs.writeFileSync('./tests/manual-tests/kinds-en-US.md', quantityKind('en-US'));

// This manual test must be built last as it uses the phrase list collated within the translate.language function
fs.writeFileSync('./tests/manual-tests/phrases-en.md', phrases(['en-GB', 'en-US']));

// ------------------------------------------------------------------------

function quantityKind(language: string) {
  let str: string;

  str = '[//]: # (cspell:disable - derived document, no need for spell checking)\n';
  str += `# Ortac Quantity Kinds Manual Test Plan (${language})\n`;
  str += 'This test plan is designed to be completed by hand. Each test sets out what the test is, and what a pass of the test requires.\n';

  str += '## Test 1: Unit Names\n';
  str += 'Unit names should be plural and should complete the sentence `*quantity* is measured in *Units*`,';
  str += ' for example `Temperature is measured in Degrees Celsius`.\n';
  str += 'The capitalisation should follow the convention for the language represented, but in particular';
  str += ' capitalisation in English should be in accordance with [The International System of Units (SI) (9th edition 2019)](../SI-Brochure-9-EN.pdf).\n';
  str += `This test lists the ${language} language version. It can be compared to other languages using a diff tool`;
  str += ' as the layout is identical for each language.\n';
  str += 'The specific items to test/check:\n';
  str += '- The suffix usually has a half space separator to the number, but there are exceptions eg. 21.1°C\n';
  str += '- The suffix is always stated in the plural\n';
  str += '- The capitalisation of the unit is usually lower case, eg. the only SI unit with upper case letters is `degree Celsius`\n';
  str += '- The unit is stated in the singular, but is measured in the plural\n';
  str += '- The use of a `-` in names is difficult to define, but must be used consistently and where it is in common usage, eg. `foot-pounds`. Cite dictionary references when used.\n';

  const kinds = resources.kinds;

  Object.keys(kinds).forEach((key) => {
    const kind = kinds[key];
    str += `### ${translator.lookup(language, key)}\n`;
    const strKey = `${translator.lookup(language, key)} ${translator.lookup(language, '_is_measured_in')} `;
    const siConv = kind.conversion.find((conv: ortac.ResourceTypes.ConversionV1_0_0) => conv.unit === kind.siUnit);
    if (typeof siConv === 'undefined') {
      throw new Error(`The si unit ${kind.siUnit} for kind ${key} does not exist in the conversions in resources for that kind`);
    }
    for (const conv2 of kind.conversion) {
      str += `- **${translator.lookup(language, conv2.name)}**: ${strKey}${translator.lookup(language, conv2.namePl)}`;
      if (conv2.unit === kind.siUnit) {
        str += ` eg. '1.0${translator.lookup(language, conv2.suffix)}' (SI Unit)`;
      } else {
        // only insert a sample conversion if we don't have an SI unit
        str += ` eg. '1.0${translator.lookup(language, conv2.suffix)} = ${convert(kind, 1.0, conv2.unit, kind.siUnit)}${translator.lookup(language, siConv.suffix)}'`;
        str += `, and '1.0${translator.lookup(language, siConv.suffix)} = ${convert(kind, 1.0, kind.siUnit, conv2.unit)}${translator.lookup(language, conv2.suffix)}'`;
      }
      str += '\n';
    }
  });

  return str;
}

function convertToSI(kind: ortac.ResourceTypes.KindV1_0_0, value: number | undefined, unit: string) {
    // takes the value and unit and converts it to SI units using the conversion found in kind
  if (typeof value === 'undefined') {
    return value;
  }
  const si = kind.siUnit;
  if (unit === si) {
    return value;
  } else {
    const from = kind.conversion.find((conv) => conv.unit === unit);
    if (typeof from === 'undefined') {
      return from;
    }
    const fromComplete: ortac.ResourceTypes.ConversionV1_0_0Full = {factor: 1, divisor: 1, offset: 0, logFactor: 0, ...from};
    if (typeof fromComplete.logFactor === 'undefined' || fromComplete.logFactor === 0) {
      return (value - fromComplete.offset) * fromComplete.divisor / fromComplete.factor;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-extra-parens
      return (10 ^ (value / fromComplete.logFactor) - fromComplete.offset) * fromComplete.divisor / fromComplete.factor;
    }
  }
}

function convertFromSI(kind: ortac.ResourceTypes.KindV1_0_0, value: number | undefined, unit: string) {
    // takes the value as an SI unit and converts it to the unit requested
  if (typeof value === 'undefined') {
    return value;
  }
  const si = kind.siUnit;
  if (unit === si) {
    return value;
  } else {
    const to = kind.conversion.find((conv) => conv.unit === unit);
    if (typeof to === 'undefined') {
      return to;
    }
    const toComplete: ortac.ResourceTypes.ConversionV1_0_0Full = {factor: 1, divisor: 1, offset: 0, logFactor: 0, ...to};
    if (typeof toComplete.logFactor === 'undefined' || toComplete.logFactor === 0) {
      // eslint-disable-next-line @typescript-eslint/no-extra-parens
      return toComplete.offset + (value * toComplete.factor / toComplete.divisor);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-extra-parens
      return toComplete.logFactor * Math.log10(toComplete.offset + (value * toComplete.factor / toComplete.divisor));
    }
  }
}

function convert(kind: ortac.ResourceTypes.KindV1_0_0, value: number, from: string, to: string) {
  return convertFromSI(kind, convertToSI(kind, value, from), to);
}

function _phrasesSort(i: string, j: string) {
  // sort firstly by `_`, `_qty`, `_ins` and `_knd`, then alphabetically
  let ret;
  if (i === j) {
    ret = 0;
  } else {
    ret = -1;
    const regex = new RegExp(/^_qty|^_ins|^_knd|^_/);
    const iPrefix = regex.exec(i);
    const jPrefix = regex.exec(j);
    if (iPrefix !== null && iPrefix.length >= 0 && jPrefix !== null && jPrefix.length >= 0) {
      if (iPrefix[0] === jPrefix[0]) {
        ret = i > j ? 1 : -1;
      } else {
        ret = iPrefix[0] > jPrefix[0] ? 1 : -1;
      }
    } else {
      const iLength = iPrefix === null ? 0 : iPrefix.length;
      const jLength = jPrefix === null ? 0 : jPrefix.length;
      ret = iLength > jLength ? 1 : -1;
    }
  }
  return ret;
}

function phrases(arrLangs: string[]) {
  // this produces a table of all phrases for the supplied languages for manual checking and highlighting any differences

  // get list of phrases passed through translate function
  const arrKeys = translator.getLog();

  arrKeys.sort(_phrasesSort);

  // we create a 2 dimensional array of strings
  const out = [];

  // first do the base phrases
  const temp: string[] = [];
  arrKeys.forEach((key) => {
    // temp.push(languages.basePhrase(key));
    temp.push(key);
  });
  out.push(temp);

  // now do all the other languages asked for
  arrLangs.forEach((lang) => {
    const temp: string[] = [];
    arrKeys.forEach((key) => {
      temp.push(translator.lookup(lang, key));
    });
    out.push(temp);
  });


  // now build the markdown
  let str = '[//]: # (cspell:disable - derived document, no need for spell checking)\n';
  str += '| Base Phrase | ';
  let strH = '| --- | ';
  arrLangs.forEach((lang) => {
    str += `${lang}| `;
    strH += '--- | ';
  });

  str += `\n${strH}\n`;

  let colPre;
  let colPost;
  for (let row = 0; row < out[0].length; row++) {
    str += '| ';
    for (let col = 0; col < out.length; col++) {
      // eslint-disable-next-line @typescript-eslint/no-extra-parens
      if (col === 0 || (col !== 0 && out[col][row] !== out[col - 1][row])) {
        colPre = '';
        colPost = '';
      } else {
        colPre = '<span style=\'color: grey\'>';
        colPost = '</span>';
      }
      str += `${colPre}${out[col][row]}${colPost} | `;
    }
    str += '\n';
  }

  return str;
}

function buildKindsListMD(lang: string): string {
  // builds the list of Kinds (Quantity Kinds) in markdown format

  const kinds = resources.kinds;

  let str = `| quantityKind | ${lang} Description | unit Symbol | unit Suffix | unit Description |\n`;
  str += '| --- | --- | :---: | :---: | --- |\n';
  Object.keys(kinds).forEach((key) => {
    const kind = kinds[key];
    for (let i = 0; i < kind.conversion.length; i++) {
      if (i === 0) {
        str += `| ${md(key)}`;
        str += ` | ${md(translator.lookup(lang, key))}`;
        str += ` | ${md(translator.lookup(lang, kind.symbol))}`;
      } else {
        str += '| | |';
      }
      str += ` | ${md(translator.lookup(lang, kind.conversion[i].suffix))}`;
      str += ` | ${md(translator.lookup(lang, kind.conversion[i].namePl))}`;
      // touch the names singular in the languages file to ensure it is added to the list of all phrases
      translator.lookup(lang, kind.conversion[i].name);
      str += ' |\n';
    }
  });
  str += '\n';

  return str;
}

function buildQuantitiesListMD(lang: string): string {
  // builds the list of Quantities is markdown format

  const quantities = resources.quantities;

  let str = '| quantityID | quantityKindID |\n';
  str += '| --- | --- |\n';
  Object.keys(quantities).forEach((key) => {
    str += `| ${md(key)} | ${md(quantities[key].kind)} |\n`;
  });
  str += '\n';

  return str;
}

function md(str: string): string {
  // this function accepts a string and returns a string with Markdown special characters appropriately escaped
  return str.replaceAll('\\', '\\\\')
    .replaceAll('`', '\\`')
    .replaceAll('*', '\\*')
    .replaceAll('_', '\\_')
    .replaceAll('{', '\\{')
    .replaceAll('}', '\\}')
    .replaceAll('[', '\\[')
    .replaceAll(']', '\\]')
    .replaceAll('(', '\\(')
    .replaceAll(')', '\\)')
    .replaceAll('#', '\\#')
    .replaceAll('+', '\\+')
    .replaceAll('-', '\\-')
    .replaceAll('.', '\\.')
    .replaceAll('!', '\\!')
    .replaceAll('&', '\\&')
    .replaceAll('<', '\\<')
    .replaceAll('>', '\\>');
}
