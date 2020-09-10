import { PasswordUpdateDto } from '../dto/password-update.dto'

export const passwordUpdateValidator = (dto: PasswordUpdateDto) => {
  const errors: any  = {}

  const { oldPassword, newPassword } = dto

  if(!oldPassword) errors.oldPassword = "Old Password required."
  if(!newPassword) errors.newPassword = "New Password required."
  else if(newPassword && newPassword.length < 6) errors.newPassword = "New Password must be atleast 6 characters."

  return {errors, isValid: Object.keys(errors).length === 0}
}
