import { Readable } from 'stream';

export interface IGenerator {
  generate(size: number): Promise<Readable>;
}
