import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EcomtransactionsService {
  serverEndpoint = `${environment.apiUrl}`;


  constructor(private Http:HttpClient) { }
  

  getdata(){
    const endpoint=`/ecom/transactions`
    return this.Http.get(this.serverEndpoint+endpoint)
  }

  
}
