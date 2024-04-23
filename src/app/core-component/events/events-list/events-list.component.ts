import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent {

  food: any = [
    {value: 0, viewValue: 'Initiated'},
    {value: 1, viewValue: 'Approved'},
    {value: 2, viewValue: 'Not Approved'},
    {value: 3, viewValue: 'Cancelled'},
    {value: 4, viewValue: 'Completed'},
    {value: 5, viewValue: 'Deleted'},
    
  ];

  public pageSize = 10;
  public totalData = 0;
  showFilter = false;
  page: any|1;
  searchText: any;
  tableData:any;
selectedValue: any;

  constructor(private toaster:ToastrService,private api: ApiService){}

  ngOnInit(){
    this.getEvents()
  }

  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    
}


getEvents(){
  this.api.get(`/events/list`).subscribe((res:any)=>{
    this.tableData=res.message;
  })
}
onSelectionChange(event: any,table:any): void {
  const data={
    status:event.value
  }
  this.api.post(`/event/${table.id}/${table.user_id}`,data).subscribe((res:any)=>{
 this.toaster.success(res.message);
  },(error)=>{
  })

}
extractEventName(fullEventName: string): string {
  const parts = fullEventName.split('-');
  return parts.length > 0 ? parts[0].trim() : fullEventName.trim();
}
}
