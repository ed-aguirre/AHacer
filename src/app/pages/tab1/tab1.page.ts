import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  constructor(
              public deseosSevices: DeseosService,
              public alertController: AlertController,
              private router: Router
    ) {
      }
  async AgregarLista() {
    const alert = await this.alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
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
          text: 'Crear',
          handler: (data: any) => {
            // tslint:disable-next-line: curly
            if (data.length === 0) return;
            const nuevaListaId = this.deseosSevices.crearLista(data.titulo);
            this.router.navigateByUrl('/tabs/tab1/agregar/' + nuevaListaId);
          }
        }
      ]
    });

    await alert.present();
  }

}
