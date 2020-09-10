import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TokenlistingModule } from './tokenlisting/tokenlisting.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    TokenlistingModule,
    AdminModule
  ],
})
export class AppModule {}
