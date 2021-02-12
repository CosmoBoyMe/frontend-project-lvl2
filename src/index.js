import getFormatter from './formatters/index.js';
import buildSyntaxTree from './methods/syntaxTree.js';
import { formatNames } from './const.js';
import getParsedData from './methods/getParsedData.js';

const genDiff = (filepath1, filepath2, formatName = formatNames.stylish) => {
  const data1 = getParsedData(filepath1);
  const data2 = getParsedData(filepath2);
  const syntaxTree = buildSyntaxTree(data1, data2);
  const formatter = getFormatter(formatName);
  const differences = formatter(syntaxTree);
  return differences;
};

export default genDiff;
