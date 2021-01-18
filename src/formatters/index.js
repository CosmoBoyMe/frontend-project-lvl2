import getStylishFormat from './stylish.js';
import getPlainFormat from './plain.js';

const formats = {
  stylish: (syntaxTree) => getStylishFormat(syntaxTree),
  plain: (syntaxTree) => getPlainFormat(syntaxTree),
};
const getFormat = (format) => formats[format];

export default getFormat;
