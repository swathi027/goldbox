import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-otp-list',
  templateUrl: './otp-list.component.html',
  styleUrls: ['./otp-list.component.scss']
})
export class OtpListComponent {
  public pageSize = 10;
  public totalData = 0;
  showFilter = false;
  page: any|1;
  searchText: any;
  tableData:any;

  constructor(private api: ApiService){}

  ngOnInit(){
    this.getOtpList()
  }

  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    
}


getOtpList(){
  this.api.get(`/otp`).subscribe(res=>{
    this.tableData=res;
  })
}


}
