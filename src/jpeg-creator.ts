import { Readable } from 'stream';
import * as Jimp from 'jimp';
import { ICreator } from './types';
import { getRandomInt, parseSizeArg } from './utils';

export class JpegCreator implements ICreator {
  async create(sizeArg: string): Promise<Readable> {
    const [w, h] = parseSizeArg(sizeArg);

    const image = this.getRandomJimpImage(w, h);

    const data = await image.getBufferAsync(Jimp.MIME_JPEG);

    return Readable.from(data);
  }

  private getRandomJimpImage(sizeX: number, sizeY: number): Jimp {
    const image = new Jimp(sizeX, sizeY, 'white', (err, data) => {
      if (err) {
        throw err;
      }
      return data;
    });

    for (let x = 0; x < sizeX; x++) {
      for (let y = 0; y < sizeY; y++) {
        image.setPixelColor(Jimp.rgbaToInt(getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)), x, y);
      }
    }

    return image;
  }
}
