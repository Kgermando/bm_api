import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Achat } from './entities/achat.entity';

@Injectable()
export class AchatService extends AbstractService {
  constructor(
    @InjectRepository(Achat) private readonly achatRepository: Repository<Achat>,
  ) {
    super(achatRepository)
  }
}
