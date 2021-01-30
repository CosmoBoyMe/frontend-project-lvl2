import _ from 'lodash';

const SPACE = '    ';

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const lineIndent = SPACE.repeat(depth + 1);
  const bracketIndent = SPACE.repeat(depth);

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${lineIndent}${key}: ${formatValue(val, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const differenceChar = {
  minus: '- ',
  plus: '+ ',
  space: '  ',
};

const formatStylishFormat = (syntaxTree, depth = 1) => {
  const indent = SPACE.repeat(depth);
  const bracketIndent = indent.slice(0, -4);
  const differenceLineIndent = indent.slice(0, -2);
  const lines = syntaxTree.flatMap((item) => {
    switch (item.status) {
      case 'added':
        return `${differenceLineIndent}${differenceChar.plus}${item.name}: ${formatValue(item.value, depth)}`;

      case 'removed':
        return `${differenceLineIndent}${differenceChar.minus}${item.name}: ${formatValue(item.value, depth)}`;

      case 'updated': {
        const oldValue = `${differenceLineIndent}${differenceChar.minus}${item.name}: ${formatValue(item.oldValue, depth)}`;
        const newValue = `${differenceLineIndent}${differenceChar.plus}${item.name}: ${formatValue(item.value, depth)}`;
        return [oldValue, newValue];
      }

      case 'nested': {
        const children = formatStylishFormat(item.children, depth + 1);
        return `${indent}${item.name}: ${children}`;
      }

      default:
        return `${indent}${item.name}: ${formatValue(item.value, depth)}`;
    }
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const getStylishFormat = (syntaxTree) => formatStylishFormat(syntaxTree);

export default getStylishFormat;
