import { IsOptional, IsString, IsNotEmpty } from 'class-validator'

export class SignupDto{
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  contact: string;

  @IsNotEmpty()
  @IsString()
  password: string;

}
