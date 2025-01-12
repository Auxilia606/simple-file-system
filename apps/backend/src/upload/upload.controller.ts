import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  private static createFilesInterceptor(uploadService: UploadService) {
    return FilesInterceptor('files', 10, {
      // 'files' 필드명과 최대 파일 개수 설정
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
  @UseInterceptors(UploadController.createFilesInterceptor(new UploadService()))
  uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException(
        'No files uploaded or invalid file format.',
      );
    }

    // 서비스에서 각 파일에 대한 응답 생성
    return files.map((file) => this.uploadService.getResponse(file));
  }
}
