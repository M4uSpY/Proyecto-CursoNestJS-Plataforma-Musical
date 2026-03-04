import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';
import { Role } from '../enums/rol.enum';

export class RegisterDto {
  @IsString()
  nombre: string;

  @IsString()
  pais: string;

  @IsString()
  genero: string;

  @IsNumber()
  anioDebut: number;

  @IsEnum(Role)
  rol: Role;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
