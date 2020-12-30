import fs from 'fs';
import _ from 'lodash';

const getDiff = (filepath1, filepath2) => {
  const data1 = JSON.parse(fs.readFileSync(filepath1, 'utf8'));
  const data2 = JSON.parse(fs.readFileSync(filepath2, 'utf8'));
  const keys = _.union(_.keys(data1), _.keys(data2));
  const keysSorted = keys.sort();

  const differences = keysSorted.reduce((acc, key) => {
    let currentDifferences = acc;

    const addedKey = `\n  + ${key}: ${_.get(data2, key)}`;
    const oldChangedKey = `\n  - ${key}: ${_.get(data1, key)}`;
    const newChangedKey = `\n  + ${key}: ${_.get(data2, key)}`;
    const deletedKey = `\n  - ${key}: ${_.get(data1, key)}`;
    const unchangedKey = `\n    ${key}: ${_.get(data1, key)}`;

    if (!_.has(data1, key)) {
      currentDifferences += addedKey;
    } else if (!_.has(data2, key)) {
      currentDifferences += deletedKey;
    } else if (data1[key] !== data2[key]) {
      currentDifferences += oldChangedKey;
      currentDifferences += newChangedKey;
    } else {
      currentDifferences += unchangedKey;
    }
    return currentDifferences;
  }, '');
  return `{${differences}\n}`;
};

export default getDiff;
