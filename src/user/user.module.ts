import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './local.strategy'

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretkey',
      signOptions: {
        expiresIn: 36000
      }
    }),
    TypeOrmModule.forFeature([ UserRepository ])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    LocalStrategy
  ],
  exports:[
    PassportModule,
  ]
})
export class UserModule {}
