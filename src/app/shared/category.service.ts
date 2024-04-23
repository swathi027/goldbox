import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  serverEndpoint = `${environment.apiUrl}`;

  constructor(private Http:HttpClient) { }

deletecatagory(id:number){
  const endpoint=`/ecom/categories/${id}`
  return this.Http.delete(this.serverEndpoint+endpoint)
}



}
