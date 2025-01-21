import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Directory } from './schemas/directory.schema';

@Injectable()
export class DirectoryService {
  constructor(
    @InjectModel(Directory.name) private directoryModel: Model<Directory>,
  ) {}

  async createRootDirectory(userId: string) {
    const directory = new this.directoryModel({ name: userId, parentId: null });
    return directory.save();
  }

  async createDirectory(
    name: string,
    parentId: string | null = null,
    userId: string,
  ): Promise<Directory> {
    // 디렉토리명 검증
    if (!this.isValidDirectoryName(name)) {
      throw new BadRequestException(
        '디렉토리 이름에 사용할 수 없는 특수문자가 포함되어 있습니다. 금지된 문자: <>:"/\\|?*',
      );
    }

    const parentExists = await this.directoryModel.exists({ _id: parentId });

    if (!parentExists) {
      throw new NotFoundException(
        'parentId에 해당하는 디렉토리가 존재하지 않습니다.',
      );
    }

    const isNameDuplicate = await this.directoryModel.exists({
      name,
      parentId,
    });

    if (isNameDuplicate) {
      throw new BadRequestException(
        '같은 부모 디렉토리 내에서 동일한 이름의 디렉토리는 생성할 수 없습니다.',
      );
    }

    const directory = new this.directoryModel({ name, parentId, userId });
    return directory.save();
  }

  private isValidDirectoryName(name: string): boolean {
    // 금지된 문자: <>:"/\|?*
    const invalidChars = /[<>:"/\\|?*]/;
    return !invalidChars.test(name); // 금지된 문자가 없으면 true
  }

  async getDirectories(parentId: string | null = null): Promise<Directory[]> {
    return this.directoryModel.find({ parentId }).exec();
  }

  async updateDirectory(id: string, name: string): Promise<Directory> {
    const directory = await this.directoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true },
    );
    if (!directory) {
      throw new NotFoundException('Directory not found');
    }
    return directory;
  }

  async deleteDirectory(id: string): Promise<void> {
    const result = await this.directoryModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Directory not found');
    }
  }
}
