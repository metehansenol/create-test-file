import { Readable } from 'stream';

export interface ICreator {
  create(fileSize: string): Promise<Readable>;
}
