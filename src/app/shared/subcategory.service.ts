import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  serverEndpoint = `${environment.apiUrl}`;

  constructor(private Http:HttpClient) { }

  deletesubcatagory(id:number){
    const endpoint=`/ecom/subcategories/${id}`
    return this.Http.delete(this.serverEndpoint+endpoint)
  }
}
