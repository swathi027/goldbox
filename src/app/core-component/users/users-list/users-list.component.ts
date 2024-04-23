import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any; // Declare jQuery
import { PaymentService } from 'src/app/core/service/payment/payment.service';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  form: FormGroup;
  submitted = false;
  tableData:any;
  public pageSize = 10;
  public totalData = 0;
  showFilter = false;
  page: any|1;
  searchText: any;
  infosingledata: any;
  userid: any;
  myid: any;
  infouserData:any;
  userdata: any;
  livesellprice24: any;

  constructor(private razorpay :PaymentService ,private toas:ToastrService,private api: ApiService,private formBuilder: FormBuilder){
    this.form = this.formBuilder.group({
      terminate_reason: new FormControl('',Validators.required),
     
    });
  
  }
  ngOnInit(){
    this.getallusers();

  }

  getallusers(){
    this.api.get(`/users`).subscribe(res=>{
      this.tableData=res;
      
    })
  }
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.getallusers();
}

updatestatus(status:any,data:any){
  this.myid=data.id

  if(status==true){
    this.api.post(`/users/activate/${data.id}`,data).subscribe((res:any)=>{
      this.toas.success(res.message)
      this.getallusers();
    })
  }else{
    $('#exampleModal').modal('show');
   
  }


}

get f(): { [key: string]: AbstractControl } {
  return this.form.controls;
}

onSubmit(): void {
  this.submitted = true;
  if (this.form.valid) {
    this.api.post(`/users/terminate/${this.myid}`,this.form.value).subscribe((res:any)=>{
      this.toas.success(res.message)
      $('#exampleModal').modal('hide');
      this.form.reset();
      this.submitted=false;
      this.getallusers();
    })
  }

}

infodata(id:any){
  this.api.get(`/users/info/${id}`).subscribe(res=>{
    this.infouserData=res;
  })
}
closepopup(){
  $('#exampleModall').modal('hide');
}





}



