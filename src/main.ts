#!/usr/bin/env node
import * as path from 'path';
import { promises as fs } from 'fs';
import * as yargs from 'yargs';
import { Generator } from './generator';
import { parseSizeArg } from './utils';

const main = async () => {
  try {
    const argv = yargs.command(
      'create-test-file',
      'Create test file',
      (yargs: yargs.Argv) => {
        return yargs
          .option('type', {
            alias: 't',
            description:
              'File type to be created. Available options are `txt`, `jpg` and `pdf`',
            default: 'txt',
            type: 'string',
          })
          .option('size', {
            alias: 's',
            description: 'File size',
            default: '256kb',
            type: 'string',
          })
          .option('name', {
            alias: 'n',
            description: 'File name',
            default: 'test',
            type: 'string',
          });
      },
    ).argv;

    const typeArg = argv['type'];
    const sizeArg = argv['size'];
    const nameArg = argv['name'];

    const size = parseSizeArg(sizeArg);

    const filePath = path.join('.', `${nameArg}.${typeArg}`);

    const generator = Generator.getInstance(typeArg);

    const stream = await generator.generate(size);

    await fs.writeFile(filePath, stream);

    console.log('done');
  } catch (err) {
    console.error(err);
  }
};

(async () => {
  await main();
})();