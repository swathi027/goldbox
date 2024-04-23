import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormBuilder,Validators } from '@angular/forms';
import { CommonService, SettingsService } from 'src/app/core/core.index';
import { startOfWeek, endOfWeek, addDays } from 'date-fns';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
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

  userslength: any;
  tabledata: any;
  schemeuserslength: any;
  transactionlists: any;
  orderlists: any;
  categorylists: any;
  subcategorylists: any;
  productlists: any;
  brandlists: any;
  chartOptions:any;
  trandata: any;
  monthlyCounts: any;
  lastFiveYears: any;
  currentYear: any;
  selectedYear: any;
range: any;
  startOfCurrentWeek: Date;
  endOfCurrentWeek: Date;
  roleid:any;

  constructor(private fb: FormBuilder,private common: CommonService, private setting : SettingsService,private api: ApiService) {
    this.form = this.fb.group({
      pepperoni: [false]  // Initial value of the checkbox
    });
    this.transactionlist()  
   // Get the start and end dates of the current week
   const today = new Date();
   this.startOfCurrentWeek = startOfWeek(today);
   this.endOfCurrentWeek = endOfWeek(today);

   // Initialize the form group with start and end controls and set initial values
   this.range = this.fb.group({
     start: [this.startOfCurrentWeek, Validators.required],
     end: [this.endOfCurrentWeek, Validators.required],
   });
    this.range.valueChanges.subscribe((value:any) => {
      this.onDateRangeChange();
    });
  }
  ngOnInit(){
    const userRoleid = localStorage.getItem('user-roleid');
    this.roleid = typeof userRoleid === 'string' ? parseInt(userRoleid, 10) : userRoleid;

    this.userslist();
    this.schemeuserslist();
    this.orderslist();
    this.categorylist();
    this.subcategorylist();
    this.productslist();
    this.brandslist();
    
  }
  //userslist
  userslist():void{
    this.api.get(`/users`).subscribe((res:any)=>{
      this.tabledata=res.message;
        this.userslength=this.tabledata.length
    })
  }
  //schemeuserlist
  schemeuserslist(){
    this.api.get(`/schemes/users`).subscribe((res:any)=>{
      this.tabledata=res.message;
      this.schemeuserslength=this.tabledata.length
    })
  }
    //orders
    orderslist(){
      this.api.get(`/ecom/orders`).subscribe((res:any)=>{
        this.tabledata=res.message;
        this.orderlists=this.tabledata.length
      })
    }
  
    //category
    categorylist(){
      this.api.get(`/ecom/categories`).subscribe((res:any)=>{
        this.tabledata=res.message;
        this.categorylists=this.tabledata.length
      })
    }
    //subcategory
    subcategorylist(){
      this.api.get(`/ecom/subcategories`).subscribe((res:any)=>{
        this.tabledata=res.message;
        this.subcategorylists=this.tabledata.length
      })
    }
    //products
    productslist(){
      this.api.get(`/ecom/products`).subscribe((res:any)=>{
        this.tabledata=res.message;
        this.productlists=this.tabledata.length
      })
    }
    //brands
    brandslist(){
      this.api.get(`/ecom/brands`).subscribe((res:any)=>{
        this.tabledata=res.message;
        this.brandlists=this.tabledata.length
      })
    }
     //transactionlist
    transactionlist(){
    this.api.get(`/transactions`).subscribe((res:any) => {
      this.tabledata = res.message;
      this.transactionlists = this.tabledata.length;
      // Get the first 7 transactions
      this.trandata = this.tabledata.slice(0, 8);

      this.getchart(this.startOfCurrentWeek,this.endOfCurrentWeek)
    });
    
    }
    getDateWiseCountsInRange(transactions: any, fromDate: Date, toDate: Date): { dates: string[], counts: number[] } {
  // Ensure fromDate is not later than toDate
  if (fromDate > toDate) {
    throw new Error("'fromDate' cannot be later than 'toDate'");
  }

  // Initialize arrays for dates and counts
  const dates: string[] = [];
  const counts: number[] = [];
  const currentDate = new Date(fromDate);

  while (currentDate <= toDate) {
    dates.push(currentDate.toISOString().split('T')[0]);
    counts.push(0);
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  for (const transaction of transactions) {
    const transactionDate = new Date(transaction.created_at);

    // Check if the transaction date is within the specified range
    if (transactionDate >= fromDate && transactionDate <= toDate) {
      const dateString = transactionDate.toISOString().split('T')[0];
      const index = dates.indexOf(dateString);
      if (index !== -1) {
        counts[index]++;
      }
    }
  }

  return { dates, counts };
    }
    // getchart
   getchart(fromDate:any,toDate:any){

        const result = this.getDateWiseCountsInRange(this.tabledata, fromDate, toDate);
         if(result){
          this.chartOptions = {
            series: [
              {
                name: 'Received',
                color: '#d8a931',
                data: result['counts'],
              },
              {
                name: 'Dates',
                color: '#630914',
                data: [], 
              },
            ],
            chart: {
              // ... other chart options ...
              events: {
                zoomed: (chartContext: { xaxis: { get: (key: string) => any } }, { xaxis }: { xaxis: { get: (key: string) => any } }) => {
                  // Update the visible range based on user interaction
                  const { min, max } = xaxis.get('range');
          
                  // You can use min and max values to update your data or perform any other actions
                },
              },
            },
            plotOptions: {
              area: {
                fillTo: 'end',
              },
              bar: {
                horizontal: false,
                columnWidth: '50%',
                borderRadius: 7,
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
                distributed: true,
                colors: {
                  ranges: [
                    {
                      from: 0,
                      to: 100000,
                      color: '#28C76F',
                    },
                    {
                      from: -100000,
                      to: 0,
                      color: '#EA5455',
                    },
                  ],
                },
              },
            },
            xaxis: {
              categories:result['dates'],
              labels: {
                trim: false, // Prevent label trimming
              },
              range: 10, // Initial visible range of categories
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#888',
              },
            },
            legend: {
              position: 'right',
              offsetY: 40,
            },
            fill: {
              opacity: 1,
            },
          };
          
         }
    }
   // ondate select
   onDateRangeChange() {
  const selectedStartDate = this.range.get('start').value;
  const selectedEndDate = this.range.get('end').value;

  if (selectedStartDate && selectedEndDate) {
   this.getchart(selectedStartDate,selectedEndDate)
  }
}
}
