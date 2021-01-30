import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';
import parsers from '../src/parsers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('stylishFormat', () => {
  const stylishDifference = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'));
  const expectedStylish = readFile('expectedStylishFormat.txt');
  expect(stylishDifference).toBe(expectedStylish);
});

test('plainFormat', () => {
  const plainDifference = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain');
  const expectedPlain = readFile('expectedPlainFormat.txt');
  expect(plainDifference).toBe(expectedPlain);
});

test('jsonFormat', () => {
  const jsonDifference = genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'json');
  const expectedJson = readFile('expectedJsonFormat.json');
  expect(jsonDifference).toBe(expectedJson);
});

test('parsers', () => {
  const parsingYaml = parsers(getFixturePath('file1.yml'));
  expect(typeof parsingYaml).toBe('object');
});
