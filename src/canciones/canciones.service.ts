import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCancionDto } from './dto/create-cancion.dto';
import { UpdateCancioneDto } from './dto/update-cancion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancion } from './entities/cancion.entity';
import { Repository } from 'typeorm';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class CancionesService {
  constructor(
    @InjectRepository(Cancion) private cancionRepository: Repository<Cancion>,
    private readonly artistaService: ArtistsService,
  ) {}

  async create(createCancionDto: CreateCancionDto) {
    const artista = await this.artistaService.findByName(
      createCancionDto.artista,
    );

    const cancion = this.cancionRepository.create({
      ...createCancionDto,
      artista,
    });

    return await this.cancionRepository.save(cancion);
  }

  async findAll() {
    return await this.cancionRepository.find();
  }

  async findOne(id: number) {
    const cancion = await this.cancionRepository.findOne({ where: { id } });
    if (!cancion) {
      throw new NotFoundException(`Cancion con id ${id} no encontrado`);
    }
    return cancion;
  }

  update(id: number, updateCancioneDto: UpdateCancioneDto) {
    return `This action updates a #${id} cancione`;
  }

  async remove(id: number) {
    const result = await this.cancionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cancion con id ${id} no encontrado`);
    }
    return { message: `Cancion con id ${id} eliminado correctamente` };
  }
}
