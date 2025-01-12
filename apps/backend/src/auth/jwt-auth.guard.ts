import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // 기본 JWT 인증 로직 수행
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // 사용자 인증 실패 시 예외 처리
    if (err || !user) {
      throw new UnauthorizedException(
        info?.message || 'You are not authorized to access this resource',
      );
    }

    return user;
  }
}
