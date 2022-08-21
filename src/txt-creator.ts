import { Readable, Stream } from 'stream';
import { ICreator } from './types';
import { createChunk, getChunkSize, parseSizeArg } from './utils';

export class TxtCreator implements ICreator {
  // eslint-disable-next-line @typescript-eslint/require-await
  async create(sizeArg: string): Promise<Readable> {
    const [size] = parseSizeArg(sizeArg);

    const chunkSize = getChunkSize(size);

    const rounds = Math.floor(size / chunkSize);
    const lastRound = size % chunkSize;

    const stream = new Stream.PassThrough();

    for (let i = 0; i < rounds; i++) {
      stream.write(createChunk(chunkSize));
    }

    stream.end(createChunk(lastRound));

    return stream;
  }
}
