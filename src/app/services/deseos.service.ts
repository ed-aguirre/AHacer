import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { ListaItem } from '../models/lista-item.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  public listas: Lista[]  = [];
  constructor() {
    this.cargarStorage();
   }
   crearLista(Nombrelista: string) {
    const nuevaLista = new Lista( Nombrelista );
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
   }
   guardarStorage() {
     localStorage.setItem('listas', JSON.stringify(this.listas));
   }
   cargarStorage() {
    const listaStorage =  JSON.parse(localStorage.getItem('listas'));
    if (listaStorage == null) {
      const listaPrueba = new Lista( 'Lista de prueba' );
      this.listas.push(listaPrueba);
      return;
    }
    this.listas = listaStorage;
   }
   ObtenerLista( listaId: string | number ) {
      const id = (Number(listaId));
      return this.listas.find( lista => {
        return lista.id === id;
      });
   }
   borrarLista(lista: Lista) {
      this.listas = this.listas.filter(listaData => listaData.id !== lista.id);
      this.guardarStorage();
   }
   editarLista(lista: Lista, ) {
     this.listas.find(listaData => listaData.id === lista.id).titulo = lista.titulo;
     this.guardarStorage();
   }
   editarTarea(lista: Lista, tarea: ListaItem) {
    const listaC = this.listas.find(listaData => listaData.id === lista.id);
    listaC.item.find(data  => data === tarea).descripcion = tarea.descripcion;
    this.guardarStorage();
   }
}
