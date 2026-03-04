import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { Role } from './enums/rol.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly artistService: ArtistsService,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    nombre,
    pais,
    genero,
    anioDebut,
    email,
    password,
  }: RegisterDto) {
    const artist = await this.artistService.findOneByEmail(email);

    if (artist) {
      throw new NotFoundException('Artista ya existe');
    }

    const hashPassword = await bcryptjs.hash(password, 10);

    const roleValue =
      typeof arguments[0].role === 'string' && arguments[0].role
        ? arguments[0].role
        : Role.ARTISTA;

    await this.artistService.create({
      nombre,
      pais,
      genero,
      anioDebut,
      rol: roleValue,
      email,
      password: hashPassword,
    });
    return {
      nombre,
      email,
    };
  }

  async login({ email, password }) {
    const artista = await this.artistService.findOneByEmail(email);
    if (!artista) {
      throw new NotFoundException('no encontrado');
    }
    const isPasswordValid = await bcryptjs.compare(password, artista.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Contraseña incorrecta');
    }

    const payload = { email: artista.email, role: artista.rol };

    const token = await this.jwtService.signAsync(payload);

    return {
      name: artista.nombre,
      email: artista.email,
      rol: artista.rol,
      token,
    };
  }
}
