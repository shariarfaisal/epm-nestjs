import { Injectable, NotFoundException, InternalServerErrorException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { SignupDto } from './dto/signup.dto'
import { SigninDto } from './dto/signin.dto'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from './jwt-payload.interface'
import { User } from './user.entity'
import { UpdateDto } from './dto/user-update.dto'
import { PasswordUpdateDto } from './dto/password-update.dto'
import * as bcrypt from 'bcryptjs'
import { updateValidator } from './validators/update.validator'
import { passwordUpdateValidator } from './validators/update-password.validator'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepositoty: UserRepository,
    private jwtService: JwtService
  ){}


  async getUsers(): Promise<User[]>{
    const users = await this.userRepositoty.find()
    return users
  }

  async getUserById(id: string): Promise<User>{
    const user = await this.userRepositoty.findOne(id)
    if(!user){
      throw new NotFoundException()
    }
    return user
  }

  signup(dto: SignupDto): Promise<boolean>{
    return this.userRepositoty.signup(dto)
  }

  async signin(dto: SigninDto): Promise<{ accessToken: string }>{
    const user = await this.userRepositoty.cridentialValidator(dto)
    const payloads: JwtPayload = { id: user.id, email: user.email }
    const accessToken = this.jwtService.sign(payloads)
    return { accessToken }
  }

  async updateProfile(dto: UpdateDto, user: User): Promise<User>{
    const { errors, isValid } = updateValidator(dto)
    if(!isValid){
      throw new BadRequestException(errors)
    }

    const { name, email } = dto
    const getUser = await this.getUserById(user.id)
    getUser.name = name
    getUser.email = email

    try{
      await getUser.save()
      return getUser
    }catch(err){
      if(err.code === '23505'){
        throw new ConflictException("Email taken!")
      }
      throw new InternalServerErrorException()
    }
  }

  async updatePassword(dto: PasswordUpdateDto, user: User): Promise<string>{
    const { errors, isValid } = passwordUpdateValidator(dto)
    if(!isValid){
      throw new BadRequestException(errors)
    }

    const profile = await this.getUserById(user.id)
    const { oldPassword, newPassword } = dto
    const salt = bcrypt.genSalt()
    const isPassValid = bcrypt.compare(oldPassword,profile.password)
    if(!isPassValid){
      throw new BadRequestException("Invalid cridentials.")
    }

    profile.password = await bcrypt.hash(newPassword,salt)

    try{
      await profile.save()
      return "Password updated."
    }catch(err){
      throw new InternalServerErrorException()
    }
  }

  async deleteProfile(user: User): Promise<string>{
    const deleted = await this.userRepositoty.delete(user.id)
    if(deleted.affected === 0){
      throw new NotFoundException()
    }
    return "Deleted successfully."
  }
}
