import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SetRutinasComponent } from './backend/set-rutinas/set-rutinas.component';
import { SetProductosComponent } from './backend/set-productos/set-productos.component';
import { SetComentariosComponent } from './backend/set-comentarios/set-comentarios.component';
import { PerfilComponent } from './pages/perfil/perfil.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'set-rutinas', component: SetRutinasComponent },
  { path: 'set-productos', component: SetProductosComponent },
  { path: 'set-comentarios', component: SetComentariosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '', component:HomeComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
