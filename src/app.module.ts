import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'gk0838',
      database: 'emanagement',
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    CommonModule,
    RoleModule,
    PermissionModule,
    AuthModule,
  ],
})
export class AppModule {}
