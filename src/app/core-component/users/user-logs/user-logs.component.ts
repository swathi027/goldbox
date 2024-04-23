import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-logs',
  templateUrl: './user-logs.component.html',
  styleUrls: ['./user-logs.component.scss']
})
export class UserLogsComponent {
  fileName= 'User-Logs.xlsx';
  tableData:any;
  public pageSize = 10;
  public tablesize = 10;
  public totalData = 0;
  showFilter = false;
  page: any|1;
  searchText: any;
  form: any;
date: any;
value = 'Clear me'
  filterform:any;
  allTransaction: any;
  fristdata: any;
  alldata: any;
  filterdata: any;
  constructor(private router: ActivatedRoute,private fb: FormBuilder,private api: ApiService,private toaster:ToastrService) {
    this.form = this.fb.group({
      pepperoni: [false]  // Initial value of the checkbox
    });
    this.form.get('pepperoni').valueChanges.subscribe((value: any) => {
      if (value === true) {
        this.tablesize = this.tableData.length;
        this.page = 1;
      } else {
        this.tablesize = 10;
        this.page = 1;
      }
    });
  }
  ngOnInit(){
    this.alllogs();

  }


  pageChanged(pageNumber: number) {
    this.page = pageNumber;
   
}

// export
exportexcel1(): void
{
  /* pass here the table id */
  let element = document.getElementById('datatableexamples');
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */  
  XLSX.writeFile(wb, this.fileName);
  this.toaster.success("Excel sheet downloaded");
}

alllogs(){
  const id = this.router.snapshot.paramMap.get('id');

  this.api.get(`/users/login/tracking/${id}`).subscribe((res:any)=>{
    this.tableData=res.message;

  })
}

}