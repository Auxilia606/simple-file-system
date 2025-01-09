import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { email, password, username } = registerDto;

    // 이메일 중복 체크
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    return this.usersService.create({
      email,
      password: hashedPassword,
      username,
    });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      delete user.password;
      return user;
    }
    return null;
  }

  generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, { expiresIn: '15m' });
  }

  async refresh(refreshToken: string): Promise<{ access_token: string }> {
    const payload = this.verifyToken(refreshToken); // Refresh Token 검증
    delete payload.exp;

    return { access_token: this.generateAccessToken(payload) };
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token); // 유효성 검증
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
