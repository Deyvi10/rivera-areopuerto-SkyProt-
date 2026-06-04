import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EquipajeDto {
  @IsString()
  pasajero?: string;

  @IsNumber()
  peso_kg?: number;
}

export class LoteEquipajesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EquipajeDto)
  equipajes?: EquipajeDto[];
}