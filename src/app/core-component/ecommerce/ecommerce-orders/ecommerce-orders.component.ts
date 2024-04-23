import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormControl,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { EComOrdersService } from 'src/app/shared/e-com-orders.service';
@Component({
  selector: 'app-ecommerce-orders',
  templateUrl: './ecommerce-orders.component.html',
  styleUrls: ['./ecommerce-orders.component.scss']
})
export class EcommerceOrdersComponent {
  initChecked = false;
  food: any = [
    {value: '2', viewValue: 'Order Placed'},
    {value: '3', viewValue: 'Order Accepted'},
    {value: '4', viewValue: 'Order Making '},
    {value: '5', viewValue: 'Order Pickup'},
    {value: '6', viewValue: 'Order Delivered'},
    {value: '7', viewValue: 'Order Canceled'},
  ];

  fileName= 'GoldBox-Ecommerce-orders.xlsx';

  // pagination variables
  public pageSize = 10;
  public totalData = 0;
  showFilter = false;

  public searchDataValue = '';
  public initialresponse: any;
  tableData: any;
  page: any;
  searchText: any;
  id:any;
  ecomorderstatus: any;
  orderedproducts: any;
  productslength: any;
  filterform: any;
  fristdata: any;
  deliveredorders: any;
  cancelorders: any;
  pendingorders: any;
selectedValue: any;
  statusdata: any;
  singleuser: any;
  mydata: any;

  constructor(private fb: FormBuilder,private toaster:ToastrService,private api: ApiService,private router: Router,private http:EComOrdersService
    ) {
      this.filterform = this.fb.group({
        transactionId: [''],
        mobile: [''],
        orderstatus: [''],
        start: [''],
        end: [''], // Set default value here
      });
  }

  ngOnInit(): void {
    this.orderslist();
  }

  //get Orders
  orderslist(){
    this.api.get(`/ecom/orders`).subscribe((res: any) => {
    this.tableData=res.message;

    this.fristdata=res.message;
    this.deliveredorders=this.fristdata.filter((res:any)=>res.status===6)
    this.cancelorders=this.fristdata.filter((res:any)=>res.status===7)
    this.pendingorders=this.fristdata.length-(this.cancelorders.length+this.deliveredorders.length)
    })
  }

  //get Order info
  orderinfo(order_id:any){
    this.api.get(`/ecom/orderinfo/${order_id}`).subscribe((res:any) => {
      this.orderedproducts=res.message;
      this.productslength=this.orderedproducts.length
    })
  }

  //pagination
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.orderslist();
  }

//update status
  updatestatus(table:any,data:any,id:any){
    const datas={
      status:id,
      tracking_id:data._id
    }
  this.api.post(`/ecom/orderstatus/${table.order_id}/${table.userid}`,datas).subscribe((res:any)=>{
    
    this.orderslist()
    this.toaster.success(res.message)
  },(err)=>{
  })
  }
  

// filters
filtertransactions() {
  let fromDateValue: string = this.filterform.get('start').value;
  let toDateValue: string = this.filterform.get('end').value;

  // Convert empty string to null for fromDate
  let fromDate: any = fromDateValue ? new Date(fromDateValue) : null;

  // Convert empty string to null for toDate
  let toDate: any = toDateValue ? new Date(toDateValue) : null;

  let tranid = this.filterform.get('transactionId').value;
  let mobile = this.filterform.get('mobile').value;
  let status = this.filterform.get('orderstatus').value;

  // Filter data
  let filteredData = this.fristdata.filter((data: any) => {
    // Extract only the date portion (year, month, day) from the stored date
    const storedDate = new Date(data.created_at).toLocaleDateString('en-CA');

    // Check if both fromDate and toDate are provided and are valid dates
    const isWithinDateRange = (
      (fromDate && toDate) ?
      (storedDate >= fromDate.toLocaleDateString('en-CA') && storedDate <= toDate.toLocaleDateString('en-CA')) : true
    );

    const isMatchingTransactionId = tranid ? data.order_id === tranid : true;
    const isMatchingMobile = mobile ? data.mobilenumber === mobile.toString() : true;
    const isMatchingstatus = status ? data.status == status: true;

    return isMatchingTransactionId && isMatchingMobile && isWithinDateRange && isMatchingstatus;
  });

  this.tableData = filteredData; // Assuming tableData is an object with a 'message' property
  this.deliveredorders=this.fristdata.filter((res:any)=>res.status===6)
  this.cancelorders=this.fristdata.filter((res:any)=>res.status===7)
  this.pendingorders=this.fristdata.length-(this.cancelorders.length+this.deliveredorders.length)

  if (filteredData.length === 0) {
    this.toaster.error('No results found');
  } else {
    this.toaster.success(`${filteredData.length} Orders filtered`);
  }
}

//refresh modal
reset(){
  this.orderslist();

}


// export
exportexcel(): void {
  /* pass here the table id */
  let element = document.getElementById('datatableexample');
  const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  // Check if !ref property is defined before decoding range
  if (ws['!ref']) {
    // Remove last two columns from each row in the worksheet
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.e.c; C > range.e.c - 2; --C) {
        const cell_address = { c: C, r: R };
        delete ws[XLSX.utils.encode_cell(cell_address)];
      }
    }

    // Iterate over the cells in the worksheet and set the formatting for phone numbers
    for (let R = range.s.r + 1; R <= range.e.r; ++R) {
      const cell_address = { c: range.e.c - 1, r: R }; // Assuming the phone number is in the second-to-last column
      const cell = ws[XLSX.utils.encode_cell(cell_address)];
      
      // Check if the cell contains a phone number (adjust the condition based on your data)
      if (cell && typeof cell.v === 'number' && cell.v.toString().length === 12) {
        cell.t = 's'; // Treat the cell as a string
      }
    }
  }

  /* generate workbook and add the worksheet */
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */  
  XLSX.writeFile(wb, this.fileName);
  this.toaster.success("Excel sheet downloaded");
}



sendstatus(table:any){
  this.statusdata=table
}






getsingleuser(event:any){
  this.mydata=event.target.value
  this.http.getdata(this.mydata).subscribe((res:any)=>{
    this.singleuser=res;
  })
}




}


