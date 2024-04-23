import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-gift-card-used-users',
  templateUrl: './gift-card-used-users.component.html',
  styleUrls: ['./gift-card-used-users.component.scss']
})
export class GiftCardUsedUsersComponent {
  public pageSize = 10;
  public totalData = 0;
  showFilter = false;
  page: any|1;
  searchText: any;
  alldata:any;
  singledata:any;
  id: any;
  useduers:any;

  constructor(private route:ActivatedRoute,private api: ApiService){}

  ngOnInit(){
    this.route.paramMap.subscribe((res:any)=>{
      this.id=res.params.id
    })
    this.getUsedUsers(this.id);
  }

  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    
}

getUsedUsers(data:any){
  this.api.get(`/giftcard/usedusers/${data}`).subscribe(res=>{
    this.useduers=res;
  },err=>{
  })
}

  
}
