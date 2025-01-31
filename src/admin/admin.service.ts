import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { AdminRepository } from './admin.repository'
import { JwtService } from '@nestjs/jwt'
import { SignupDto } from './dto/signup.dto'
import { SigninDto } from './dto/signin.dto'
import { UpdateDto } from './dto/update.dto'
import { Admin } from './admin.entity'
import { JwtPayload } from './jwt-payload.interface'
import { PasswordUpdateDto } from './dto/password-update.dto'
import * as bcrypt from 'bcryptjs'
import { AdminRole } from './admin-role.enum'
import { updateValidator } from './validators/update.validator'
import { updatePasswordValidator } from './validators/password-update.validator'


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository)
    private adminRepositoty: AdminRepository,
    private jwtService: JwtService
  ){}


  async getAdmins(): Promise<Admin[]>{
    const admins = await this.adminRepositoty.find()
    return admins
  }

  async getAdminById(id: string): Promise<Admin>{
    const admin = await this.adminRepositoty.findOne(id)
    if(!admin){
      throw new NotFoundException()
    }
    return admin
  }

  async getAdminByUsername(username: string): Promise<Admin>{
    const admin = await this.adminRepositoty.findOne({ username })
    if(!admin){
      throw new NotFoundException()
    }
    return admin
  }

  async getAdminByEmail(email: string): Promise<Admin>{
    const admin = await this.adminRepositoty.findOne({ email })
    if(!admin){
      throw new NotFoundException()
    }
    return admin
  }

  signup(dto: SignupDto): Promise<boolean>{
    return this.adminRepositoty.signup(dto)
  }

  async signin(dto: SigninDto){
    const admin = await this.adminRepositoty.cridentialValidator(dto)
    const payloads: JwtPayload = { id: admin.id, username: admin.username, role: admin.role }
    const accessToken = this.jwtService.sign(payloads)
    return { accessToken }
  }

  async updateProfile(dto: UpdateDto, admin: Admin): Promise<Admin>{
    const { errors, isValid } = updateValidator(dto)
    if(!isValid){
      throw new BadRequestException({ errors })
    }

    const { username, email, contact } = dto
    const getAdmin = await this.getAdminById(admin.id)

    if(username !== getAdmin.username){
      const usernameExists = await this.adminRepositoty.findOne({ username })
      if(usernameExists){
        throw new BadRequestException({errors:{username: "Username taken."}})
      }
    }

    if(email.toLowerCase() !== getAdmin.email.toLowerCase()){
      const emailExists = await this.adminRepositoty.findOne({ email })
      if(emailExists){
        throw new BadRequestException({errors: {email: "Email already exists."}})
      }
    }

    getAdmin.username = username
    getAdmin.email = email
    getAdmin.contact = contact
    await getAdmin.save()
    return getAdmin
  }

  async updatePassword(dto: PasswordUpdateDto, admin: Admin){
    const { errors, isValid } = updatePasswordValidator(dto)
    if(!isValid){
      throw new BadRequestException({ errors })
    }


    const profile = await this.getAdminById(admin.id)
    const { oldPassword, newPassword } = dto
    console.log(dto,profile.password)
    const salt = await bcrypt.genSalt()
    const isValidPass = await bcrypt.compare(oldPassword,profile.password)
    if(!isValidPass){
      throw new BadRequestException({errors: {message: "Invalid cridentials."}})
    }

    profile.password = await bcrypt.hash(newPassword,salt)

    try{
      await profile.save()
      return "Password updated."
    }catch(err){
      throw new InternalServerErrorException()
    }
  }

  async updateAdminRole(role: AdminRole, admin: Admin): Promise<Admin>{
    const profile = await this.getAdminById(admin.id)
    profile.role = role
    await profile.save()
    return profile
  }

  async deleteProfile(admin: Admin): Promise<boolean>{
    const deleted = await this.adminRepositoty.delete(admin.id)
    if(deleted.affected === 0){
      throw new NotFoundException()
    }
    return true
  }
}
