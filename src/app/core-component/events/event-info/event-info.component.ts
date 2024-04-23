import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-event-info',
  templateUrl: './event-info.component.html',
  styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent {
  searchText: any;
  tableData:any;
  info:any
  golds: any;
  page: any;
  public pageSize = 10;
  public totalData = 0;
  constructor(private router:ActivatedRoute,private api: ApiService){}

  ngOnInit(){
    this.getEvents();
    this.eventgold();
  }



getEvents(){
  const id = this.router.snapshot.paramMap.get('id')
  this.api.get(`/event/${id}`).subscribe((res:any)=>{
    this.info=res.message[0];
  })
}
eventgold(){
  const id = this.router.snapshot.paramMap.get('id')
  this.api.get(`/giftedgold/event/${id}`).subscribe((res:any)=>{
    this.golds=res.message;
  })
}
pageChanged(pageNumber: number) {
  this.page = pageNumber;
  
}

extractEventName(fullEventName: string): string {
  const parts = fullEventName.split('-');
  return parts.length > 0 ? parts[0].trim() : fullEventName.trim();
}
}
