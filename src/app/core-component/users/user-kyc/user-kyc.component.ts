import { Component } from '@angular/core';
import { er } from '@fullcalendar/core/internal-common';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-kyc',
  templateUrl: './user-kyc.component.html',
  styleUrls: ['./user-kyc.component.scss']
})
export class UserKycComponent {
  public pageSize = 10;
  public totalData = 0;
  showFilter = false;
  page: any|1;
  searchText: any;

  public searchDataValue = '';
 
  tableData:any;
  userid: any;
  aadharimage: any;
  panimage: any;

  constructor(private api: ApiService,private toas:ToastrService,){}

  ngOnInit(){
    this.getusers();
  }


  getusers(){
    this.api.get(`/users/userKyc`).subscribe(res=>{
      this.tableData=res;
    },err=>{
    })
  }

  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.getusers();
}

singleimg(data:any){
  this.aadharimage=data.aadhaar_card_photo


}
pansingleimg(data:any){
  this.panimage=data.pan_card_photo
  
}
updatestatus(table:any) {

  const data = {
    gc_scheme: table.gc_scheme
  };
 
  this.api.post(`/users/kyc/${table.user_id}`, data).subscribe(
    (res: any) => {
      this.toas.success(res.message);
      this.getusers();
    },
    (error) => {
      console.error('Error updating scheme:', error);
    }
  );
}

}
