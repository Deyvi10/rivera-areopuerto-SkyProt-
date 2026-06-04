import { Controller, Get, Post, Body } from '@nestjs/common';
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
  findAll() {
    return this.vuelosService.findAll();
  }
}