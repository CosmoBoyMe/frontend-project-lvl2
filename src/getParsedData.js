import path from 'path';
import fs from 'fs';
import selectParser from './parser.js';

const getParsedData = (filepath) => {
  const extansion = path.extname(filepath).slice(1);
  const parser = selectParser(extansion);

  return parser(fs.readFileSync(filepath, 'utf-8'));
};

export default getParsedData;
