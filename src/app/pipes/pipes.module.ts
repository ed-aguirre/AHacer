import { NgModule } from '@angular/core';
import { FiltroListaPipe } from './filtro-lista.pipe';



@NgModule({
  declarations: [FiltroListaPipe],
  exports: [FiltroListaPipe]
})
export class PipesModule { }
