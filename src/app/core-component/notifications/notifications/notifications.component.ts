import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl, } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  initChecked = false;
  ischecked = true;

  // pagination variables
  public pageSize = 10;
  public totalData = 0;
  showFilter = false;

  public searchDataValue = '';
  public initialresponse: any;
  tableData: any;
  page: any;
  searchText: any;
  postdata:FormGroup;
  selectedfile: any;
  form: any;
  imageSrc: string | undefined;
  image_uri: any;
category: any;
status: any;
  editform: any;
  editor: any;
  editdata: any;
  finalurl: any;
  submitted = false;
  singleid: any;

  constructor(
    private api: ApiService, private router: Router, private toas:ToastrService, private formBuilder: FormBuilder){
      this.postdata = this.formBuilder.group({
        title: ['', [Validators.required, this.noLeadingSpaceValidator, Validators.minLength(4)]],
        message: ['', [Validators.required, this.noLeadingSpaceValidator, Validators.minLength(4)]],
        type: ['', [Validators.required, this.noLeadingSpaceValidator, Validators.minLength(2)]],
      });

      this.editform=this.formBuilder.group({
        title: ['', [Validators.required, this.noLeadingSpaceValidator, Validators.minLength(4)]],
        message: ['', [Validators.required, this.noLeadingSpaceValidator, Validators.minLength(4)]],
        type: ['', [Validators.required, this.noLeadingSpaceValidator, Validators.minLength(2)]],
      })   
  }

  ngOnInit(): void {
    this.notificationslist()
  }
  get f(): { [key: string]: AbstractControl } {
    return this.postdata.controls;
  }

  //NOtification List
  notificationslist(){
    this.api.get(`/notfications?page=${this.page}`).subscribe((res: any) => {
    this.tableData=res.message
    })
  }
  //NOtification List
  delete(id:any){
    this.api.delete(`/notfication/${id}`).subscribe((res: any) => {
      this.toas.success(res.message)
    this.notificationslist();
    })
  }

//Update category
updatenotification(table: any) {
 
  this.api.post(`/notfication/${table.id}`,this.editform.value).subscribe(
    (res: any) => {
      this.toas.success(res.message);
      this.notificationslist(); // Assuming you have a method to refresh the categories list
    },
    (error) => {
      console.error('Error Updating Category:', error);
    }
  );
}

  
  
  // post category
  onSubmit(): void {
    const inputTextControl = this.postdata.get('title');
    const inputTextControl2 = this.postdata.get('message');
    const inputTextControl3 = this.postdata.get('type');
    
    if (inputTextControl && inputTextControl.hasError('leadingSpace')) {
      this.toas.error('Title cannot start with a space.');
      return
    }
    
    if (inputTextControl2 && inputTextControl2.hasError('leadingSpace')) {
      this.toas.error('Message cannot start with a space.');
      return
    }
    
    if (inputTextControl3 && inputTextControl3.hasError('leadingSpace')) {
      this.toas.error('Type cannot start with a space.');
      return
    }
    
    if(this.postdata.valid){
      this.api.post('/addnotfication',this.postdata.value).subscribe((res: any) => {
        this.toas.success(res.message);
        this.postdata.reset();
        this.notificationslist();   
        $('#addcategory').modal('hide');
      },
      (error) => {
        this.toas.error(error.error.message);
      }
    );
    }
  }

// get single data
singledata(id:any){
 
  this.api.get(`/notfication/${id}`).subscribe((res: any) => {
    this.editdata=res.message;
    // Assuming you have a FormGroup named 'editform'
    this.editform.patchValue({
      title: this.editdata.title,
      message: this.editdata.message,
      type: this.editdata.type,
    });
  })
}

// edit data posting
editSubmit(): void {

  const inputTextControl = this.editform.get('title');
  const inputTextControl2 = this.editform.get('message');
  const inputTextControl3 = this.editform.get('type');
  
  if (inputTextControl && inputTextControl.hasError('leadingSpace')) {
    this.toas.error('Title cannot start with a space.');
    return
  }
  
  if (inputTextControl2 && inputTextControl2.hasError('leadingSpace')) {
    this.toas.error('Message cannot start with a space.');
    return
  }
  
  if (inputTextControl3 && inputTextControl3.hasError('leadingSpace')) {
    this.toas.error('Type cannot start with a space.');
    return
  }
  if(this.editform.valid){
    this.api.post(`/notfication/${this.editdata.id}`,this.editform.value).subscribe((res:any)=>{
      this.toas.success(res.message);
      this.editform.reset();
      this.notificationslist();
      $('#editcategory').modal('hide');
    },
    (error)=>{
    this.toas.error(error.error.message)
    })
  }


}

//Pagination
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.notificationslist();
  }

  refresh(){
    this.postdata.reset();
    this.postdata.get('catname')?.reset();
}

// send notification
sendnotification(id:any){
  const data={

  }
  this.api.post(`/pushnotification/${id}`,data).subscribe((res:any)=>{
  this.toas.success(res.message)
  },(err)=>{
  this.toas.error(err.error.message)

  })
}


noLeadingSpaceValidator(control: { value: any; }) {
  const value = control.value;
  if (value && value.trimLeft() !== value) {
    return { leadingSpace: true };
  }
  return null;
}
}
