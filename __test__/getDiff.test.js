import { fileURLToPath } from 'url';
import path from 'path';
import getDiff from '../src/getDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('getDiff test main functions', () => {
  const expectedDiferece = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  console.log(__dirname);
  console.log(__filename);
  const difference = getDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));

  expect(difference).toBe(expectedDiferece);
});
