import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vuelo } from './vuelo.entity';
import { Aerolinea } from '../aerolineas/aerolinea.entity';
import { CreateVueloDto } from './dto/create-vuelo.dto';

@Injectable()
export class VuelosService {
  constructor(
    @InjectRepository(Vuelo)
    private readonly vueloRepository: Repository<Vuelo>,
    @InjectRepository(Aerolinea)
    private readonly aerolineaRepository: Repository<Aerolinea>,
  ) {}

  async create(createVueloDto: CreateVueloDto) {
    const aerolinea = await this.aerolineaRepository.findOne({ where: { id: createVueloDto.aerolineaId } });
    if (!aerolinea) throw new NotFoundException('Aerolínea no encontrada');

    const vuelo = this.vueloRepository.create({
      ...createVueloDto,
      activo: createVueloDto.activo ?? true,
      aerolinea,
    });
    return this.vueloRepository.save(vuelo);
  }

  findAll(aerolinea?: string, activo?: string, search?: string, sort?: 'ASC' | 'DESC') {
    const qb = this.vueloRepository.createQueryBuilder('vuelo')
      .leftJoinAndSelect('vuelo.aerolinea', 'aerolinea'); 

    if (aerolinea) {
      qb.andWhere('aerolinea.nombre = :aerolinea', { aerolinea });
    }

    if (activo !== undefined) {
      const isActivo = activo === 'true';
      qb.andWhere('vuelo.activo = :activo', { activo: isActivo });
    }

    if (search) {
      qb.andWhere('(vuelo.codigo ILIKE :search OR vuelo.destino ILIKE :search)', { search: `%${search}%` });
    }

    if (sort) {
      qb.orderBy('vuelo.precio_base', sort);
    }

    return qb.getMany();
  }
}