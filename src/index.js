import path from 'path';
import fs from 'fs';
import parse from './parsers.js';
import getAst from './ast.js';
import getFormat from './formatters/index.js';

const getPath = (str) => fs.readFileSync(path.resolve(str), 'utf8');
const getExtname = (str) => path.extname(str).slice(1);

export default (data1, data2, format = 'stylish') => {
  const file1 = parse(getPath(data1), getExtname(data1));
  const file2 = parse(getPath(data2), getExtname(data2));
  const tree = getAst(file1, file2);

  return getFormat(tree, format);
};
