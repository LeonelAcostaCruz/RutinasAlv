import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetRutinasComponent } from './set-rutinas/set-rutinas.component';
import { SetProductosComponent } from './set-productos/set-productos.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SetComentariosComponent } from './set-comentarios/set-comentarios.component';


@NgModule({
  declarations: [
    SetRutinasComponent,
    SetProductosComponent,
    SetComentariosComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class BackendModule { }
