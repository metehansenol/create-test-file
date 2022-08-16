import { ICreator } from './types';
import { TxtCreator } from './txt-creator';
import { JpegCreator } from './jpeg-creator';
import { PdfCreator } from './pdf-creator';

export class Creator {
  static getInstance(type: string): ICreator {
    switch (type) {
      case 'txt':
        return new TxtCreator();
      case 'jpeg':
        return new JpegCreator();
      case 'pdf':
        return new PdfCreator();
      default:
        throw new Error('invalid creator');
    }
  }
}
