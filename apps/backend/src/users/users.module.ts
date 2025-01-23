import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { DirectoryModule } from 'src/directory/directory.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    DirectoryModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
