import { SignupDto } from '../dto/signup.dto'
import validator from 'validator'

export const signupValidator = (dto: SignupDto) => {
  const errors: any  = {}

  const {name, email, password, referralId } = dto
  if(!name) errors.name = "Name required."
  else if(name.length < 2) errors.name = "Name must be at lease 3 characters."
  else if(name.length > 55) errors.name = "Name isn't allowed upto 55 characters."

  if(!email) errors.email = "Email required."
  else if(!validator.isEmail(email)) errors.email = "Email isn't valid."

  if(!password) errors.password = "Password required."
  else if(password.length < 6) errors.password = "Password must be at least 6 characters."

  if(referralId && typeof referralId !== 'string') errors.refferalId = "Refferal ID isn't valid."

  return {errors, isValid: Object.keys(errors).length === 0}
}
