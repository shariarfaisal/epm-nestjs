import { Controller, Get, Param, Body, Post, Put, Delete, ValidationPipe, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto'
import { SigninDto } from './dto/signin.dto'
import { UserService } from './user.service'
import { User } from './user.entity'
import { GetUser } from './get-user.decorator'
import { AuthGuard } from '@nestjs/passport'
import { UpdateDto } from './dto/user-update.dto'
import { PasswordUpdateDto } from './dto/password-update.dto'
import { GetAdmin } from '../admin/get-admin.decorator'
import { Admin } from '../admin/admin.entity'

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

    @Get('/')
    @UseGuards(AuthGuard('admin'))
    // FIXME: AuthGuard ...
    getUsers(@GetAdmin() admin: Admin):Promise<User[]>{
      return this.userService.getUsers()
    }


    @Get('/profile')
    @UseGuards(AuthGuard('user'))
    getProfile(@GetUser() user: User): Promise<User>{
      return this.userService.getUserById(user.id)
    }

    @Get('/:id')
    @UseGuards(AuthGuard('admin'))
    getUserById(@Param('id',ParseUUIDPipe) id: string): Promise<User>{
      return this.userService.getUserById(id)
    }

    @Post('/signup')
    signup(@Body(new ValidationPipe({ transform: true })) dto: SignupDto): Promise<boolean>{
      return this.userService.signup(dto)
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) dto: SigninDto): Promise<{ accessToken: string }>{
      return this.userService.signin(dto)
    }

    @Put('/profile')
    @UseGuards(AuthGuard('user'))
    profileUpdate(@Body() dto: UpdateDto, @GetUser() user: User): Promise<User>{
      return this.userService.updateProfile(dto,user)
    }

    @Put('/password')
    @UseGuards(AuthGuard('user'))
    updatePassword(@Body() dto: PasswordUpdateDto, @GetUser() user: User): Promise<string>{
      return this.userService.updatePassword(dto,user)
    }

    @Delete('/delete')
    @UseGuards(AuthGuard('user'))
    deleteProfile(@GetUser() user: User): Promise<string>{
      return this.userService.deleteProfile(user)
    }

}
