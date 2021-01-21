import getStylishFormat from './stylish.js';
import getPlainFormat from './plain.js';
import getJsonFormat from './json.js';

const formats = {
  stylish: (syntaxTree) => getStylishFormat(syntaxTree),
  plain: (syntaxTree) => getPlainFormat(syntaxTree),
  json: (syntaxTree) => getJsonFormat(syntaxTree),
};
const getFormat = (format) => formats[format];

export default getFormat;
