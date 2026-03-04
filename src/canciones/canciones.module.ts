import { Module } from '@nestjs/common';
import { CancionesService } from './canciones.service';
import { CancionesController } from './canciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancion } from './entities/cancion.entity';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cancion]), ArtistsModule],
  controllers: [CancionesController],
  providers: [CancionesService],
  exports: [CancionesService],
})
export class CancionesModule {}
