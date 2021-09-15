import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdModel } from './models/prodmodel.entity';
import { ProdmodelController } from './prodmodel.controller';
import { ProdmodelService } from './prodmodel.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProdModel])],
  controllers: [ProdmodelController],
  providers: [ProdmodelService]
})
export class ProdmodelModule {}
