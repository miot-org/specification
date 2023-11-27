// Copies the file(s) in the source to the destination using cpSync
// eg. cp.js ./www ./pages/www

import fs from 'fs';

if (process.argv.length >= 4) {
  fs.cpSync(process.argv[2], process.argv[3], {recursive: true});
}
