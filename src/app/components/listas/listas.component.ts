import { Component, OnInit, Input } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss']
})
export class ListasComponent implements OnInit {
  @Input() tipo: string;
  ngOnInit(): void {
  }
  constructor(
    public deseosSevices: DeseosService,
    public alertController: AlertController,
    private  router: Router
  ) {
  }
  listaSeleccionada(lista: Lista) {
    let tipo = '';
    switch (this.tipo) {
      case 'por hacer':
        tipo = 'tab1';
        break;
      case 'haciendo':
        tipo = 'tab2';
        break;
      case 'terminado':
        tipo = 'tab3';
        break;
        default:
          tipo = 'tab1';
    }
    this.router.navigateByUrl('/tabs/' +  tipo + '/agregar/' + lista.id);
  }

  borrarLista(lista: Lista) {
    this.deseosSevices.borrarLista(lista);
  }

  async editarLista(lista: Lista) {
    const alert = await this.alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
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
            lista.titulo = data.titulo;
            this.deseosSevices.editarLista(lista);
          }
        }
      ]
    });

    await alert.present();
  }
}
