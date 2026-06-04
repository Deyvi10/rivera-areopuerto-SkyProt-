import { IsString, IsUUID, IsInt, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateVueloDto {
  @IsUUID()
  aerolineaId?: string;

  @IsString()
  codigo?: string;

  @IsString()
  destino?: string;

  @IsInt()
  duracion_minutos?: number;

  @IsNumber()
  precio_base?: number;

  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}