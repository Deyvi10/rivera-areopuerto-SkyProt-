import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { VuelosService } from './vuelos.service';
import { CreateVueloDto } from './dto/create-vuelo.dto';

@Controller('vuelos')
export class VuelosController {
  constructor(private readonly vuelosService: VuelosService) {}

  @Post()
  create(@Body() createVueloDto: CreateVueloDto) {
    return this.vuelosService.create(createVueloDto);
  }

  @Get()
  findAll(
    @Query('aerolinea') aerolinea?: string,
    @Query('activo') activo?: string,
    @Query('search') search?: string,
    @Query('sort') sort?: 'ASC' | 'DESC',
  ) {
    return this.vuelosService.findAll(aerolinea, activo, search, sort);
  }
}