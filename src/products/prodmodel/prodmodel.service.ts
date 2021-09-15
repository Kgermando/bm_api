import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { ProdModel } from './models/prodmodel.entity';

@Injectable()
export class ProdmodelService extends AbstractService {
    constructor(
        @InjectRepository(ProdModel) private readonly produitModelRepository: Repository<ProdModel>,
    ) {
        super(produitModelRepository)
    }

}
