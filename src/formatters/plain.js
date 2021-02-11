import _ from 'lodash';
import { Types } from '../const.js';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const formatPlainFormat = (syntaxTree, nodeName = '') => {
  const lines = syntaxTree.flatMap((item) => {
    switch (item.type) {
      case Types.nested:
        return formatPlainFormat(item.children, `${nodeName}${item.name}.`);
      case Types.added:
        return `Property '${nodeName}${item.name}' was added with value: ${formatValue(item.value)}`;
      case Types.removed:
        return `Property '${nodeName}${item.name}' was removed`;
      case Types.updated: {
        const oldValue = formatValue(item.oldValue);
        return `Property '${nodeName}${item.name}' was updated. From ${oldValue} to ${formatValue(item.value)}`;
      }
      case Types.unchanged:
        return null;
      default:
        throw new Error(`unknown type: ${item.type}`);
    }
  });
  return lines.filter((item) => item !== null).join('\n');
};

const getPlainFormat = (syntaxTree) => formatPlainFormat(syntaxTree);

export default getPlainFormat;
