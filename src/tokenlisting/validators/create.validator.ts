import validator from 'validator'
import { CreateDto } from '../dto/create.dto'

export const createValidator = ({
  email, name, position, tokenName,
  symbol, tokenDecimal, tokenContract, websiteLink,
  description, logoLink, exchanges,
  twitter, telegram, chat, reddit, members,
  channel, refferedBy
}: CreateDto) => {
  const errors:any = {}

  if(!email) errors.email = "Email required."
  else if (!validator.isEmail(email)) errors.email = "Invalid email."

  if(!name) errors.name = "Name required."
  else if(name.length > 55) errors.name = "Name too long."

  if(!position) errors.position = "Contact Position required."
  else if(position.length > 100) errors.position = "Too long characters."

  if(!tokenName) errors.tokenName = "Token name required."
  else if(tokenName.length > 16) errors.tokenName = "Token name should not be bigger than 16 characters."

  if(!symbol) errors.symbol = "Symbol required."
  else if(symbol.length > 16) errors.symbol = "Symbol should not be bigger than 16 characters."

  if(!tokenDecimal) errors.tokenDecimal = "Token decimal required."
  else if(tokenDecimal.length > 18) errors.tokenDecimal = "Token decimal should not be bigger than 18 characters."

  if(!tokenContract) errors.tokenContract = "Token contract required."
  else if(tokenContract.length > 1000) errors.tokenDecimal = "Too long characters."

  if(!websiteLink) errors.websiteLink = "Website link required."
  else if(websiteLink.length > 1000) errors.websiteLink = "Too long characters."

  if(!description) errors.description = "Description required."
  else if(description.length > 200) errors.description = "Description limit 200 characters."

  if(!logoLink) errors.logoLink = "Logo link required."
  else if(logoLink.length > 1000) errors.logoLink = "Too long characters."

  if(!exchanges) errors.exchanges = "Exchanges required."
  else if(exchanges.length > 1000) errors.exchanges = "Too long characters."

  if(twitter && twitter.length > 1000) errors.twitter = "Too long characters."
  if(telegram && telegram.length > 1000) errors.telegram = "Too long characters."
  if(chat && chat.length > 1000) errors.chat = "Too long characters."
  if(reddit && reddit.length > 1000) errors.reddit = "Too long characters."
  if(members && members.length > 1000) errors.members = "Too long characters."
  if(channel && channel.length > 1000) errors.channel = "Too long characters."
  if(refferedBy && refferedBy.length > 1000) errors.refferedBy = "Too long characters."

  return { errors, isValid: Object.keys(errors).length === 0}
}

module.exports = {
  createValidator
}
