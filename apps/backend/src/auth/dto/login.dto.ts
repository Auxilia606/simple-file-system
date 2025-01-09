// src/auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format' }) // 이메일 형식 검증
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password cannot be empty' }) // 비밀번호가 비어있지 않은지 검증
  password: string;
}
