import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  username: string;

  @IsString()
  photo_url: string;

  @IsString()
  auth_date: string;

  @IsOptional()
  @IsString()
  hash: string;

  @IsOptional()
  @IsNumber()
  turns: number;
}
