import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-gift-card-buy-users',
  templateUrl: './gift-card-buy-users.component.html',
  styleUrls: ['./gift-card-buy-users.component.scss']
})
export class GiftCardBuyUsersComponent {
  tableData:any;
  public pageSize = 10;
  public totalData = 0;
  showFilter = false;
  page: any|1;
  searchText: any;
  alldata:any;
  id: any;
  singledata: any;
  usersdata:any;

  constructor(private api: ApiService ,private route:ActivatedRoute){}

  ngOnInit(){
    this.route.paramMap.subscribe((res:any)=>{
      this.id=res.params.id
    })
  this.buyusers(this.id)
  }

  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    
}


buyusers(data:any){
  this.api.get(`/giftcard/buyusers/${data}`).subscribe(res=>{
    this.usersdata=res;
  });
}

}
