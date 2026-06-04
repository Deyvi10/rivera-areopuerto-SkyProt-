import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { AeropuertoService } from './aeropuerto.service';
import { LoteEquipajesDto } from './dto/equipajes.dto';

@Controller('aeropuerto')
export class AeropuertoController {
  constructor(private readonly aeropuertoService: AeropuertoService) {}

  
  @Post('equipajes')
  calcularEquipajes(@Body() loteDto: LoteEquipajesDto) {
    return this.aeropuertoService.equipajes(loteDto);
  }


  @Get('pista')
  asignarPista(
    @Query('minutos_disponibles') minutos: string,
    @Query('duraciones') duraciones: string,
  ) {
    return this.aeropuertoService.pista(parseInt(minutos, 10), duraciones);
  }
}