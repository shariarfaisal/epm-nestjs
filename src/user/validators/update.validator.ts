import { UpdateDto } from '../dto/user-update.dto'
import validator from 'validator'

export const updateValidator = (dto: UpdateDto) => {
  const errors: any  = {}

  const { name, email } = dto
  if(!name) errors.name = "Name required."
  else if(name.length < 2) errors.name = "Name must be at lease 3 characters."
  else if(name.length > 55) errors.name = "Name isn't allowed upto 55 characters."

  if(!email) errors.email = "Email required."
  else if(!validator.isEmail(email)) errors.email = "Email isn't valid."

  return {errors, isValid: Object.keys(errors).length === 0}
}
