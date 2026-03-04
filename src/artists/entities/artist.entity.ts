import { Role } from 'src/auth/enums/rol.enum';
import { Cancion } from 'src/canciones/entities/cancion.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Artist {
  @Column({ primary: true, generated: true })
  id: number;

  @Column({ length: 255, nullable: false })
  nombre: string;

  @Column({ length: 255, nullable: false })
  pais: string;

  @Column({ length: 255, nullable: false })
  genero: string;

  @Column({ nullable: false })
  anioDebut: number;

  @Column({ type: 'enum', enum: Role, default: Role.ARTISTA })
  rol: Role;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  // 1:Artista --> N:Canciones
  @OneToMany(() => Cancion, (cancion) => cancion.artista)
  canciones: Cancion[];
}
