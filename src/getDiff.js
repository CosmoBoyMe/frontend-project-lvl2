import _ from 'lodash';
import parsers from './parsers.js';
import getFormat from './formatters/index.js';

const makeSyntaxTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));

  const keysSorted = keys.sort();
  const syntaxTree = keysSorted.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { name: key, value: value2, status: 'added' };
    } if (!_.has(data2, key)) {
      return { name: key, value: value1, status: 'removed' };
    } if (_.isObject(value1) && _.isObject(value2)) {
      const children = makeSyntaxTree(value1, value2);
      return { name: key, status: 'nested', children };
    } if (value1 !== value2) {
      return {
        name: key, value: value2, oldValue: value1, status: 'updated',
      };
    }
    return { name: key, value: value1, status: 'unchanged' };
  });
  return syntaxTree;
};

const getDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parsers(filepath1);
  const data2 = parsers(filepath2);
  const syntaxTree = makeSyntaxTree(data1, data2);
  const format = getFormat(formatName);
  const diff = format(syntaxTree);
  return diff;
};

export default getDiff;
