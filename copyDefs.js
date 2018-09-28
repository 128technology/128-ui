/*eslint-disable */
const fs = require('fs-extra');
const path = require('path');

const SRC = path.join(__dirname, 'src', 'components');
const DIST = path.join(__dirname, 'dist');

const readFiles = dirs =>
  Promise.all(
    dirs.map(x => {
      const file = path.join(SRC, x, 'index.d.ts');
      return fs.readFile(file, 'utf-8');
    })
  );

const copyDefs = dirs =>
  Promise.all(
    dirs.map(x => {
      const file = path.join(SRC, x, 'index.d.ts');
      const dest = path.join(DIST, x, 'index.d.ts');
      return fs.copy(file, dest);
    })
  ).then(() => dirs);

const convertExports = sources => sources.map(x => x.replace(/export\sdefault\s(.+?);/, 'export { $1 };'));
const writeDist = sources => fs.writeFile(path.join(DIST, 'index.d.ts'), sources.join('\n'), { flag: 'w+' });

fs
  .readdir(SRC)
  .then(copyDefs)
  .then(readFiles)
  .then(convertExports)
  .then(writeDist)
  .catch(console.error);
