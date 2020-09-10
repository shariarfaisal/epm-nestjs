import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports:[
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretkey',
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([ AdminRepository ])
  ],
  controllers: [AdminController],
  providers: [
    AdminService,
    JwtStrategy
  ],
  exports:[
    PassportModule,
    JwtStrategy
  ]
})
export class AdminModule {}
