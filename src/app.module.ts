import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { AchatModule } from './products/achat/achat.module';
import { VenteModule } from './products/vente/vente.module';
import { DetteModule } from './products/dette/dette.module';
import { ProdmodelModule } from './products/prodmodel/prodmodel.module';
import { AchatDetteModule } from './products/achat-dette/achat-dette.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    CommonModule,
    RoleModule,
    PermissionModule,
    AuthModule,
    AchatModule,
    VenteModule,
    DetteModule,
    ProdmodelModule,
    AchatDetteModule,
  ],
})
export class AppModule {}
