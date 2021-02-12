import _ from 'lodash';
import { Types } from '../const.js';

const SPACE = ' ';
const SPACES_COUNT = 4;

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return String(value);
  }

  const indent = SPACE.repeat(SPACES_COUNT);
  const lineIndent = indent.repeat(depth + 1);
  const bracketIndent = indent.repeat(depth);

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${lineIndent}${key}: ${formatValue(val, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const differenceChar = {
  minus: '- ',
  plus: '+ ',
};

const formatStylishFormat = (syntaxTree, depth = 1) => {
  const indentSize = SPACES_COUNT * depth;
  const differenceIndentSize = indentSize - 2;
  const currentIndent = SPACE.repeat(indentSize);

  const bracketIndent = SPACE.repeat(indentSize - SPACES_COUNT);

  const indentForChar = SPACE.repeat(differenceIndentSize);
  const indentForPlus = indentForChar + differenceChar.plus;
  const indentForMinus = indentForChar + differenceChar.minus;

  const lines = syntaxTree.flatMap((item) => {
    switch (item.type) {
      case Types.added:
        return `${indentForPlus}${item.name}: ${formatValue(item.value, depth)}`;

      case Types.removed:
        return `${indentForMinus}${item.name}: ${formatValue(item.value, depth)}`;

      case Types.updated: {
        const oldValue = `${indentForMinus}${item.name}: ${formatValue(item.oldValue, depth)}`;
        const newValue = `${indentForPlus}${item.name}: ${formatValue(item.value, depth)}`;
        return [oldValue, newValue];
      }

      case Types.nested: {
        const children = formatStylishFormat(item.children, depth + 1);
        return `${currentIndent}${item.name}: ${children}`;
      }
      case Types.unchanged:
        return `${currentIndent}${item.name}: ${formatValue(item.value, depth)}`;

      default:
        throw new Error(`unknown type: ${item.type}`);
    }
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const getStylishFormat = (syntaxTree) => formatStylishFormat(syntaxTree);

export default getStylishFormat;
