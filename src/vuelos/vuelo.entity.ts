import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Aerolinea } from '../aerolineas/aerolinea.entity';

@Entity('vuelos')
export class Vuelo {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ManyToOne(() => Aerolinea, (aerolinea) => aerolinea.vuelos, { eager: true, onDelete: 'RESTRICT' })
  aerolinea?: Aerolinea;

  @Column({ unique: true })
  codigo?: string;

  @Column()
  destino?: string;

  @Column('int')
  duracion_minutos?: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precio_base?: number;

  @Column({ default: true })
  activo?: boolean;
}