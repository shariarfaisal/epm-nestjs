import { Controller, Get, Param, Body, Post, Put, Delete, UseGuards } from '@nestjs/common';
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
    @UseGuards(AuthGuard())
    getTokens(): Promise<TokenListing[]>{
      return this.tokenService.getTokens()
    }

    @Get('/:id')
    @UseGuards(AuthGuard())
    getTokenById(@Param('id') id: string): Promise<TokenListing>{
      return this.tokenService.getToken(id)
    }

    @Post('/')
    @UseGuards(AuthGuard())
    createToken(@Body() dto: CreateDto, @GetUser() user: User){
      return this.tokenService.createToken(dto)
    }

    @Put('/update')
    updateToken(){

    }

    @Delete('/delete')
    deleteToken(){

    }

}
