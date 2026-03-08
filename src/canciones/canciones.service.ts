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

  async create(createCancionDto: CreateCancionDto, email: string) {
    const artista = await this.artistaService.findOneByEmail(email);

    if (!artista) {
      throw new NotFoundException('Artista no encontrado');
    }
    const cancion = this.cancionRepository.create({
      ...createCancionDto,
      artista,
    });
    return await this.cancionRepository.save(cancion);
  }

  async findAll() {
    return await this.cancionRepository.find();
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
