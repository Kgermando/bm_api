import { Module } from '@nestjs/common';
import { AchatService } from './achat.service';
import { AchatController } from './achat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achat } from './entities/achat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Achat])],
  controllers: [AchatController],
  providers: [AchatService]
})
export class AchatModule {}
