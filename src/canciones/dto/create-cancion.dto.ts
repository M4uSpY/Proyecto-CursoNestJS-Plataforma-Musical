import { IsNumber, IsString } from 'class-validator';

export class CreateCancionDto {
  @IsString()
  titulo: string;

  @IsNumber()
  duracion: number;

  @IsString()
  album: string;

  @IsNumber()
  anioLanzamiento: number;

  @IsNumber()
  reproducciones: number;

  @IsString()
  artista: string;
}
