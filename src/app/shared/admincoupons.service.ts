import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdmincouponsService {
  serverEndpoint = `${environment.apiUrl}`;

  constructor(private http:HttpClient) { }

  postadmincoupon(data:any){
    const endpoint="/coupon/admin/store"
    return this.http.post(this.serverEndpoint + endpoint,data)
  }


  getmethod(){
    const endpoint="/coupon/admin/list"
    return this.http.get(this.serverEndpoint + endpoint)
  }



  
}
