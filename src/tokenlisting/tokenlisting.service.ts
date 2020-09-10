import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { TokenListing } from './tokenlisting.entity'
import { CreateDto } from './dto/create.dto'

@Injectable()
export class TokenlistingService {

  async createToken(dto: CreateDto): Promise<TokenListing>{
    const { name, email, position, tokenName, symbol, tokenDecimal, tokenContract, websiteLink, description, logoLink, exchange, twitter, telegram, chat, reddit, member, channel, refferedBy} = dto

    const token = new TokenListing()
    token.name = name
    token.email = email
    token.position = position
    token.tokenName = tokenName
    token.symbol = symbol
    token.tokenDecimal = tokenDecimal
    token.tokenContract = tokenContract
    token.websiteLink = websiteLink
    token.description = description
    token.logoLink = logoLink
    token.exchange = exchange
    token.twitter = twitter
    token.telegram = telegram
    token.chat = chat
    token.reddit = reddit
    token.member = member
    token.channel = channel
    token.refferedBy = refferedBy

    try{
      await token.save()
      return token
    }catch(err){
      throw new InternalServerErrorException()
    }

  }


  async getTokens(): Promise<TokenListing[]>{
    const tokens = await TokenListing.find()
    return tokens
  }

  async getToken(id: string): Promise<TokenListing>{
    const token = await TokenListing.findOne(id)
    if(!token){
      throw new NotFoundException()
    }
    return token
  }

  
}
