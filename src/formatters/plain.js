import _ from 'lodash';

const getRightValueFormat = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  } if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};
const getPlainFormat = (syntaxTree, nodeName = '') => {
  const lines = syntaxTree.flatMap((item) => {
    switch (item.status) {
      case 'nested':
        return getPlainFormat(item.children, `${nodeName}${item.name}.`);
      case 'added':
        return `Property '${nodeName}${item.name}' was added with value: ${getRightValueFormat(item.value)}`;
      case 'removed':
        return `Property '${nodeName}${item.name}' was removed`;
      case 'updated': {
        const oldValue = getRightValueFormat(item.oldValue);
        return `Property '${nodeName}${item.name}' was updated. From ${oldValue} to ${getRightValueFormat(item.value)}`;
      }
      default:
      // return `Property '${name}${item.name}' was unchanged.`
        return [];
    }
  });
  return lines.join('\n');
};
export default getPlainFormat;
