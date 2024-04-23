import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EComOrdersService {
  serverEndpoint = `${environment.apiUrl}`;

  constructor(private Http:HttpClient) { }



  getdata(order_id:any){
    const endpoint=`ecom/orderinfo/${order_id}`
    return this.Http.get(this.serverEndpoint+endpoint)
  }


  
}
