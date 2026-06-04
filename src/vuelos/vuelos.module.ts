import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VuelosService } from './vuelos.service';
import { VuelosController } from './vuelos.controller';
import { Vuelo } from './vuelo.entity';
import { Aerolinea } from '../aerolineas/aerolinea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vuelo, Aerolinea])],
  controllers: [VuelosController],
  providers: [VuelosService],
})
export class VuelosModule {}