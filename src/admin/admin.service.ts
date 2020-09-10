import { Injectable, NotFoundException, InternalServerErrorException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { AdminRepository } from './admin.repository'
import { JwtService } from '@nestjs/jwt'
import { SignupDto } from './dto/signup.dto'
import { SigninDto } from './dto/signin.dto'
import { UpdateDto } from './dto/user-update.dto'
import { Admin } from './admin.entity'
import { JwtPayload } from './jwt-payload.interface'
import { PasswordUpdateDto } from './dto/password-update.dto'
import * as bcrypt from 'bcryptjs'
import { AdminRole } from './admin-role.enum'

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
    const { username, email, contact } = dto
    const getAdmin = await this.getAdminById(admin.id)

    if(username !== getAdmin.username){
      const usernameExists = await this.adminRepositoty.findOne({ username })
      if(usernameExists){
        throw new ConflictException("Username taken.")
      }
    }

    if(email.toLowerCase() !== getAdmin.email.toLowerCase()){
      const emailExists = await this.adminRepositoty.findOne({ email })
      if(emailExists){
        throw new ConflictException("Email already exists.")
      }
    }


    getAdmin.username = username
    getAdmin.email = email
    getAdmin.contact = contact
    await getAdmin.save()
    return getAdmin
  }

  async updatePassword(dto: PasswordUpdateDto, admin: Admin){
    const profile = await this.getAdminById(admin.id)
    const { oldPassword, newPassword } = dto
    const salt = bcrypt.genSalt()
    const isValid = bcrypt.compare(oldPassword,profile.password)
    if(!isValid){
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
