import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
  private readonly maxSize = 5 * 1024 * 1024; // 5MB

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const archivo=file

    //console.log('Fileee:', file);
    if (!file.originalname) {
      throw new BadRequestException('File original name is missing');
    }

    //console.log('Fileeeeeeeeeeeeeeeeee:', file);
    const fileExt = extname(file.originalname).toLowerCase();
    //console.log('File extension:', fileExt);


    if (!this.allowedExtensions.includes(fileExt)) {
      //console.log('Fileeeaaaaaaaaaaaaaaaaaaaa:', file);
      throw new BadRequestException(`Invalid file type: ${fileExt}`);
    }

    //console.log('Fileeeoooooooooooooooooooooooooooooooooo:', file);
    if (file.size > this.maxSize) {
      throw new BadRequestException('File too large');
    }
    //console.log('Fileeasdasdasdddddddddde:', archivo);
    return archivo;
  }
}

