import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';

@Controller('artistas')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  // GET /artistas → Listar todos los artistas
  @UseGuards(AuthGuard, RolesGuard)
  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  // OBTENER MIS CANCIONES
  @UseGuards(AuthGuard, RolesGuard)
  @Auth(Role.ARTISTA)
  @Get('mis-canciones')
  misCanciones(@Req() req) {
    return this.artistsService.getMisCanciones(req.user.email);
  }

  // GET /artistas/:id → Obtener un artista por id
  @UseGuards(AuthGuard, RolesGuard)
  @Auth(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistsService.findOne(+id);
  }

  // PUT /artistas/:id → Actualizar un artista
  @UseGuards(AuthGuard, RolesGuard)
  @Auth(Role.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.update(+id, updateArtistDto);
  }

  // DELETE /artistas/:id → Eliminar un artista (solo admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistsService.remove(+id);
  }
}
