import _ from 'lodash';
import parse from './parsers.js';
import getFormatter from './formatters/index.js';

const Status = {
  added: 'added',
  removed: 'removed',
  updated: 'updated',
  unchanged: 'unchanged',
  nested: 'nested',
};

const formatNames = {
  stylish: 'stylish',
  plain: 'plain',
  json: 'json',
};

const buildSyntaxTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2)).sort();

  const syntaxTree = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { name: key, value: value2, status: Status.added };
    } if (!_.has(data2, key)) {
      return { name: key, value: value1, status: Status.removed };
    } if (_.isObject(value1) && _.isObject(value2)) {
      const children = buildSyntaxTree(value1, value2);
      return { name: key, status: Status.nested, children };
    } if (value1 !== value2) {
      return {
        name: key, value: value2, oldValue: value1, status: Status.updated,
      };
    }
    return { name: key, value: value1, status: Status.unchanged };
  });
  return syntaxTree;
};

const genDiff = (filepath1, filepath2, formatName = formatNames.stylish) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const syntaxTree = buildSyntaxTree(data1, data2);
  const formatter = getFormatter(formatName);
  const differences = formatter(syntaxTree);
  return differences;
};

export default genDiff;
