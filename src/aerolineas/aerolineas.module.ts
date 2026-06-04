import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineasService } from './aerolineas.service';
import { AerolineasController } from './aerolineas.controller';
import { Aerolinea } from './aerolinea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aerolinea])],
  controllers: [AerolineasController],
  providers: [AerolineasService],
  exports: [AerolineasService],
})
export class AerolineasModule {}