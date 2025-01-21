import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { User } from 'src/users/schemas/user.schema';
import { User as UserDecorator } from 'src/users/decorators/user.decorator';

@ApiTags('AUTH 서비스') // Swagger 태그 추가
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: '사용자 생성',
    description: '새로운 사용자를 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '사용자 생성 성공',
    schema: {
      example: {
        id: 'user_id',
        email: 'test@example.com',
        username: 'testuser',
      },
    },
  })
  @ApiResponse({ status: 400, description: '잘못된 요청' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({
    summary: '사용자 로그인',
    description: '로그인 요청을 보냅니다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    schema: {
      example: {
        access_token: 'jwt_token',
        refresh_token: 'refresh_token',
      },
    },
  })
  @ApiResponse({ status: 401, description: '인증 실패: 잘못된 자격 증명' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('refresh')
  @ApiOperation({
    summary: '토큰 재발급',
    description: '토큰을 재발급합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '재발급 성공',
    schema: {
      example: {
        access_token: 'new_jwt_token',
      },
    },
  })
  @ApiResponse({ status: 401, description: '유효하지 않은 리프레시 토큰' })
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '로그아웃',
    description: '현재 사용자를 로그아웃합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공',
    schema: {
      example: { message: 'Logged out successfully' },
    },
  })
  async logout(
    @UserDecorator() user: User, // 커스텀 데코레이터로 사용자 정보 추출
  ) {
    await this.authService.logout(user._id);
    return { message: 'Logged out successfully' };
  }
}
