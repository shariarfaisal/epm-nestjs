import { SignupDto } from '../dto/signup.dto'
import  validator from 'validator'


export const signupValidator = ({  username, contact,  email, password }: SignupDto) => {
  const errors:any = {}

  if(!username) errors.username = "Username required."
  else if(username.length < 2) errors.username = "Username must be at lease 3 characters."
  else if(username.length > 55) errors.username = "Username isn't allowed upto 55 characters."

  if(!email) errors.email = "Email required."
  else if(!validator.isEmail(email)) errors.email = "Email isn't valid."

  if(!password) errors.password = "Password required."
  else if(password.length < 6) errors.password = "Password must be at least 6 characters."

  if(contact && contact.length > 20) errors.contact = "Contact characters too long, it seems like invalid contact number."


  return { errors, isValid: Object.keys(errors).length === 0}
}
