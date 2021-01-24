import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const parse = (filePath) => {
  const format = path.extname(filePath);
  switch (format) {
    case '.yaml':
      return yaml.load(fs.readFileSync(filePath, 'utf8'));
    case '.json':
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    default:
      throw new Error(`Error format: ${format}`);
  }
};

export default parse;
