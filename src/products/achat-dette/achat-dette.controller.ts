import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AchatDetteService } from './achat-dette.service';
import { CreateAchatDetteDto } from './dto/create-achat-dette.dto';
import { UpdateAchatDetteDto } from './dto/update-achat-dette.dto';

@Controller('achats-dette')
export class AchatDetteController {
    constructor(private readonly achatDetteService: AchatDetteService) { }

    @Get()
    async all() {
        return this.achatDetteService.all();
    }

    @Post()
    async create(
        @Body() body: CreateAchatDetteDto
    ) {
        return this.achatDetteService.create(body);
    }

    @Get(':id')
    async getOne(
        @Param('id') id: number
    ) {
        return this.achatDetteService.findOne({ id });
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UpdateAchatDetteDto
    ) {
        await this.achatDetteService.update(id, body);
        return this.achatDetteService.findOne({ id });
    }

    @Delete(':id')
    async delete(
        @Param('id') id: number
    ) {
        return this.achatDetteService.delete(id);
    }
}
