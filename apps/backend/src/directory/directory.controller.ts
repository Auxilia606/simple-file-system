import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { DirectoryService } from './directory.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/jwt-strategy/jwt-strategy';

@ApiTags('DIRECTORY 서비스') // Swagger 태그 추가
@Controller('directories')
export class DirectoryController {
  constructor(private readonly directoryService: DirectoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '디렉토리 생성',
    description: '새로운 디렉토리를 생성합니다.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: '디렉토리_이름' },
        parentId: { type: 'string', example: 'parentId', nullable: true },
      },
    },
  })
  createDirectory(
    @Body('name') name: string,
    @Body('parentId') parentId: string | null,
    @Request() req: AuthenticatedRequest, // 사용자 정보가 포함된 요청 객체
  ) {
    return this.directoryService.createDirectory(
      name,
      parentId,
      req.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: '디렉토리 조회',
    description: '특정 부모 디렉토리 아래의 디렉토리를 조회합니다.',
  })
  @ApiQuery({
    name: 'parentId',
    required: false,
    type: 'string',
    description: '부모 디렉토리 ID',
  })
  getDirectories(
    @Query('parentId') parentId: string | null,
    @Request() req: AuthenticatedRequest, // 사용자 정보가 포함된 요청 객체
  ) {
    return this.directoryService.getDirectories(parentId, req.user.userId);
  }

  @Put(':id')
  @ApiOperation({
    summary: '디렉토리 수정',
    description: '특정 디렉토리의 이름을 수정합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '수정할 디렉토리의 ID',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: '새로운 디렉토리 이름' },
      },
    },
  })
  updateDirectory(@Param('id') id: string, @Body('name') name: string) {
    return this.directoryService.updateDirectory(id, name);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '디렉토리 삭제',
    description: '특정 디렉토리를 삭제합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '삭제할 디렉토리의 ID',
  })
  deleteDirectory(@Param('id') id: string) {
    return this.directoryService.deleteDirectory(id);
  }
}
