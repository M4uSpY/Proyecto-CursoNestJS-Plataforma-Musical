import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artistas')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  // Listar todos los artistas
  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  // Listar artista por id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistsService.findOne(+id);
  }

  // Actualizar una cancion
  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.update(+id, updateArtistDto);
  }

  // Eliminar un artista
  // (Falta decorador Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistsService.remove(+id);
  }
}
