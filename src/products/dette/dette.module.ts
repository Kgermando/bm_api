import { Module } from '@nestjs/common';
import { DetteService } from './dette.service';
import { DetteController } from './dette.controller';

@Module({
  controllers: [DetteController],
  providers: [DetteService]
})
export class DetteModule {}
