import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { Admin } from './admin.entity'
import { AdminRepository } from './admin.repository'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretkey'
    })
  }

  async validate(payload: JwtPayload): Promise<Admin>{
    const { id } = payload
    const admin = await Admin.findOne(id)
    if(!admin){
      throw new UnauthorizedException()
    }
    return admin
  }


}
