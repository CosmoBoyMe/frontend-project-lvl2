import getStylishFormat from './stylish.js';
import getPlainFormat from './plain.js';
import getJsonFormat from './json.js';

const formats = {
  stylish: getStylishFormat,
  plain: getPlainFormat,
  json: getJsonFormat,
};

const getFormatter = (format) => formats[format];

export default getFormatter;
