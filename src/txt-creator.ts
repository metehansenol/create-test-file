import { Readable, Stream } from 'stream';
import { ICreator } from './types';
import { createChunk, getChunkSize } from './utils';

export class TxtCreator implements ICreator {
  async create(size: number): Promise<Readable> {
    const chunkSize = getChunkSize(size);

    const rounds = Math.floor(size / chunkSize);
    const lastRound = size % chunkSize;

    const stream = new Stream.PassThrough();

    for (let i = 0; i < rounds; i++) {
      stream.write(createChunk(chunkSize));
    }

    stream.end(createChunk(lastRound));

    return Promise.resolve(stream);
  }
}
