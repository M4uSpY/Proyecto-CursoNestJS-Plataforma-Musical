import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Req,
} from '@nestjs/common';
import { CancionesService } from './canciones.service';
import { CreateCancionDto } from './dto/create-cancion.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { Role } from 'src/auth/enums/rol.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateCancioneDto } from './dto/update-cancion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Endpoints - Canciones')
@Controller('canciones')
export class CancionesController {
  constructor(private readonly cancionesService: CancionesService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Auth(Role.ARTISTA)
  @Post()
  create(@Body() createCancionDto: CreateCancionDto, @Req() req) {
    return this.cancionesService.create(createCancionDto, req.user.email);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Auth(Role.ADMIN)
  @Get()
  findAll() {
    return this.cancionesService.findAll();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Auth(Role.ADMIN)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCancioneDto: UpdateCancioneDto,
  ) {
    return this.cancionesService.update(+id, updateCancioneDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Auth(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cancionesService.remove(+id);
  }
}
