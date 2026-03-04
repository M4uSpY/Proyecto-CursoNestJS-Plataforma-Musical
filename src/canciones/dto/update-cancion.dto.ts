import { PartialType } from '@nestjs/swagger';
import { CreateCancionDto } from './create-cancion.dto';

export class UpdateCancioneDto extends PartialType(CreateCancionDto) {}
