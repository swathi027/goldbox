import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  serverEndpoint = `${environment.apiUrl}`;
  constructor(private Http:HttpClient) { }



  deleteproducts(id:number){
    const endpoint=`/ecom/brands/${id}`
    return this.Http.delete(this.serverEndpoint+endpoint)
  }



}
