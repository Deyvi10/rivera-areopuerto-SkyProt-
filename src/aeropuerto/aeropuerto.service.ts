import { Injectable } from '@nestjs/common';
import { LoteEquipajesDto } from './dto/equipajes.dto';

@Injectable()
export class AeropuertoService {
  

  equipajes(loteDto: LoteEquipajesDto) {
    let total_cobro = 0;
    const tarifa_base = 15.00;
    const detalle: any[] = [];

    const listaEquipajes = loteDto.equipajes || [];

    for (const eq of listaEquipajes) {
      const peso_kg = eq.peso_kg || 0;
      let recargo: number;

      if (peso_kg <= 23) {
        recargo = 0.00;
      } else if (peso_kg <= 32) {
        recargo = 30.00;
      } else {
        recargo = 60.00;
      }

      const costo_total = +(tarifa_base + recargo).toFixed(2);
      total_cobro = +(total_cobro + costo_total).toFixed(2);

      detalle.push({
        pasajero: eq.pasajero || 'Desconocido', 
        peso_kg: peso_kg,
        recargo,
        costo_total,
      });
    }

    return {
      total_equipajes: detalle.length,
      total_cobro,
      detalle,
    };
  }


  pista(minutos_disponibles: number, duraciones: string) {
  
    if (!duraciones) {
      return {
        vuelos_asignados: 0,
        minutos_libres: minutos_disponibles,
        detalle: [],
      };
    }

    const lista = duraciones.split(',').map((d) => parseInt(d.trim(), 10));

    let acumulado = 0;
    let indice = 0;
    const agendadas: number[] = [];

    while (indice < lista.length) {
      const duracion_actual = lista[indice] || 0; 

      if (acumulado + duracion_actual <= minutos_disponibles) {
        acumulado += duracion_actual;
        agendadas.push(duracion_actual);
        indice++;
      } else {
        break; 
      }
    }

    return {
      vuelos_asignados: agendadas.length,
      minutos_libres: minutos_disponibles - acumulado,
      detalle: agendadas,
    };
  }

} 