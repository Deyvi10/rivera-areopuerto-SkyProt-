import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { AerolineasService } from './aerolineas.service';
import { CreateAerolineaDto } from './dto/create-aerolinea.dto';

@Controller('aerolineas')
export class AerolineasController {
  constructor(private readonly aerolineasService: AerolineasService) {}

  @Post()
  create(@Body() createAerolineaDto: CreateAerolineaDto) {
    return this.aerolineasService.create(createAerolineaDto);
  }

  @Get()
  findAll() {
    return this.aerolineasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aerolineasService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aerolineasService.remove(id);
  }
}