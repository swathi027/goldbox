import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any; // Declare jQuery
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-gift-cards',
  templateUrl: './all-gift-cards.component.html',
  styleUrls: ['./all-gift-cards.component.scss']
})
export class AllGiftCardsComponent {
  alldata:any;
  tableData:any;
  public pageSize = 10;
  public totalData = 0;
  showFilter = false;
  page: any|1;
  searchText: any;
  form: FormGroup;
  submitted = false;
  usersdata:any;
  secondusedusers:any;
  allmerchants:any;
  infodata:any;


  constructor(private api: ApiService,private formBuilder: FormBuilder,private toas:ToastrService){
    this.form = this.formBuilder.group({
      merchant_id: new FormControl('',Validators.required),
      key: new FormControl('',Validators.required),
      amount: new FormControl('',Validators.required),
      quantity:new FormControl('',Validators.required)
    });
   
  }

  ngOnInit(){
    this.getGiftcards();
    this.merchantList();
  }

  getGiftcards(){
    this.api.get(`/giftcard/list`).subscribe(res=>{
      this.alldata=res;
    })
  }

  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.getGiftcards();
}

get f(): { [key: string]: AbstractControl } {
  return this.form.controls;
}

onSubmit(): void {
  this.submitted = true;

  if (this.form.valid) {
    this.api.post(`/giftcard/create`,this.form.value).subscribe(res=>{
      $('#exampleModal').modal('hide');
      this.toas.success('Data added successfully');
      this.form.reset();
      this.submitted=false;
    },err=>{
    })
  }


}


merchantList(){
  this.api.get(`/merchant/list`).subscribe(res=>{
    this.allmerchants=res;

  })
}

info(id:any){
  this.api.get(`/giftcard/${id}`).subscribe(res=>{
    this.infodata=res;

  })
}
}
