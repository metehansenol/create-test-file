import * as path from 'path';
import { Readable } from 'stream';
import { promises as fs } from 'fs';
import { IGenerator } from './types';

export class JpgGenerator implements IGenerator {
  async readIntoBuffer(fd: fs.FileHandle): Promise<Buffer> {
    const buffer = Buffer.alloc(600);

    await fd.read(buffer, 0, 600, 0);

    return buffer;
  }

  async generateContent(size: number): Promise<Buffer> {
    const fd = await fs.open(path.join(__dirname, '..', '/untitled.jpg'), 'r');

    const buffer = await this.readIntoBuffer(fd);

    await fd.close();

    const arrByte = new Uint8Array(size);

    for (let i = 0; i < buffer.length; i++) {
      arrByte[i] = buffer[i];
    }

    return Buffer.from(arrByte);
  }

  async generate(size: number): Promise<Readable> {
    const data = await this.generateContent(size);

    return Readable.from(data);
  }
}
