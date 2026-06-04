import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vuelo } from '../vuelos/vuelo.entity';

@Entity('aerolineas')
export class Aerolinea {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  nombre?: string;

  @OneToMany(() => Vuelo, (vuelo) => vuelo.aerolinea)
  vuelos?: Vuelo[];
}