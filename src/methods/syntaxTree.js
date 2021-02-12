import _ from 'lodash';
import { Types } from '../const.js';

const buildSyntaxTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const syntaxTree = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { name: key, value: value2, type: Types.added };
    } if (!_.has(data2, key)) {
      return { name: key, value: value1, type: Types.removed };
    } if (_.isObject(value1) && _.isObject(value2)) {
      const children = buildSyntaxTree(value1, value2);
      return { name: key, type: Types.nested, children };
    } if (value1 !== value2) {
      return {
        name: key, value: value2, oldValue: value1, type: Types.updated,
      };
    }
    return { name: key, value: value1, type: Types.unchanged };
  });
  return syntaxTree;
};

export default buildSyntaxTree;
