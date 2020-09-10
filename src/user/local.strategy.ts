import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtPayload } from './jwt-payload.interface'
import { User } from './user.entity'
import { UserRepository } from './user.repository'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretkey'
    })
  }

  async validate(payload: JwtPayload): Promise<User>{
    const { id } = payload
    const admin = await User.findOne(id)
    if(!admin){
      throw new UnauthorizedException()
    }
    return admin
  }


}
