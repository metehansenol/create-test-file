import * as path from 'path';
import { Readable } from 'stream';
import { promises as fs } from 'fs';
import * as jspdf from 'jspdf';
import { ICreator } from './types';
import { createChunk, getChunkSize, parseSizeArg } from './utils';

export class PdfCreator implements ICreator {
  async create(fileSize: string, includeImage = true): Promise<Readable> {
    const size = parseSizeArg(fileSize);

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
      // const jpegGenerator = new JpegCreator();
      // const imageSize = parseSizeArg('5mb');
      // const imageData = await jpegGenerator.generateContent(imageSize);
      // doc.addImage(imageData, 10, ++i * 10, 10, 10);

      const imageData = await fs.readFile(path.join(__dirname, 'trail.jpeg'));
      doc.addImage(imageData, 10, ++i * 10, 100, 100);
    }

    const arrayBuffer = doc.output('arraybuffer');

    const data = Buffer.from(arrayBuffer);

    return Readable.from(data);
  }
}
