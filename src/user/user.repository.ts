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
      throw new BadRequestException({errors})
    }
    const { name, email, password, referralId } = dto

    const emailExists = await this.findOne({ email })
    if(emailExists){
      throw new BadRequestException({ errors:{ email: "Email already exists."} })
    }


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
      throw new InternalServerErrorException()
    }
  }

  async cridentialValidator(dto: SigninDto): Promise<User>{
    const { errors, isValid } = signinValidator(dto)
    if(!isValid){
      throw new BadRequestException({errors})
    }

    const { email, password } = dto
    const user = await this.findOne({ email })
    if(!user){
      throw new BadRequestException("Invalid cridentials.")
    }

    const passIsValid = await bcrypt.compare(password,user.password)
    if(!passIsValid){
      throw new BadRequestException({ errors:{ message: "Invalid cridentials."}})
    }
    return user
  }




}
