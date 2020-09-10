import { IsOptional, IsString, IsNotEmpty } from 'class-validator'

export class UpdateDto{
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  contact: string;

}
