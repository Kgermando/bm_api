import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResult } from 'src/common/paginate-result.interface';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ImageService } from './image.service';
import { User } from './models/users.entity';

@Injectable()
export class UserService extends AbstractService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private imageService: ImageService,
        ) {
        super(userRepository)
    }

    async paginate(page = 1, relations = []): Promise<PaginatedResult> {
        const { data, meta } = await super.paginate(page, relations);

        return {
            data: data.map((user) => {
                const { password, ...data } = user;
                return data;
            }),
            meta
        };
    }


    // async changePassword(telephone: string, changePasswordDto: ChangePasswordDto) {
    //     const { oldPassword, newPassword, confirmPassword } = changePasswordDto

    //     const user = await this.usersService.findOne({ telephone });

    //     if (!user) {
    //         throw new NotFoundException('User not found');
    //     }

    //     if (newPassword !== confirmPassword) {
    //         return ({
    //             code: 201,
    //             message: 'Confirm password does not match new password'
    //         })
    //     }

    //     const salt = await bcrypt.genSalt()
    //     const userPassword = await bcrypt.hash(newPassword, salt)
    //     try {
    //         await this.repository.update({ telephone: user.id },  { password: userPassword } )
    //     }
    //     catch (error) {
    //         return ({
    //             code: 201,
    //             message: 'Somethine wrong when update password'
    //         })
    //     }
    //     return ({
    //         code: 200,
    //         message: 'Change password successfully'
    //     })
    // }



}
