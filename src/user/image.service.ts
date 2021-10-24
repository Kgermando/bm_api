import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import * as fs from 'fs';
import { InternalServerErrorException } from '@nestjs/common/exceptions/internal-server-error.exception';
import { imageConstants } from 'src/common/constants';

@Injectable()
export class ImageService {
  async resize(path: string) {
    const resizeTransform = sharp().resize(
      Number(imageConstants.width),
      Number(imageConstants.height),
      {
        fit: sharp.fit.contain,
        withoutEnlargement: true,
      },
    );

    const readableStream = fs.createReadStream(path);
    const resizedImage = await readableStream.pipe(resizeTransform).toBuffer();

    fs.writeFile(path, resizedImage, (error) => {
      if (error) {
        throw new InternalServerErrorException();
      }
    });
  }
}
