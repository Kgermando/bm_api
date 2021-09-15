import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { AchatDette } from './models/achat_model.entity';

@Injectable()
export class AchatDetteService extends AbstractService {
    constructor(
        @InjectRepository(AchatDette) private readonly achatDetteRepository: Repository<AchatDette>,
    ) {
        super(achatDetteRepository)
    }
}
