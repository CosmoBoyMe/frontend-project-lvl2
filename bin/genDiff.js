#!/usr/bin/env node

import program from 'commander';
import genDiff from '../index.js';

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.0', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const fileDifference = genDiff(filepath1, filepath2, program.opts().format);
    console.log(fileDifference);
  });

program.parse(program.argv);
