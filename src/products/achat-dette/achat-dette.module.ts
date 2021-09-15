import { Module } from '@nestjs/common';
import { AchatDetteService } from './achat-dette.service';
import { AchatDetteController } from './achat-dette.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchatDette } from './models/achat_model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AchatDette])],
  providers: [AchatDetteService],
  controllers: [AchatDetteController]
})
export class AchatDetteModule {}
