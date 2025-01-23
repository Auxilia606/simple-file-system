// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization 헤더에서 토큰 추출
      ignoreExpiration: false, // 만료된 토큰 거부
      secretOrKey: process.env.JWT_SECRET || 'default_secret', // 비밀 키
    });
  }

  async validate(payload: any) {
    // JWT 검증 후 유효한 payload 반환
    return { userId: payload.sub, username: payload.username };
  }
}

export interface AuthenticatedRequest extends Request {
  user: {
    userId: string;
    username: string; // 필요에 따라 사용자 정보를 추가
    email?: string;
    roles?: string[];
  };
}
