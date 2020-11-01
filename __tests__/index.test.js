/* eslint-disable no-underscore-dangle */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (data) => path.join(__dirname, `../__tests__/__fixtures__/${data}`);

test.each([
  ['file1.json', 'file2.json', 'stylish', 'stylish.txt'],
  ['file3.yml', 'file4.yml', 'plain', 'plain.txt'],
  ['file5.ini', 'file6.ini', 'json', 'json.txt'],
])('.add(%s)', (data1, data2, format, equal) => {
  const file1 = getPath(data1);
  const file2 = getPath(data2);
  const equalFormat = fs.readFileSync(getPath(equal), 'utf8');
  expect(gendiff(file1, file2, format)).toEqual(equalFormat);
});
