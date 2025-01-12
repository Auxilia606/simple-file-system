import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UploadService {
  getStorageConfig() {
    return diskStorage({
      destination: './uploads/images', // 파일 저장 경로
      filename: (req, file, callback) => {
        const originalName = file.originalname.split('.')[0];
        const uniqueName = `${originalName}-${Date.now()}${extname(file.originalname)}`;
        callback(null, uniqueName); // 고유 파일 이름 생성
      },
    });
  }

  validateFile(file: Express.Multer.File): void {
    if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      throw new Error('Only image files are allowed!');
    }
  }

  getResponse(file: Express.Multer.File): {
    message: string;
    filePath: string;
  } {
    return {
      message: 'File uploaded successfully!',
      filePath: `/uploads/images/${file.filename}`,
    };
  }
}
