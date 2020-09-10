import { ConflictException, InternalServerErrorException, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { Repository, EntityRepository } from 'typeorm'
import { User } from './user.entity'
import { SignupDto } from './dto/signup.dto'
import { SigninDto } from './dto/signin.dto'
import * as bcrypt from 'bcryptjs'
import { signupValidator } from './validators/signup.validator'
import { signinValidator } from './validators/signin.validator'

@EntityRepository(User)
export class UserRepository extends Repository<User>{

  async signup(dto: SignupDto): Promise<boolean>{
    const { errors, isValid } = signupValidator(dto)
    if(!isValid){
      throw new BadRequestException(errors)
    }

    const { name, email, password, referralId } = dto
    const user = new User()
    const salt = await bcrypt.genSalt()

    user.name = name
    user.email = email
    user.password = await bcrypt.hash(password,salt)
    user.referralId = referralId

    try{
      await user.save()
      return true
    }catch(err){
      if(err.code === '23505'){
        throw new ConflictException("Email taken!")
      }
      throw new InternalServerErrorException()
    }
  }

  async cridentialValidator(dto: SigninDto): Promise<User>{
    const { errors, isValid } = signinValidator(dto)
    if(!isValid){
      throw new BadRequestException(errors)
    }


    const { email, password } = dto
    const user = await this.findOne({ email })
    if(!user){
      throw new UnauthorizedException("Invalid cridentials.")
    }

    const passIsValid = await bcrypt.compare(password,user.password)
    if(!passIsValid){
      throw new UnauthorizedException("Invalid cridentials.")
    }
    return user
  }




}
