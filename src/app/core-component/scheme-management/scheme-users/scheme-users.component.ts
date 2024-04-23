import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-scheme-users',
  templateUrl: './scheme-users.component.html',
  styleUrls: ['./scheme-users.component.scss']
})
export class SchemeUsersComponent {
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
  gc_scheme: boolean | undefined;
  schemsdata: any;
  selectedValue1:any

myControl: any;
  constructor(private api: ApiService,private toas:ToastrService) {

  }
  ngOnInit(): void {
    this.schemeUsers();
    this.schemeslist()
  }
  schemeUsers(){
    this.api.get(`/schemes/users?page=${this.page}`).subscribe((res: any) => {
    this.tableData=res.message;
    })
  }
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.schemeUsers();
}


 // update scheme
updatescheme(table: any) {

  const data = {
    gc_scheme: table.gc_scheme
  };
  this.api.put(`/schemes/update/${table.id}`, data).subscribe(
    (res: any) => {
      this.toas.success(res.message);
      this.schemeUsers();
    },
    (error) => {
      console.error('Error updating scheme:', error);
    }
  );
}

// schemeslist
schemeslist(){
  this.api.get(`/schemes/list?page=${this.page}`).subscribe((res: any) => {
  this.schemsdata=res.message;
  })
}
 

}
