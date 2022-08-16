import * as path from 'path';
import { Readable } from 'stream';
import { promises as fs } from 'fs';
import { ICreator } from './types';
import { parseSizeArg } from './utils';

export class JpegCreator implements ICreator {
  async readIntoBuffer(fd: fs.FileHandle): Promise<Buffer> {
    const buffer = Buffer.alloc(600);

    await fd.read(buffer, 0, 600, 0);

    return buffer;
  }

  async createContent(size: number): Promise<Buffer> {
    const fd = await fs.open(path.join(__dirname, 'untitled.jpeg'), 'r');

    const buffer = await this.readIntoBuffer(fd);

    await fd.close();

    const arrByte = new Uint8Array(size);

    for (let i = 0; i < buffer.length; i++) {
      arrByte[i] = buffer[i];
    }

    return Buffer.from(arrByte);
  }

  async create(fileSize: string): Promise<Readable> {
    const size = parseSizeArg(fileSize);

    const data = await this.createContent(size);

    return Readable.from(data);
  }
}
