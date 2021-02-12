import yaml from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
};

const selectParser = (extension) => parsers[extension];

export default selectParser;
