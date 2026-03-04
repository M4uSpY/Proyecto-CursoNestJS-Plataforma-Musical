import { Injectable } from '@nestjs/common';
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
    return await this.artistRepository.find();
  }

  async findOne(id: number) {
    return await this.artistRepository.findOneBy({ id });
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    await this.artistRepository.update(id, updateArtistDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.artistRepository.delete(id);
    return {
      message: `Artista con el id ${id} ha sido eliminado correctamente`,
    };
  }
}
