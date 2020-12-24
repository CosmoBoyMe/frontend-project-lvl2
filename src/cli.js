import commander from 'commander';

const gendiff = commander;

gendiff
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1', '-V, -v, --version', 'output the version number')
  .helpOption('-H, -h, --help', 'output usage information');

const runCli = () => {
  gendiff.parse(gendiff.argv);
};

export default runCli;
