#!/usr/bin/env node
import * as path from 'path';
import { promises as fs } from 'fs';
import * as yargs from 'yargs';
import { Creator } from './creator';

const main = async () => {
  try {
    const argv = yargs.command('create-test-file', 'Create test file', (yargs: yargs.Argv) => {
      return yargs
        .option('type', {
          alias: 't',
          description: 'File type to be created. Available options are `txt`, `jpg` and `pdf`',
          default: 'txt',
          type: 'string',
        })
        .option('size', {
          alias: 's',
          description: 'The size in bytes with the following suffix: `kb`, `mb`, `gb`',
          default: '256kb',
          type: 'string',
        })
        .option('name', {
          alias: 'n',
          description: 'The filename to be created (relative to current working directory)',
          default: 'test',
          type: 'string',
        });
    }).argv;

    const typeArg = argv['type'];
    const sizeArg = argv['size'];
    const nameArg = argv['name'];

    const filePath = path.join('.', `${nameArg}.${typeArg}`);

    const creator = Creator.getInstance(typeArg);

    const stream = await creator.create(sizeArg);

    await fs.writeFile(filePath, stream);

    console.log('done');
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  await main();
})();
