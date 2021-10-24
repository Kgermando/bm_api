import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/users.entity';
import { ImageService } from './image.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, ImageService],
  controllers: [UserController],
  exports: [UserService, ImageService],
})
export class UserModule {}
