import parse from './parsers.js';
import getFormatter from './formatters/index.js';
import buildSyntaxTree from './syntaxTree.js';
import { formatNames } from './const.js';

const genDiff = (filepath1, filepath2, formatName = formatNames.stylish) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const syntaxTree = buildSyntaxTree(data1, data2);
  const formatter = getFormatter(formatName);
  const differences = formatter(syntaxTree);
  return differences;
};

export default genDiff;
