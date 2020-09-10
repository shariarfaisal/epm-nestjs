import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateDto{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  tokenName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  symbol: string;

  @IsNotEmpty()
  @IsString()
  tokenDecimal: string;

  @IsNotEmpty()
  @IsString()
  tokenContract: string;

  @IsNotEmpty()
  @IsString()
  websiteLink: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  logoLink: string;

  @IsNotEmpty()
  @IsString()
  exchange: string;

  @IsOptional()
  @IsString()
  twitter: string;

  @IsOptional()
  @IsString()
  telegram: string;

  @IsOptional()
  @IsString()
  chat: string;

  @IsOptional()
  @IsString()
  reddit: string;

  @IsOptional()
  @IsString()
  member: string;

  @IsOptional()
  @IsString()
  channel: string;

  @IsOptional()
  @IsString()
  refferedBy: string;
}
