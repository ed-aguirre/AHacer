import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    ListasComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PipesModule
  ],
  exports: [
    ListasComponent
  ]
})
export class ComponentsModule { }
