import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class UserTransactionsComponent {
  fileName= 'GoldBox-Transactions.xlsx';
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
  trnlogs: any;
  userdetails: any;
  constructor(private router: ActivatedRoute,private fb: FormBuilder,private api: ApiService,private toaster:ToastrService) {

    this.filterform = this.fb.group({
      transactionId: [''],
      mobile: [''],
      start: [''],
      end: [''], // Set default value here
    });
    
    
    this.form = this.fb.group({
      pepperoni: [false]  // Initial value of the checkbox
    });
    this.form.get('pepperoni').valueChanges.subscribe((value: any) => {
      if(value===true){
        this.tablesize=this.tableData.length;
        this.page=1
      }else{
        this.tablesize=10;
        this.page=1
      }
  
    });
  }
  ngOnInit(){
    this.alltransactions();
  }


  pageChanged(pageNumber: number) {
    this.page = pageNumber;
   
}

// export
exportexcel(): void
{
  /* pass here the table id */
  let element = document.getElementById('datatableexample');
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */  
  XLSX.writeFile(wb, this.fileName);
  this.toaster.success("Excel sheet downloaded");
}

alltransactions(){
  const id = this.router.snapshot.paramMap.get('id');

  this.api.get(`/user/transactions/${id}`).subscribe((res:any)=>{
    this.alldata=res.message[0].transactiondetails;
    this.userdetails=res.message[0]
    console.log(this.userdetails)
    this.fristdata=this.alldata;
    this.tableData=this.alldata;
  })
}

filtertransactions() {
  let fromDateValue: string = this.filterform.get('start').value;
  let toDateValue: string = this.filterform.get('end').value;

  // Convert empty string to null for fromDate
  let fromDate: any = fromDateValue ? new Date(fromDateValue) : null;

  // Convert empty string to null for toDate
  let toDate: any = toDateValue ? new Date(toDateValue) : null;

  let tranid = this.filterform.get('transactionId').value;
  let mobile = this.filterform.get('mobile').value;

  // Filter data
  let filteredData = this.fristdata.filter((data: any) => {
    // Extract only the date portion (year, month, day) from the stored date
    const storedDate = new Date(data.created_at).toLocaleDateString('en-CA');

    // Check if both fromDate and toDate are provided and are valid dates
    const isWithinDateRange = (
      (fromDate && toDate) ?
      (storedDate >= fromDate.toLocaleDateString('en-CA') && storedDate <= toDate.toLocaleDateString('en-CA')) : true
    );

    const isMatchingTransactionId = tranid ? data.id === tranid : true;
    const isMatchingMobile = mobile ? data.mobilenumber === mobile.toString() : true;

    return isMatchingTransactionId && isMatchingMobile && isWithinDateRange;
  });

  this.tableData = filteredData; // Assuming tableData is an object with a 'message' property

  if (filteredData.length === 0) {
    this.toaster.error('No results found');
  } else {
    this.toaster.success(`${filteredData.length} Orders filtered`);
  }
}

reciept(id:any){
  this.api.get(`/users/transaction/pdf/${id}`,{responseType: 'blob'}).subscribe((r: any) => {
    saveAs(new Blob([r], {type: 'application/pdf'}), `transaction-${id}.pdf`);
  });
}

transactionlogs(id:any){
this.api.get(`/users/transaction/tracking/${id}`).subscribe((res:any)=>{
  this.trnlogs=res.message
})
}


reset(){
 this.tableData=this.fristdata
}
}