import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DirectoryService } from './directory.service';
import { DirectoryController } from './directory.controller';
import { Directory, DirectorySchema } from './schemas/directory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Directory.name, schema: DirectorySchema },
    ]),
  ],
  controllers: [DirectoryController],
  providers: [DirectoryService],
  exports: [DirectoryService], // 다른 모듈에서 사용할 경우 exports 추가
})
export class DirectoryModule {}
