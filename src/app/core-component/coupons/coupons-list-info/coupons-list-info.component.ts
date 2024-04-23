import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-coupons-list-info',
  templateUrl: './coupons-list-info.component.html',
  styleUrls: ['./coupons-list-info.component.scss']
})
export class CouponsListInfoComponent {
  userid: any;
  alldata:any;
  userData: any;
  totaldata:any;
  singlecoupon: any;
  filercoupon: any;
  tableData:any;
  public pageSize = 10;
  public totalData = 0;
  showFilter = false;
  page: any|1;
  searchText: any;
  

  constructor(private route:ActivatedRoute,private api: ApiService,){}


  ngOnInit(){
    this.route.paramMap.subscribe((res:any)=>{
      this.userid=res.params.id;
    })
   this.getinfodata(this.userid)
   this. getfestivalcoupons();
  }
  getinfodata(id:any){
    this.api.get(`/coupon/festivals/users/${id}`).subscribe((res: any)=>{
      this.alldata=res;
      this.userData = this.alldata.message[0].userdetails
    })
  }
  getfestivalcoupons() {
    this.api.get(`/coupon/festivals`).subscribe((res: any) => {
      this.totaldata = res;
      this.filercoupon=this.totaldata.message.filter((a:any)=>a.id==this.userid)
      this.singlecoupon=this.filercoupon[0].coupon
      
    })
  }
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.getfestivalcoupons();
}
}
