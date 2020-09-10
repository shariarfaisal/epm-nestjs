import { SigninDto } from '../dto/signin.dto'
import validator from 'validator'

export const signinValidator = (dto: SigninDto) => {
  const errors: any  = {}
  const { email, password } = dto

  if(!email) errors.email = "Email required."
  else if(!validator.isEmail(email)) errors.email = "Email isn't valid."

  if(!password) errors.password = "Password required."

  return {errors, isValid: Object.keys(errors).length === 0}
}
