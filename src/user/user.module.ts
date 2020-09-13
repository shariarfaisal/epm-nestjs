import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'
import * as config from 'config'
@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY || config.get('jwt.secret'),
      signOptions: {
        expiresIn: process.env.EXPIRES_IN || config.get('jwt.expiresIn')
      }
    }),
    TypeOrmModule.forFeature([ UserRepository ])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy
  ],
  exports:[
    PassportModule,
  ]
})
export class UserModule {}
