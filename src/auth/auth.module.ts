import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { ImageService } from 'src/user/image.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UserModule, CommonModule],
  providers: [ImageService],
  controllers: [AuthController]
})
export class AuthModule {}
