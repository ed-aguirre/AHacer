import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroLista',
  pure: false // para detectar en otro componente
})
export class FiltroListaPipe implements PipeTransform {

  transform(listas: Lista[], tipo: string = 'por hacer'): Lista[] {
    let lista = [];
    switch (tipo) {
      case 'por hacer':
        lista = listas.filter(data => data.completada === false && data.item.filter(tarea => tarea.completado === true ).length <= 0);
        break;
      case 'haciendo':
        lista = listas.filter(data => data.completada === false && data.item.filter(tarea => tarea.completado === true ).length > 0);
        break;
      case 'terminado':
        lista = listas.filter(data => data.completada === true);
        break;
      default:
        lista = listas.filter(data => data.completada === false && data.item.filter(tarea => tarea.completado === true ).length <= 0);
        break;
    }
    console.log(lista);
    return lista;
  }

}
