import { ICreator } from './types';
import { TxtCreator } from './txt-creator';
import { JpgCreator } from './jpg-creator';
import { PdfCreator } from './pdf-creator';

export class Creator {
  static getInstance(type: string): ICreator {
    switch (type) {
      case 'txt':
        return new TxtCreator();
      case 'jpg':
        return new JpgCreator();
      case 'pdf':
        return new PdfCreator();
      default:
        throw new Error('invalid creator');
    }
  }
}
