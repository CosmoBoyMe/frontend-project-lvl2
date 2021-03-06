import path from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const getFixturePath = (filename) => path.join('__fixtures__', `${filename}`);
const getExpectedFormat = (formatName) => fs.readFileSync(getFixturePath(`expected_${formatName}`), 'utf-8');

const formats = [
  'stylish',
  'plain',
  'json',
  undefined,
];

const extensions = [
  'json',
  'yml',
];

const extensionCases = extensions.flatMap((cas) => extensions.map((item) => [cas, item]));
const allCases = extensionCases.flatMap((item) => formats.map((el) => [...item, el]));

describe('Test all extension and all format Names', () => {
  test.each(allCases)('extensions: [%s, %s] formatName: %s', (extName1, extName2, formatName) => {
    const filepath1 = getFixturePath(`file1.${extName1}`);
    const filepath2 = getFixturePath(`file2.${extName2}`);
    const difference = genDiff(filepath1, filepath2, formatName);
    const expectedFormat = getExpectedFormat(formatName === undefined ? 'stylish' : formatName);
    expect(difference).toBe(expectedFormat);
  });
});
