import { IsEnum, IsNumber, IsString } from 'class-validator';
import { Role } from 'src/auth/enums/rol.enum';

export class CreateArtistDto {
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

  @IsString()
  email: string;

  @IsString()
  password: string;
}
