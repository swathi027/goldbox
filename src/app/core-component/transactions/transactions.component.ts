import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import * as XLSX from 'xlsx';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {saveAs} from 'file-saver';
import { map, startWith } from 'rxjs';
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {

  food: any = [
    {value: 'BU', viewValue: 'Buy'},
    {value: 'TR', viewValue: 'Transfer'},
    {value: 'SL', viewValue: 'Sell'},
    {value: 'CV', viewValue: 'Convert'},
    {value: 'GT', viewValue: 'Gift'},
    {value: 'PR', viewValue: 'Promotion'},
    {value: 'WT', viewValue: 'Withdraw'},
  ];
  trntypes: any = [
    {id: 'CR', name: 'Credict'},
    {id: 'DE', name: 'Debict'},
  ];

  
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
selectedValue: any;
  usersdata: any;
  usersdata0: any;
selectedValue1: any;
selectedValue2: any;
selectedtrtype: any;
  transactionslength: any;
  transactionsUsername: any;
  transactionstype: any;
  transactionsamount: any;
  transactionsgrams: any;
  transactionstrntype: any;
  constructor(private fb: FormBuilder,private api: ApiService,private toaster:ToastrService) {

    this.filterform = this.fb.group({
      transactionId: [''],
      txn_type: [''],
      mobile: [''],
      start: [''],
      trntype: [''],
      userid: [''],
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
    this.getTransactions();
    this.alltransactions();
    // this.getUsersData();
    
  }
  getTransactions(){
    this.api.get(`/transactions`).subscribe(res=>{
      this.tableData=res;

    },err=>{
    })
    }
    getUsersData(): void {
      this.api.get(`/users`).subscribe(
        (res: any) => {
          this.usersdata = res.message;
    console.log(this,this.usersdata0)
          // Example: Filter users and sort alphabetically
          this.filterAndSortUsersByAlphabet();
        },
        (err) => {
        }
      );
    }
    
    filterAndSortUsersByAlphabet(): void {
      // Filter users whose usernames start with any alphabet letter
      this.usersdata = this.usersdata0.filter(
        (user: any) => /^[A-Za-z]/.test(user.name)
      );
    
      // Sort users alphabetically based on their usernames
      this.usersdata.sort((a: any, b: any) => {
        const usernameA = a.name.toUpperCase();
        const usernameB = b.name.toUpperCase();
    
        if (usernameA < usernameB) {
          return -1;
        } else if (usernameA > usernameB) {
          return 1;
        } else {
          return 0;
        }
      });
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
  this.api.get('/alltransactions').subscribe((res:any)=>{
    this.fristdata=res.message
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
  let txn_type = this.filterform.get('txn_type').value;
  let userid = this.filterform.get('userid').value;
  let trntype = this.filterform.get('trntype').value;

   // Initialize total amount to 0
   let totalAmount = 0;
   let totalGrams = 0;
   let secondamountToAdd = 0;

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

    const isMatchingtxn_type = txn_type ? data.txn_type === txn_type : true;
    const isMatchinguserid = userid ? data.user_id === Number(userid) : true;
    const isMatchingtrntype = trntype ? data.type === trntype.toString() : true;

      // If all conditions are met, add the amount to the total
      if (
        isMatchingtrntype && isMatchingMobile && isMatchingTransactionId &&
        isWithinDateRange && isMatchingtxn_type && isMatchinguserid
      ) {
          // Assuming total_amount property is named 'total_amount', modify this accordingly
    const amountToAdd = data.total_amount !== undefined ? data.total_amount : 0;
    const secondamountToAdd = data.amount !== undefined ? data.amount : 0;
    const gramsToAdd = data.grams !== undefined ? data.grams : 0;
    totalAmount += Number(amountToAdd);
    totalGrams += Number(gramsToAdd);
      }


    return  isMatchingtrntype && isMatchingMobile && isMatchingTransactionId && isWithinDateRange && isMatchingtxn_type && isMatchinguserid;
  });
  this.tableData.message = filteredData; // Assuming tableData is an object with a 'message' property
  if (filteredData.length === 0) {
    this.toaster.error('No results found');
    this.transactionslength=0;
    // this.transactionsUsername=filteredData.username;
    // this.transactionstype=filteredData.type;
    this.transactionsgrams=0;
    this.transactionsamount=0;
    this.transactionstrntype = 0;
  } else {
    this.toaster.success(`${filteredData.length} Orders filtered`);
    this.transactionslength=filteredData.length;
    // this.transactionsUsername=filteredData.username;
    // this.transactionstype=filteredData.type;
    this.transactionsgrams=totalGrams;
    if(totalAmount){
      this.transactionsamount=totalAmount;

    }else{
      this.transactionsamount=secondamountToAdd;
    }   
    this.transactionstrntype = this.filterform.get('trntype').value;

  }
}


reciept(id:any){
  this.api.get(`/users/transaction/pdf/${id}`,{responseType: 'blob'}).subscribe((r: any) => {
  
    
    saveAs(new Blob([r], {type: 'application/pdf'}), 'transaction.pdf');
  });
}



reset(){
  this.getTransactions();
}
}