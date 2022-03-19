import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Mascota } from 'src/app/models/mascota';
import { MascotaService } from 'src/app/services/mascota.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mascotas-list',
  templateUrl: './mascotas-list.component.html',
  styleUrls: ['./mascotas-list.component.css'],
  providers: [MascotaService]
})
export class MascotasListComponent implements OnInit {
  cssUrl: string;
  mascotas:any= [];
  Mascota : Mascota[];
  router:Router;
  mascotaModel = new Mascota();

  edit: boolean = false;

  constructor(public sanitizer: DomSanitizer, private mascotaService: MascotaService, private activateRoute
    : ActivatedRoute) {
    this.cssUrl = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css';
    
  }

  ngOnInit(): void {
    this.loadMascotas();
    const params= this.activateRoute.snapshot.params;
    if(params.id){
      this.mascotaModel.id=params.id;
      this.mascotaModel.nombre=params.nombre;
      this.mascotaModel.tipo=params.tipo;
      //this.edit=true;
    }
  }

  loadMascotas(): void {
    this.mascotaService.getMascotas().subscribe(
      res=>{
        this.mascotas=res;
        console.log(res)
      },
      err =>console.error(err)
    )
  }
  savePets():void {

    this.mascotaService.saveMascotas(this.mascotaModel).subscribe(
      res=>{
        console.log("Se registro: ",res);
        this.mascotaModel.id="";
        this.mascotaModel.nombre="";
        this.mascotaModel.tipo="";
        Swal.fire({
          icon: 'success',
          title: 'Mascota registrada',
          showConfirmButton: false,
          timer: 1500
        })
        this.loadMascotas();
        
        //this.router.navigate['/listado'];
      },
      err =>console.error(err + "AQUI")
    )
    console.log(this.mascotaModel);
  }

  DeletePet(id:String):void{
    Swal.fire({
      title: '¿Estas seguro de eliminar datos de la mascota?',
      text: "!No podra recuperar su datos!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '!Si, deseo eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mascotaService.deleteMascota(id).subscribe(
          res=>{
            console.log("Se elimino el objeto");
            this.loadMascotas();
            //this.router.navigate['/listado'];
          },
          err =>console.error(err)
        )
        Swal.fire(
          'Eliminado!',
          'Mascota Eliminada!!',
          'success'
        )
      }
    })
    
  }

  updatePet():void {

    this.mascotaService.updateMascota(this.mascotaModel.id, this.mascotaModel).subscribe(
      res=>{
        console.log("Se editara: ",res);
        this.mascotaModel.id="";
        this.mascotaModel.nombre="";
        this.mascotaModel.tipo="";
        Swal.fire({
          icon: 'success',
          title: 'Actualizado mascota',
          showConfirmButton: false,
          timer: 1500
        })
        this.loadMascotas();
      },
      err =>console.error(err)
    )
    console.log(this.mascotaModel);
  }
  

}
