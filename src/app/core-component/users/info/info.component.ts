import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { PaymentService } from 'src/app/core/service/payment/payment.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  customerid: any;
  tableData:any;
  singlgdata: any;
  submitted = false;
  infouserData:any;
  livesellprice24: any;
  buyform: any;
  enteredGrams: any;
  totalamount: any;
  goldvalue: any;

  constructor(private toaster:ToastrService,private razorpay :PaymentService,private formBuilder: FormBuilder,private route:ActivatedRoute,private api: ApiService){
    this.buyform = this.formBuilder.group({
      grams: new FormControl('',[Validators.required,Validators.max(30)]),
      amount: new FormControl('',[Validators.required, Validators.min(100), Validators.maxLength(10)]),
     
    });
  }

  ngOnInit(){
    this.route.paramMap.subscribe((res:any)=>{
    this.customerid=res.params.id;
    this.getuserinfo(this.customerid)
    })
    this.getallusers();
    this.liveprices();
  }

  getallusers(){
    this.api.get(`/users`).subscribe(res=>{
      this.tableData=res;
      this.singlgdata=this.tableData.message.filter((a:any)=>a.customer_id == this.customerid)
    })
  }

  getuserinfo(id:any){
    this.api.get(`/users/info/${id}`).subscribe(res=>{
      this.infouserData=res;

    })
  }

  buygold(){
    if(!this.buyform.get('amount').value || !this.buyform.get('grams').value){
      this.toaster.error('All fields are required');
      return;
    }
    if (this.buyform.get('amount').value < 100) {
      this.toaster.error('Minimum amount should be 100 rupees');
      return;
    }
    if(this.buyform.get('grams').value > 30){
      this.toaster.error('You have exceeded the max limit of 30 grams per transaction');
      return;
    }
    const amount = this.buyform.get('amount').value;
    const grams=this.buyform.get('grams').value;
    this.razorpay.buygold(amount,grams,this.livesellprice24,this.infouserData.message[0].id)
  }
  liveprices(){
    this.api.get('/global/price/list').subscribe((res:any)=>{
      this.livesellprice24=res.carat24.message.sell_price_per_gram;
  
    })
   }
   onGramsChange(event: Event) {
    this.enteredGrams = (event.target as HTMLInputElement).value;
    this.totalamount=Math.round(this.livesellprice24*this.enteredGrams)
    this.buyform.get('amount')?.patchValue(this.totalamount);
  }
  onAmountChange(event: Event) {
    this.totalamount = (event.target as HTMLInputElement).value;
    this.goldvalue = (this.totalamount / this.livesellprice24).toFixed(3);
    this.buyform.get('grams')?.patchValue(this.goldvalue);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.buyform.controls;
  }
 
}
