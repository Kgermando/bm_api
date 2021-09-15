import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AchatService } from './achat.service';
import { CreateAchatDto } from './dto/create-achat.dto';
import { UpdateAchatDto } from './dto/update-achat.dto';

@Controller('achats')
export class AchatController {
  constructor(private readonly achatService: AchatService) {}

  @Get()
  async all() {
    return this.achatService.all();
  }

  @Post()
  async create(
    @Body() body: CreateAchatDto
  ) {
    return this.achatService.create(body);
  }

  @Get(':id')
  async getOne(
    @Param('id') id: number
  ) {
    return this.achatService.findOne({ id });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: UpdateAchatDto
  ) {
    await this.achatService.update(id, body);
    return this.achatService.findOne({ id });
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number
  ) {
    return this.achatService.delete(id);
  }
}
