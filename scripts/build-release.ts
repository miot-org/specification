/* This script builds the files which form the release of a version of the standard
 *
 * The files which are produced are:
 * - schemas.zip
 *      A zip file containing all the json schema definition files for the Ortac standard
 *      including the API schemas
 * - resources.zip
 *      A zip file containing the resources.json file which is in resourcesVx_x_x.schema.json
 *      format. This contains all the quantities, kinds, contexts and instances which form
 *      part of the Ortac specification.
 * - languages.zip
 *      A zip file containing json language files provided by Ortac.org. These language files
 *      are not definitive.
 * - manufacturers.zip
 *      A zip file containing some manufacturers specific json files in the locale format which
 *      are provided as part of the standard file set. It is expected that manufacturers will
 *      also provide their own files independently.
 *
 * These files are produced/converted from yaml files in the src directory
 */

import fs from 'fs';
import path from 'node:path';

import yaml from 'js-yaml';
import AdmZip from 'adm-zip';
import {globSync} from 'glob';


// clear output directory ./build
try {
  fs.rmSync('./build', {recursive: true});
} catch {
  // ignore any error
}
fs.mkdirSync('./build');
// add temporary directory to hold uncompressed file(s)
fs.mkdirSync('./build/tmp');

// create and package/zip Schema files
let files = globSync('./src/schemas/**/*.schema.json');
let zip = new AdmZip();
files.forEach((filename) => {
  zip.addLocalFile(filename, '');
});
zip.writeZip('./build/schemas.zip');

// create Ortac Resources json file from yaml
const obj = yaml.load(fs.readFileSync('./src/json/resources.yaml', {encoding: 'utf-8'}));
fs.writeFileSync('./build/tmp/resources.json', JSON.stringify(obj));
zip = new AdmZip();
zip.addLocalFile('./build/tmp/resources.json');
zip.writeZip('./build/resources.zip');

// create and package/zip Language files
files = globSync('./src/json/languages/**/*.yaml');
zip = new AdmZip();
files.forEach((filename) => {
  const obj = yaml.load(fs.readFileSync(filename, {encoding: 'utf-8'}));
  const tmpFilename = `./build/tmp/${path.basename(filename, 'yaml')}json`;
  fs.writeFileSync(tmpFilename, JSON.stringify(obj));
  zip.addLocalFile(tmpFilename, '');
});
zip.writeZip('./build/languages.zip');

// create and package/zip Manufacturer files
files = globSync('./src/json/manufacturers/**/*.yaml');
zip = new AdmZip();
files.forEach((filename) => {
  const obj = yaml.load(fs.readFileSync(filename, {encoding: 'utf-8'}));
  const tmpFilename = `./build/tmp/${path.basename(filename, 'yaml')}json`;
  fs.writeFileSync(tmpFilename, JSON.stringify(obj));
  zip.addLocalFile(tmpFilename, '');
});
zip.writeZip('./build/manufacturers.zip');

// clean up.... delete temporary files
try {
  fs.rmSync('./build/tmp', {recursive: true});
} catch {
  // ignore any error
}
