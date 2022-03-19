import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { MascotasListComponent } from './components/principal/mascotas-list/mascotas-list.component';
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule} from '@angular/forms';

import { MascotaService } from './services/mascota.service';
import { ChatAdopComponent } from './components/principal/chat-adop/chat-adop.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MascotasListComponent,
    FooterComponent,
    ChatAdopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ MascotaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
