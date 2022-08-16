import * as path from 'path';
import { Readable } from 'stream';
import { promises as fs } from 'fs';
import * as jspdf from 'jspdf';
import { IGenerator } from './types';
import { createChunk, getChunkSize } from './utils';

export class PdfGenerator implements IGenerator {
  async generate(size: number, includeImage = true): Promise<Readable> {
    const chunkSize = getChunkSize(size);

    const doc = new jspdf.jsPDF();

    const rounds = Math.floor(size / chunkSize);
    const lastRound = size % chunkSize;

    let i = 1;
    while (i <= rounds) {
      doc.text(createChunk(chunkSize), 10, i * 10);
      i++;
    }
    doc.text(createChunk(lastRound), 10, i * 10);

    if (includeImage) {
      // const jpgGenerator = new JpgGenerator();
      // const imageSize = parseSizeArg('5mb');
      // const imageData = await jpgGenerator.generateContent(imageSize);
      // doc.addImage(imageData, 10, ++i * 10, 10, 10);

      const imageData = await fs.readFile(path.join(__dirname, '..', '/trail.jpg'));
      doc.addImage(imageData, 10, ++i * 10, 100, 100)
    }

    const arrayBuffer = doc.output('arraybuffer');

    const data = Buffer.from(arrayBuffer);

    return Readable.from(data);
  }
}
