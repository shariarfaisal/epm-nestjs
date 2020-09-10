import { ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { Repository, EntityRepository } from 'typeorm'
import { Admin } from './admin.entity'
import { SignupDto } from './dto/signup.dto'
import { SigninDto } from './dto/signin.dto'
import * as bcrypt from 'bcryptjs'
import { AdminRole } from './admin-role.enum'

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin>{

  async getAdminByUsername(username: string){
    const admin = await this.findOne({ username })
    return admin
  }

  async signup(dto: SignupDto): Promise<boolean>{
    const { username, email, password, contact } = dto

    const usernameExists = await this.findOne({ username })
    if(usernameExists){
      throw new ConflictException({ username: "Username taken."})
    }

    const emailExists = await this.findOne({ email })
    if(emailExists){
      throw new ConflictException({ email: "Email already exists."})
    }

    const admin = new Admin()
    const salt = await bcrypt.genSalt()

    admin.username = username
    admin.email = email
    admin.contact = contact
    admin.password = await bcrypt.hash(password,salt)
    admin.role = AdminRole.ADMIN
    admin.isActive = false

    try{
      await admin.save()
      return true
    }catch(err){
      throw new InternalServerErrorException()
    }
  }

  async cridentialValidator(dto: SigninDto): Promise<Admin>{
    const { username, password } = dto
    const admin = await this.findOne({ username })
    if(!admin){
      throw new UnauthorizedException("Invalid cridentials.")
    }

    const passIsValid = await bcrypt.compare(password,admin.password)
    if(!passIsValid){
      throw new UnauthorizedException("Invalid cridentials.")
    }
    return admin
  }




}
