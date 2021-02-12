import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
};

const selectParser = (expansion) => parsers[expansion];

export default selectParser;
