import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { Admin } from './admin.entity'
import { AdminRepository } from './admin.repository'
import { InjectRepository } from '@nestjs/typeorm'
import * as config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'admin'){
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY || config.get('jwt.secret')
    })
  }

  async validate(payload: JwtPayload): Promise<Admin>{
    const { id } = payload
    const admin = await this.adminRepository.findOne(id)
    if(!admin){
      throw new UnauthorizedException()
    }
    return admin
  }


}
