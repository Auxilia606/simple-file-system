import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { DirectoryService } from 'src/directory/directory.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly directoryService: DirectoryService,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const newUser = new this.userModel(userData);
    this.directoryService.createRootDirectory(newUser._id);

    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    const hashedRefreshToken = refreshToken
      ? await bcrypt.hash(refreshToken, 10) // Refresh Token 암호화
      : null;

    await this.userModel.updateOne(
      { _id: userId },
      { $set: { refreshToken: hashedRefreshToken } },
    );
  }
}
