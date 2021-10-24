import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as bcrypt from 'bcrypt';
import { diskStorage } from 'multer';
import { imageExtensionFilter } from 'src/utils/image-extension.utils';
import { imageFileName } from 'src/utils/image-name.utils';
import { UserCreateDto } from './models/user-create.dto';
import { UserUpdateDto } from './models/user-update.dto';
import { User } from './models/users.entity';
import { UserService } from './user.service';
import * as fs from 'fs';
import { ImageService } from './image.service';

@Controller('users')
export class UserController {

    constructor(
        private usersService: UserService,
        private imageService: ImageService
    ) { }

    // @Get()
    // async all(@Query('page') page = 1) {
    //     return await this.usersService.paginate(page, ['role']);
    // }

    @Post()
    @UseInterceptors(
        FileInterceptor('avatar', {
            storage: diskStorage({
                destination: './uploads',
                filename: imageFileName,
            }),
            fileFilter: imageExtensionFilter,
        }),
    )

    @Get()
    async all() {
        return await this.usersService.all();
    }

    @Post()
    async create(
        @Body() body: UserCreateDto,
        @UploadedFile() avatar,
    ): Promise<User[]> {
        if (!avatar?.path || !fs.existsSync(avatar.path)) {
            throw new BadRequestException('File not loaded');
        }
        const password = await bcrypt.hash('1234', 12);
        // const { roleId, ...data } = body
        const logo = body.logo = avatar.path;
        const { role, ...data } = body
        await this.imageService.resize(avatar.path);
        return this.usersService.create({
            ...data,
            password,
            // role: { id: roleId }
            logo,
            role: body.role
        });
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        // return this.usersService.findOne({ id }, ['role']);
        return this.usersService.findOne({ id }, ['role']);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
        // const { roleId, ...data } = body
        const { role, ...data } = body
        await this.usersService.update(id, {
            ...data,
            // role: { id: roleId }
            role: body.role
        });

        return this.usersService.findOne({ id });
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.usersService.delete(id);
    }
}
