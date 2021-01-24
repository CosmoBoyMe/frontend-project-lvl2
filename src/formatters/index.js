import getStylishFormat from './stylish.js';
import getPlainFormat from './plain.js';
import getJsonFormat from './json.js';

const formats = {
  stylish: (syntaxTree) => getStylishFormat(syntaxTree),
  plain: (syntaxTree) => getPlainFormat(syntaxTree),
  json: (syntaxTree) => getJsonFormat(syntaxTree),
};
const getFormatter = (format) => formats[format];

export default getFormatter;
