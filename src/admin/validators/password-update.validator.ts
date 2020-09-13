import { PasswordUpdateDto } from '../dto/password-update.dto'

export const updatePasswordValidator = ({ oldPassword, newPassword}: PasswordUpdateDto) => {
  const errors: any = {}

  if(!oldPassword) errors.oldPassword = "Old Password required."

  if(!newPassword) errors.newPassword = "New Password required."
  else if(newPassword.length < 6) errors.newPassword = "New password should be atlease 6 characters."

  return {errors, isValid: Object.keys(errors).length === 0}
}
