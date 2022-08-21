import { Readable } from 'stream';

export interface ICreator {
  create(sizeArg: string): Promise<Readable>;
}
