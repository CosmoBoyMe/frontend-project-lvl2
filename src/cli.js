import commander from 'commander';
import getDiff from './getDiff.js';

const gendiff = commander;

gendiff
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.0', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const fileDifference = getDiff(filepath1, filepath2, gendiff.opts().format);
    console.log(fileDifference);
  });

const runCli = () => {
  gendiff.parse(gendiff.argv);
};

export default runCli;
