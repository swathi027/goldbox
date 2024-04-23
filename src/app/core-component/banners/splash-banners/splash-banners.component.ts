import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
declare var $: any; 
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-splash-banners',
  templateUrl: './splash-banners.component.html',
  styleUrls: ['./splash-banners.component.scss']
})
export class SplashBannersComponent {

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
  postdata: any;
  selectedfile: any;
  form: any;
  imageSrc: string | undefined;
  image_uri: any;
  status: any;
  finalurl: any;
  allbanners: any;
  screen_uri: any;
  bannerimage: any;
  editform:any;
editdata: any;
  selectedfile1: any;

  constructor(private datePipe: DatePipe,
    private api: ApiService, private router: Router, private toas:ToastrService, private formBuilder: FormBuilder){
      this.postdata = this.formBuilder.group({
        fromdate: ['', Validators.required],
        todate: ['', Validators.required],
        sequence: ['', Validators.required],
        screen_uri: ['', Validators.required]
      });  
      this.editform = this.formBuilder.group({
        fromdate: ['', Validators.required],
        todate: ['', Validators.required],
        sequence: ['', Validators.required],
        screen_uri: ['', Validators.required]
      });  
  }

  ngOnInit(){
    this.bannerslist();
  }

  //get bannerslist
  bannerslist(): void{
    this.api.get(`/splash/banners/allsplashscreens`).subscribe((res:any)=>{
    this.allbanners=res.message;
  })
}

//image view
singleimg(data:any){
  this.bannerimage=data.screen_uri
}

//image
onFileChange(event: any) {
  const reader = new FileReader();

  if (event.target.files && event.target.files.length) {
    const [file] = event.target.files;
      if (!file.type.startsWith('image/')) {
        console.error('Selected file is not an image.');
        return;
      }

    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      console.error('Selected file size exceeds the limit.');
      return;
    }

    this.selectedfile = file;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
  }
}
onFileChange1(event: any) {
  const reader = new FileReader();

  if (event.target.files && event.target.files.length) {
    const [file] = event.target.files;
      if (!file.type.startsWith('image/')) {
        console.error('Selected file is not an image.');
        return;
      }

    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      console.error('Selected file size exceeds the limit.');
      return;
    }

    this.selectedfile1 = file;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
  }
}

//update banners
updatebannerstatus(table:any){
  var data = {
    enabled:table.enabled
  };
  this.api.post(`/splash/banners/status/${table.id}`, data).subscribe(
    (res: any) => {
      this.toas.success(res.message);
      this.bannerslist();
    },
    (error) => {
      console.error('Error Updating Branner:', error);
    }
  );
}

//add banner
onSubmit():void{
  if(!this.selectedfile){
    this.toas.error('Banner image is required');
   return
  }
    const postdata = new FormData();
    postdata.append('screen_uri', this.selectedfile);
    postdata.append('from_date',this.postdata.get('fromdate').value);
    postdata.append('to_date',this.postdata.get('todate').value);
    postdata.append('sequence',this.postdata.get('sequence').value);

    this.api.post('/splash/banners/add',postdata).subscribe(
      (res: any) => {
        this.toas.success('splash bannner added successfully');
        this.postdata.reset();
        this.bannerslist();
        $('#staticBackdrop2').modal('hide');

      },
      (error) => {
        this.toas.error(error.error.message);
      }
    );
  }

//single banner image
singledata(id:any){
  this.selectedfile1=null
  this.api.get(`/splash/banners/${id}`).subscribe((res: any) => {
    this.editdata=res.message;
    // Assuming you have a FormGroup named 'editform'
    const formattedFromDate = this.datePipe.transform(this.editdata.from_date, 'yyyy-MM-dd');
    const formattedToDate = this.datePipe.transform(this.editdata.to_date, 'yyyy-MM-dd');
    this.imageSrc= this.editdata.image_uri,

    this.editform.patchValue({
      fromdate : formattedFromDate,
      todate : formattedToDate,
      sequence : this.editdata.sequence,
    });
  })
}

//edit image
editSubmit(){

  if(this.selectedfile1){
    this.finalurl=this.selectedfile1
  }else{
    this.finalurl=this.editdata.screen_uri
  }

  const editeddata = new FormData();
  editeddata.append('screen_uri', this.finalurl);
  editeddata.append('from_date',this.editform.get('fromdate')?.value);
  editeddata.append('to_date',this.editform.get('todate')?.value);
  editeddata.append('sequence',this.editform.get('sequence')?.value);

  this.api.post(`/splash/banners/update/${this.editdata.id}`,editeddata).subscribe((res:any)=>{
    this.toas.success(res.message);
    this.editform.reset();
    this.bannerslist();
    $('#editbanner').modal('hide');

  },
  (error)=>{
  this.toas.error(error.error.message)
  })
}

//Pagination
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.bannerslist();
  }

//refresh
refresh(){
    // this.postdata.get('name')?.reset();
    this.postdata.get('sequence')?.reset();
    this.postdata.get('fromdate')?.reset();
    this.postdata.get('todate')?.reset();
  }

}
