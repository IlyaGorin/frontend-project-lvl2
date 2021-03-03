#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import fs from 'fs';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const file1 = JSON.parse(fs.readFileSync(filepath1, 'utf8'));
    const file2 = JSON.parse(fs.readFileSync(filepath2, 'utf8'));
    const result = genDiff(file1, file2);
    console.log(result);
  });
program.parse(process.argv);
