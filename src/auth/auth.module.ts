import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ArtistsModule } from 'src/artists/artists.module';
import { jwtConstants } from './constants/jwt.constant';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ArtistsModule,

    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
