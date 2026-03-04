import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(artist);
  }

  async findAll() {
    return await this.artistRepository.find({
      relations: ['canciones'],
    });
  }

  async findOne(id: number) {
    const artista = await this.artistRepository.findOne({
      where: { id },
      relations: ['canciones'],
    });
    if (!artista) {
      throw new NotFoundException(`Artista con id ${id} no encontrado`);
    }
    return artista;
  }

  async findByName(nombre: string) {
    const artista = await this.artistRepository.findOneBy({ nombre });
    if (!artista) {
      throw new NotFoundException(`Artista con nombre ${nombre} no encontrado`);
    }
    return artista;
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    const artista = await this.findOne(id);
    this.artistRepository.update(artista, updateArtistDto);
    return await this.artistRepository.save(artista);
  }

  async remove(id: number) {
    const result = await this.artistRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Artista con id ${id} no encontrado`);
    }
    return { message: `Artista con id ${id} eliminado correctamente` };
  }

  async findOneByEmail(email: string) {
    return await this.artistRepository.findOneBy({ email });
  }
}
