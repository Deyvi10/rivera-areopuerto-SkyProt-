import { Module } from '@nestjs/common';
import { AeropuertoController } from './aeropuerto.controller';
import { AeropuertoService } from './aeropuerto.service';

@Module({
  controllers: [AeropuertoController],
  providers: [AeropuertoService]
})
export class AeropuertoModule {}
