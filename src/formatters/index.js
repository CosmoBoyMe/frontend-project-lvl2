import { formatNames } from '../const.js';
import getStylishFormat from './stylish.js';
import getPlainFormat from './plain.js';
import getJsonFormat from './json.js';

const formats = {
  [formatNames.stylish]: getStylishFormat,
  [formatNames.plain]: getPlainFormat,
  [formatNames.json]: getJsonFormat,
};

const getFormatter = (format) => formats[format];

export default getFormatter;
