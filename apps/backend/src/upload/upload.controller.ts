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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('UPLOAD 서비스') // Swagger 태그 추가
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
  @ApiBearerAuth()
  @ApiOperation({
    summary: '이미지 업로드',
    description: '이미지를 업로드 합니다.',
  })
  @ApiConsumes('multipart/form-data') // Swagger에서 파일 업로드를 지원하는 형식
  @ApiBody({
    description: '업로드할 파일 목록',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary', // 파일 업로드를 나타내는 Swagger 형식
          },
        },
      },
    },
  })
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
