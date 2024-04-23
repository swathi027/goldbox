import { Component, OnInit ,ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import {FormControl, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-buy-gold',
  templateUrl: './buy-gold.component.html',
  styleUrls: ['./buy-gold.component.scss']
})
export class BuyGoldComponent {
  initChecked = false;
  isChecked = true;
  // pagination variables
  public pageSize = 10;
  public totalData = 0;
  showFilter = false;

  public searchDataValue = '';
  public initialresponse: any;
  tableData: any;
  page: any|1;
  searchText: any;
  postdata: any;
  countries: any;
  editform: any;
  editdata: any;

  constructor(private api: ApiService,private toas:ToastrService,private formBuilder: FormBuilder,) {
    this.postdata=this.formBuilder.group({
      wallet_type: ['', Validators.required],
      content: ['', Validators.required],
      explanation: ['', Validators.required],
    })

    this.editform=this.formBuilder.group({
      wallet_type: ['', Validators.required],
      content: ['', Validators.required],
      explanation: ['', Validators.required],
    }) 

  }
  

ngOnInit(){
  this.contentlist();
}

contentlist(){
  this.api.get(`/digital-wallet-content`).subscribe((res:any)=>{
    this.tableData=res.message;
  })
}

// post content
onSubmit(): void {
  this.api.post('/digital-wallet-content/add/',this.postdata.value).subscribe((res:any)=>{
    this.toas.success(res.message);
    this.postdata.reset();
    this.contentlist();
    $('#addcontent').modal('hide');

  },
  (error)=>{
  this.toas.error(error.error.message)
  })
}

//Update category
updatecontentstatus(table: any) {
  var data = {
        status: table.status
      };
  this.api.post(`/digital-wallet-content/status/${table.id}`, data).subscribe(
    (res: any) => {
      this.toas.success(res.message);
      this.contentlist(); // Assuming you have a method to refresh the categories list
    },
    (error) => {
      console.error('Error Updating Content:', error);
    }
  );
}

//singledata
singledata(id:any){
  this.api.get(`/digital-wallet-content/${id}`).subscribe((res: any) => {
    this.editdata=res.message;
    this.editform.patchValue({
      wallet_type: this.editdata.wallet_type,
      content: this.editdata.content,
      explanation: this.editdata.explanation,
    });
  })
}

//edit content
editSubmit(){
  this.api.post(`/digital-wallet-content/update/${this.editdata.id}`,this.editform.value).subscribe((res:any)=>{
    this.toas.success(res.message);
    this.editform.reset();
    this.contentlist();
    $('#editcontent').modal('hide');

  },
  (error)=>{
  this.toas.error(error.error.message)
  })
}

//modal refresh
refresh(){
  this.postdata.get('wallet_type')?.reset();
  this.postdata.get('content')?.reset();
  this.postdata.get('explanation')?.reset();
}

//Pagination
pageChanged(pageNumber: number) {
  this.page = pageNumber;
  this.contentlist();
}
}
