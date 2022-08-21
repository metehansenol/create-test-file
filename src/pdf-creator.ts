import * as path from 'path';
import { Readable } from 'stream';
import { promises as fs } from 'fs';
import * as jspdf from 'jspdf';
import { ICreator } from './types';
import { createChunk, getChunkSize, parseSizeArg } from './utils';

export class PdfCreator implements ICreator {
  // eslint-disable-next-line @typescript-eslint/require-await
  async create(sizeArg: string, addImage = true): Promise<Readable> {
    const [size] = parseSizeArg(sizeArg);

    const chunkSize = getChunkSize(size);

    const doc = new jspdf.jsPDF();

    const rounds = Math.floor(size / chunkSize);
    // const lastRound = size % chunkSize;

    let i = 1;
    let line = 25;
    const lineHeight = 10;
    const leftMargin = 20;
    const wrapWidth = 160;

    while (i <= rounds) {
      const text = createChunk(chunkSize);
      const splitText = doc.splitTextToSize(text, wrapWidth);
      for (let x = 0, length = splitText.length; x < length; x++) {
        doc.text(splitText[x], leftMargin, line);
        line = lineHeight + line;
      }
      i++;
    }

    // doc.text(createChunk(lastRound), 10, i * 10);

    // if (addImage) {
    //   const jpegCreator = new JpegCreator();
    //   const imageData = await jpegCreator.create('600x400');
    //
    //   doc.addImage(imageData, 10, ++i * 10, 600, 400);
    // }

    const arrayBuffer = doc.output('arraybuffer');

    const data = Buffer.from(arrayBuffer);

    return Readable.from(data);
  }
}
