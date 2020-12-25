import commander from 'commander';

const gendiff = commander;

gendiff
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.0', '-V, -v, --version', 'output the version number')
  .option('-F, -f, --format [type]', 'output format', 'stylish')
  .helpOption('-H, -h, --help', 'output usage information');

const runCli = () => {
  gendiff.parse(gendiff.argv);
};

export default runCli;
