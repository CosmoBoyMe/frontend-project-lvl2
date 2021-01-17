import _ from 'lodash';

const parseValue = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const indent = ' '.repeat(4);

  const currentIndent = indent.repeat(depth + 1);

  const bracketIndent = indent.repeat(depth);
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${currentIndent}${key}: ${parseValue(val, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const getStylishFormat = (syntaxTree, depth = 1) => {
  const indent = '    '.repeat(depth);
  const bracketIndent = indent.slice(0, -4);
  const indentForDifference = indent.slice(0, -2);
  const line = syntaxTree.flatMap((item) => {
    switch (item.status) {
      case 'added':
        return `${indentForDifference}+ ${item.name}: ${parseValue(item.value, depth)}`;

      case 'deleted':
        return `${indentForDifference}- ${item.name}: ${parseValue(item.value, depth)}`;

      case 'changed': {
        const oldValue = `${indentForDifference}- ${item.name}: ${parseValue(item.oldValue, depth)}`;
        const newValue = `${indentForDifference}+ ${item.name}: ${parseValue(item.value, depth)}`;
        return [oldValue, newValue];
      }

      case 'nested': {
        const children = getStylishFormat(item.children, depth + 1);
        return `${indent}${item.name}: ${children}`;
      }

      default:
        return `${indent}${item.name}: ${parseValue(item.value, depth)}`;
    }
  });

  return ['{', ...line, `${bracketIndent}}`].join('\n');
};

export default getStylishFormat;
