// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'test@example.com', description: '사용자 이메일' })
  @IsEmail({}, { message: 'Invalid email format' }) // 이메일 형식 검증
  email: string;

  @ApiProperty({ example: 'securepassword', description: '사용자 비밀번호' })
  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' }) // 비밀번호가 비어있지 않은지 검증
  password: string;
}
