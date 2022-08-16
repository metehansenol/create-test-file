import { Readable } from 'stream';

export interface ICreator {
  create(size: number): Promise<Readable>;
}
