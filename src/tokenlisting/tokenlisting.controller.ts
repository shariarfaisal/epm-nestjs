import { Controller, Get, Param, Body, Post, Put, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../user/get-user.decorator'
import { User } from '../user/user.entity'
import { CreateDto } from './dto/create.dto'
import { TokenlistingService } from './tokenlisting.service'
import { TokenListing } from './tokenlisting.entity'

@Controller('tokenlisting')
export class TokenlistingController {
  constructor(private tokenService: TokenlistingService){}

    @Get('/')
    @UseGuards(AuthGuard('admin'))
    getTokens(): Promise<TokenListing[]>{
      return this.tokenService.getTokens()
    }

    @Get('/:id')
    @UseGuards(AuthGuard('admin'))
    getTokenById(@Param('id', ParseUUIDPipe) id: string): Promise<TokenListing>{
      return this.tokenService.getToken(id)
    }

    @Post('/')
    @UseGuards(AuthGuard('user'))
    createToken(@Body() dto: CreateDto, @GetUser() user: User){
      return this.tokenService.createToken(dto)
    }


    @Delete('/:id')
    @UseGuards(AuthGuard('admin'))
    deleteToken(@Param('id', ParseUUIDPipe) id: string): Promise<boolean>{
      return this.tokenService.getDelete(id)
    }

}
