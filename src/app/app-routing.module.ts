import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MascotasListComponent } from './components/principal/mascotas-list/mascotas-list.component';

import { ChatAdopComponent } from './components/principal/chat-adop/chat-adop.component';

const routes: Routes = [
  { path: '' , component: HomeComponent},
  { path: 'chat' , component: ChatAdopComponent},
  { path: 'listado' , component: MascotasListComponent},
  { path: 'listado/edit/:id/:nombre/:tipo' , component: MascotasListComponent},
  { path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
