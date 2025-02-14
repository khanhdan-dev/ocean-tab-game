import { IsString, IsOptional, IsNumber, IsObject } from 'class-validator';

class Resources {
  @IsNumber()
  coins: number;

  @IsNumber()
  fish: number;

  @IsNumber()
  shells: number;
}

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  photo_url: string;

  @IsOptional()
  @IsString()
  auth_date: string;

  @IsOptional()
  @IsString()
  hash: string;

  @IsOptional()
  @IsNumber()
  turns: number;

  @IsOptional()
  @IsObject()
  resources: Resources;
}
