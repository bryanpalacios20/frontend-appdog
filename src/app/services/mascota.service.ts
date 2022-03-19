import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Mascota } from 'src/app/models/mascota';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  API_URL:string ='https://appservicesdog.azurewebsites.net';
  
  constructor(private http: HttpClient) { }
  private urlApi = '';

  getMascotas(){
    return this.http.get(`${this.API_URL}/mascotas`);
  }

  getMascota(id : String){
    return this.http.get(`${this.API_URL}/mascotas/${id}`);
  }

  deleteMascota(id : String){
    this.urlApi = `${this.API_URL}/mascotas/${id}`;
    return this.http.delete(this.urlApi);
  }
  
  saveMascotas(mascot: Mascota):Observable<Mascota>{
    return this.http.post<Mascota>(`${this.API_URL}/mascotas`, mascot);
  }

  updateMascota(id : String, updateMascot: Mascota ){
    return this.http.put(`${this.API_URL}/mascotas/${id}`, updateMascot);
  }

}
