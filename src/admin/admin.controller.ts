import { Controller, Get, Param, Body, Post, Put, Delete, UseGuards, UnauthorizedException, ValidationPipe } from '@nestjs/common';
import { Admin } from './admin.entity'
import { SignupDto } from './dto/signup.dto'
import { SigninDto } from './dto/signin.dto'
import { UpdateDto } from './dto/user-update.dto'
import { AdminService } from './admin.service'
import { AuthGuard } from '@nestjs/passport'
import { GetAdmin } from './get-admin.decorator'
import { AdminRole } from './admin-role.enum'
import { PasswordUpdateDto } from './dto/password-update.dto'

@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService
  ){}

    @Get('/')
    @UseGuards(AuthGuard())
    getAdmins(): Promise<Admin[]>{
      return this.adminService.getAdmins()
    }

    @Get('/profile')
    @UseGuards(AuthGuard())
    getProfile(@GetAdmin() admin: Admin): Promise<Admin>{
      return this.adminService.getAdminById(admin.id)
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    getAdminById(@Param('id') id: string): Promise<Admin>{
      return this.adminService.getAdminById(id)
    }

    @Post('/signup')
    signup(@Body(ValidationPipe) dto: SignupDto): Promise<boolean>{
      return this.adminService.signup(dto)
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) dto: SigninDto):Promise<{ accessToken: string}>{
      return this.adminService.signin(dto)
    }

    @Put('/update')
    @UseGuards(AuthGuard())
    updateProfile(@Body(ValidationPipe) dto: UpdateDto, @GetAdmin() admin: Admin): Promise<Admin>{
      return this.adminService.updateProfile(dto,admin)
    }

    @Put('/password')
    @UseGuards(AuthGuard())
    updatePassword(@Body(ValidationPipe) dto: PasswordUpdateDto, @GetAdmin() admin: Admin): Promise<string>{
      return this.adminService.updatePassword(dto,admin)
    }

    @Put('/update-role')
    @UseGuards(AuthGuard())
    updateAdminRole(@Body('role') role: AdminRole, @GetAdmin() admin: Admin): Promise<Admin>{
      if(admin.role !== AdminRole.ADMIN && admin.role !== AdminRole.SUPER_ADMIN){
        throw new UnauthorizedException()
      }
      return this.adminService.updateAdminRole(role,admin)
    }

    @Delete('/delete')
    @UseGuards(AuthGuard())
    deleteProfile(@GetAdmin() admin: Admin): Promise<boolean>{
      return this.adminService.deleteProfile(admin)
    }
}
