import { Artist } from 'src/artists/entities/artist.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Cancion {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 255, nullable: false })
  titulo: string;

  @Column({ nullable: false })
  duracion: number;

  @Column({ length: 255, nullable: false })
  album: string;

  @Column({ nullable: false })
  anioLanzamiento: number;

  @Column({ nullable: false })
  reproducciones: number;

  @ManyToOne(() => Artist, (artista) => artista.canciones)
  @JoinColumn({ name: 'fk_id_artista' })
  artista: Artist;
}
