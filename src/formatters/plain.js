import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return typeof value === 'string' ? `'${value}'` : value;
};

const formatPlainFormat = (syntaxTree, nodeName = '') => {
  const lines = syntaxTree.flatMap((item) => {
    switch (item.status) {
      case 'nested':
        return formatPlainFormat(item.children, `${nodeName}${item.name}.`);
      case 'added':
        return `Property '${nodeName}${item.name}' was added with value: ${formatValue(item.value)}`;
      case 'removed':
        return `Property '${nodeName}${item.name}' was removed`;
      case 'updated': {
        const oldValue = formatValue(item.oldValue);
        return `Property '${nodeName}${item.name}' was updated. From ${oldValue} to ${formatValue(item.value)}`;
      }
      case 'unchanged':
        return [];
      default:
        throw new Error(`unknown status: ${item.status}`);
    }
  });
  return lines.join('\n');
};

const getPlainFormat = (syntaxTree) => formatPlainFormat(syntaxTree);

export default getPlainFormat;
