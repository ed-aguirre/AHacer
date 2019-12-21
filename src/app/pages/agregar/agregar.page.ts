import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  lista: Lista;
  nombreItem: string;
  constructor(private deseosServices: DeseosService,
              private router: ActivatedRoute,
              private alertController: AlertController
    ) {
    const listaId = this.router.snapshot.paramMap.get('listaId');
    this.lista = this.deseosServices.ObtenerLista(listaId);
   }

  ngOnInit() {
  }
  agregarItem() {
    // tslint:disable-next-line: curly
    if ( this.nombreItem.length === 0 )
      return;
    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.item.push(nuevoItem);
    this.nombreItem = '';
    this.deseosServices.guardarStorage();
  }
  cambiocheck(tarea: ListaItem) {
    const pendientes  = this.lista.item.filter(item => item.completado === false).length;
    if ( pendientes === 0) {
      this.lista.completada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.completada = false;
      this.lista.terminadaEn = null;
    }
    this.deseosServices.guardarStorage();
    console.log(this.deseosServices.listas);
  }
  borrar(i: number) {
    this.lista.item.splice(i, 1);
    this.deseosServices.guardarStorage();
  }

  async editarTarea(lista: Lista, tarea: ListaItem) {
    const alert = await this.alertController.create({
      header: 'Editar tarea',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: tarea.descripcion,
          placeholder: 'Descripción de la tarea'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Guardar',
          handler: (data: any) => {
            // tslint:disable-next-line: curly
            if (data.length === 0) return;
            tarea.descripcion = data.titulo;
            this.deseosServices.editarTarea(lista, tarea);
          }
        }
      ]
    });

    await alert.present();
  }

}
