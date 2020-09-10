import { IsOptional } from 'class-validator'

export class GetUserDto{
  @IsOptional()
  search: string;

  @IsOptional()
  limit: number;

  @IsOptional()
  page: number;
}
