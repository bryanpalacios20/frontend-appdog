import { Component, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Mensaje } from 'src/app/models/mensaje';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-chat-adop',
  templateUrl: './chat-adop.component.html',
  styleUrls: ['./chat-adop.component.css']
})
export class ChatAdopComponent implements OnInit {
  cssUrl: string;

  mensaje: Mensaje = new Mensaje();
  private client:Client;
  conectado:boolean =false;
  mensajes: Mensaje[]=[];
  escribiendo: string;

  constructor(public sanitizer: DomSanitizer) {
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
   }

  ngOnInit(): void {
    /*
    this.client= new Client();
    //asignamos el Sock JS al Stomp
    this.client.webSocketFactory =() => {
      return new SockJS("");//pasamos la ruta del backend("http://localhost:8080/chat-websocket");
    }
    
    this.client.onConnect = (frame) =>{//se hace la conexion al broker
      console.log('Conectados : ' + this.client.connected + ' : '+frame);
      this.conectado=true;

      this.client.subscribe('/chat/mensaje', e => {
        let mensaje:Mensaje = JSON.parse(e.body) as Mensaje;// este mensaje se obtiene del backend
        mensaje.fecha = new Date(mensaje.fecha);

        if(!this.mensaje.color && mensaje.tipo=="NUEVO_USUARIO" && this.mensaje.username == mensaje.username){
          this.mensaje.color= mensaje.color;
        }

        this.mensajes.push(mensaje);
        console.log(mensaje.texto);
      });

      this.client.subscribe('/chat/escribiendo', e => {//recibe este evento del back
        this.escribiendo= e.body;
        setTimeout(() => { this.escribiendo=''}, 3000);
      });

      this.mensaje.tipo = "NUEVO_USUARIO";
      this.client.publish({destination: '/app/mensaje', body: JSON.stringify(this.mensaje)});
    }
    
    this.client.onDisconnect = (frame) =>{//se hace la desconexion al broker
      console.log('Desconectados : ' + this.client.connected + ' : '+frame);
      this.conectado=false;
    }*/
  }

  conectar(): void{
    //para conectarnos al servidor
    this.client.activate();

  }

  desconectar(): void{
    this.client.deactivate();
  }

  enviarMensaje(): void{
    this.mensaje.tipo="MENSAJE";
    this.client.publish({destination: '/app/mensaje', body: JSON.stringify(this.mensaje)});
    this.mensaje.texto='';

  }
  escribirEvento(): void{
    this.client.publish({destination: '/app/escribiendo', body: JSON.stringify(this.mensaje.username)});
  }
}
