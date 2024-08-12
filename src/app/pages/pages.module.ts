import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { GoogleMapsModule } from '@angular/google-maps';



@NgModule({
  declarations: [
    HomeComponent,
    PerfilComponent
  ],

  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    FormsModule,
    YouTubePlayerModule,
    GoogleMapsModule
  ]
})
export class PagesModule { }
