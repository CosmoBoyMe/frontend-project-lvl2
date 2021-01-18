import _ from 'lodash';
import parsers from './parsers.js';
import getPlainFormat from './formatters/plain.js';
import getStylishFormat from './formatters/stylish.js';

const getformat = {
  stylish: (syntaxTree) => getStylishFormat(syntaxTree),
  plain: (syntaxTree) => getPlainFormat(syntaxTree),
};

const getSyntaxTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));

  const keysSorted = keys.sort();
  const ast = keysSorted.map((key) => {
    if (!_.has(data1, key)) {
      return { name: key, value: data2[key], status: 'added' };
    } if (!_.has(data2, key)) {
      return { name: key, value: data1[key], status: 'removed' };
    } if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      const children = getSyntaxTree(data1[key], data2[key]);
      return { name: key, status: 'nested', children };
    } if (data1[key] !== data2[key]) {
      return {
        name: key, value: data2[key], oldValue: data1[key], status: 'updated',
      };
    }
    return { name: key, value: data1[key], status: 'unchanged' };
  });
  return ast;
};

const getDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parsers(filepath1);
  const data2 = parsers(filepath2);
  const syntaxTree = getSyntaxTree(data1, data2);
  return getformat[formatName](syntaxTree);
};

export default getDiff;
