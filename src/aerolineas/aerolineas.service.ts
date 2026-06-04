import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aerolinea } from './aerolinea.entity';
import { CreateAerolineaDto } from './dto/create-aerolinea.dto';

@Injectable()
export class AerolineasService {
  constructor(
    @InjectRepository(Aerolinea)
    private readonly aerolineaRepository: Repository<Aerolinea>,
  ) {}

  create(createAerolineaDto: CreateAerolineaDto) {
    const aerolinea = this.aerolineaRepository.create(createAerolineaDto);
    return this.aerolineaRepository.save(aerolinea);
  }

  async findAll() {
    const aerolineas = await this.aerolineaRepository.find({ relations: { vuelos: true } });
    return aerolineas.map(a => ({
      ...a,
      total_vuelos: a.vuelos ? a.vuelos.filter(v => v.activo).length : 0,
      vuelos: undefined 
    }));
  }

  async findOne(id: string) {
    const aerolinea = await this.aerolineaRepository.findOne({ where: { id }, relations: { vuelos: true } });
    if (!aerolinea) throw new NotFoundException('Aerolínea no encontrada');
    return aerolinea;
  }

  async remove(id: string) {
    const aerolinea = await this.aerolineaRepository.findOne({ where: { id }, relations: { vuelos: true } });
    if (!aerolinea) throw new NotFoundException('Aerolínea no encontrada');
    if (aerolinea.vuelos && aerolinea.vuelos.length > 0) {
      throw new BadRequestException('No se puede eliminar una Aerolínea con vuelos registrados');
    }
    return this.aerolineaRepository.remove(aerolinea);
  }
}