import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/core/service/payment/payment.service';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-scheme-user-info',
  templateUrl: './scheme-user-info.component.html',
  styleUrls: ['./scheme-user-info.component.scss']
})
export class SchemeUserInfoComponent {
  initChecked = false;
  isChecked = true;
  // pagination variables
  public pageSize = 12;
  public totalData = 0;
  showFilter = false;
  public searchDataValue = '';

myControl: any;
  page:any=1;
  tableData: any;
searchText: any;
  subscribedata: any;
  transactiondata: any;
  livesellprice22: any;
  constructor(private razorpay:PaymentService,private api: ApiService,private toas:ToastrService,private router: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.subscribedetails();
    this.liveprices()
  }

  // Subscribed user details
  subscribedetails(){
    const id = this.router.snapshot.paramMap.get('id');
    this.api.get(`/schemes/user-info/${id}`).subscribe((res: any) => {
    this.subscribedata=res.message[0];
    this.userinstalments(id)
    })
  }

  // Intalment Details
  userinstalments(id:any){
  
    this.api.get(`/schemes/user-installments/${id}?page=${this.page}`).subscribe((res: any) => {
      this.tableData=res.message;
      })
  }

  // Transaction Details
  transactions(id:any){
    this.api.get(`/schemes/user-transcations/${id}`).subscribe((res: any) => {
      this.transactiondata=res.message;
    })
  }

  // 
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    const id = this.router.snapshot.paramMap.get('id');
    this.userinstalments(id);
   }

   liveprices(){
    this.api.get('/global/price/list').subscribe((res:any)=>{
      this.livesellprice22=res.carat22.message.sell_price_per_gram;
    })
   }

   payemi(table:any){
    const user_scheme_id = table.id
    const user_id=table.user_id
    const live_price= this.livesellprice22
    const amount=table.amount
    this.razorpay.paySchemeWithRazor(user_scheme_id,user_id,live_price,amount)
   }
   reciept(id:any){
    this.api.get(`/users/transaction/pdf/${id}`,{responseType: 'blob'}).subscribe((r: any) => {
      saveAs(new Blob([r], {type: 'application/pdf'}), `transaction-${id}.pdf`);
    });
  }
}
