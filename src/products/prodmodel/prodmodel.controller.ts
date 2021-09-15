import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CreateProdModelDto } from './dto/create-prodmod.dto';
import { UpdateProdModelDto } from './dto/update-prodModel.dto';
import { ProdmodelService } from './prodmodel.service';

@Controller('prodmodel')
export class ProdmodelController {
    constructor(private prodModel: ProdmodelService) {}

    // @Get()
    // async allPaginate(
    //     @Query('page') page = 1
    // ) {
    //     return this.prodModel.paginate(page);

    // }

    @Get()
    async all() {
        return this.prodModel.all();
    }

    @Post()
    async create(
        @Body() body: CreateProdModelDto
    ) {
        return this.prodModel.create(body);
    }

    @Get(':id')
    async getOne(
        @Param('id') id: number
    ) {
        return this.prodModel.findOne({id});
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() body: UpdateProdModelDto
    ) {
        await this.prodModel.update(id, body);
        return this.prodModel.findOne({id});
    }

    @Delete(':id')
    async delete(
        @Param('id') id: number
    ) {
        return this.prodModel.delete(id);
    }


}
