const fs = require('fs');
const path = require('path');

const startPath = path.resolve(__dirname, '../src/assets/icons');

const files = fs.readdirSync(startPath);

const names = files.reduce((acc, current) => {
  if (current.includes('.svg')) {
    acc.push(current.replace('.svg', ''));
  }
  return acc;
}, []);

const data = `export type svgNamesType = "${names.join('" | "')}";`;

fs.writeFileSync(path.resolve(startPath, 'svgNames.ts'), data);
