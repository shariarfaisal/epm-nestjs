import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm'
import * as config from 'config'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'user'){
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY || config.get('jwt.secret')
    })
  }

  async validate(payload: JwtPayload): Promise<User>{
    const { id } = payload
    const admin = await this.userRepository.findOne(id)
    if(!admin){
      throw new UnauthorizedException()
    }
    return admin
  }


}
