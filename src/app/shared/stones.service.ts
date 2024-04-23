import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StonesService {
  serverEndpoint = `${environment.apiUrl}`;
  constructor(private Http:HttpClient) { }

  deletestones(id:number){
    const endpoint=`/ecom/productstones/${id}`
    return this.Http.delete(this.serverEndpoint+endpoint)
  }


  
}
