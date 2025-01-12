import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  private static createFileInterceptor(uploadService: UploadService) {
    return FileInterceptor('file', {
      storage: uploadService.getStorageConfig(),
      limits: { fileSize: 10 * 1024 * 1024 }, // 파일 크기 제한
      fileFilter: (req, file: Express.Multer.File, callback) => {
        try {
          uploadService.validateFile(file); // 서비스에서 파일 검증
          callback(null, true);
        } catch (error) {
          callback(error, false);
        }
      },
    });
  }

  @UseGuards(JwtAuthGuard) // JWT 인증 Guard 적용
  @Post('image')
  @UseInterceptors(UploadController.createFileInterceptor(new UploadService()))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded or invalid file format.');
    }
    return this.uploadService.getResponse(file); // 서비스에서 응답 생성
  }
}
