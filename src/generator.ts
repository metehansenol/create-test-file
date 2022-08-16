import { IGenerator } from './types';
import { TxtGenerator } from './txt-generator';
import { JpgGenerator } from './jpg-generator';
import { PdfGenerator } from './pdf-generator';

export class Generator {
  static getInstance(type: string): IGenerator {
    switch (type) {
      case 'txt':
        return new TxtGenerator();
      case 'jpg':
        return new JpgGenerator();
      case 'pdf':
        return new PdfGenerator();
      default:
        throw new Error('invalid generator');
    }
  }
}
