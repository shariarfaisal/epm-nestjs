import { PasswordUpdateDto } from '../dto/password-update.dto'

export const passwordUpdateValidator = (dto: PasswordUpdateDto) => {
  const errors: any  = {}
  const { oldPassword, newPassword } = dto
  if(!oldPassword) errors.oldPassword = "Old password required."
  if(!newPassword) errors.newPassword = "New password required."
  else if(newPassword.length < 6) errors.newPassword = "New password must be at least 6 characters."

  return {errors, isValid: Object.keys(errors).length === 0}
}
