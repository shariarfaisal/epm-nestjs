import { UpdateDto } from '../dto/update.dto'
import validator from 'validator'

export const updateValidator = ({ email, username, contact }: UpdateDto) => {
  const errors: any = {}

  if(!email) errors.email = "Email required."
  else if(!validator.isEmail(email)) errors.email = "Email isn't valid."

  if(!username) errors.username = "Username required."
  else if(username.length < 2) errors.username = "Username must be at lease 3 characters."
  else if(username.length > 55) errors.username = "Username limit 55 characters."

  if(!email) errors.email = "Email required."
  else if(!validator.isEmail(email)) errors.email = "Email isn't valid."

  if(contact && contact.length > 20) errors.contact = "Too long characters, it seems like invalid contact number."

  return { errors, isValid: Object.keys(errors).length === 0}
}
