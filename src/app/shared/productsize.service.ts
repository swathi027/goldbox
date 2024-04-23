import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductsizeService {
  serverEndpoint = `${environment.apiUrl}`;

  constructor(private Http:HttpClient) { }

  deletesize(id:any){
    const endpoint=`/ecom/productsizes/${id}`
    return this.Http.delete(this.serverEndpoint+endpoint)
  }




}
