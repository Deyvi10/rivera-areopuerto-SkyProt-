import { IsString } from 'class-validator';

export class CreateAerolineaDto {
  @IsString()
  nombre?: string;
}