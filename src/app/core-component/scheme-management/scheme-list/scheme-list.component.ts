import { Component, OnInit ,ViewChild } from '@angular/core';
declare var $: any; // Declare jQuery
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import {FormControl, AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-scheme-list',
  templateUrl: './scheme-list.component.html',
  styleUrls: ['./scheme-list.component.scss']
})
export class SchemeListComponent implements OnInit {
  @ViewChild('addscheme') addscheme: any;
  initChecked = false;
  isChecked = true;
  // pagination variables
  public pageSize = 10;
  public totalData = 0;
  showFilter = false;

  public searchDataValue = '';
  public initialresponse: any;
  tableData: any;
  page: any|1;
  searchText: any;
  gc_scheme: boolean | undefined;
  postdata: any;
  countries: any;
  editform: any;
  editdata: any;
  sdfjkdf:boolean=true;
 
editorText: any;
  tenures: any;
  tenureid: any;
  tenureform: any;
  page1: any|1;
  tenurelenght: any;
  amountform: any;
  amountres: any;
  amountlenght: any;
  senddata: any;
  constructor(private api: ApiService,private toas:ToastrService,private formBuilder: FormBuilder,) {
    this.postdata=this.formBuilder.group({
      title: ['', Validators.required],
      country: ['', Validators.required],
      scheme_calculation_type: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.editform=this.formBuilder.group({
      title: ['', Validators.required],
      country: ['', Validators.required],
      scheme_calculation_type: ['', Validators.required],
      description: ['', Validators.required],
      gc_scheme: ['', Validators.required],
    })
    this.tenureform=this.formBuilder.group({
      tenure: ['', Validators.required],
  
    })
    this.amountform=this.formBuilder.group({
      amount: ['', Validators.required],
  
    })
  }
  ngOnInit(): void {
    this.schemeslist();
    this.countrieslist();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.postdata.controls;
  }
  schemeslist(){
    this.api.get(`/schemes/list?page=${this.page}`).subscribe((res: any) => {
    this.tableData=res.message;
    })
  }
  countrieslist(){
    this.api.get(`/countries`).subscribe((res: any) => {
      this.countries=res.totalcountires;
      })
  }
  
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.schemeslist();
}


 // update scheme
updatestatus(table:any) {

  const data = {
    gc_scheme: table.gc_scheme
  };
 
  this.api.put(`/schemes/update/${table.id}`, table).subscribe(
    (res: any) => {
      this.toas.success(res.message);
      this.schemeslist();
    },
    (error) => {
      console.error('Error updating scheme:', error);
    }
  );
}
  //posting data
  onSubmit(): void {

      this.api.post('/schemes/add',this.postdata.value).subscribe((res:any)=>{
        this.toas.success(res.message);
        this.postdata.reset();
        this.postdata.get('country').setValue('');
        this.postdata.get('scheme_calculation_type').setValue('');

        this.sdfjkdf=false;
        this.schemeslist();
        $('#addscheme').modal('hide');
      },
      (error)=>{
      this.toas.error(error.error.message)
      })
  }

  // get single data
  singledata(id:any){
    this.api.get(`/schemes/get/${id}`).subscribe((res: any) => {
      this.editdata=res.message;
      // Assuming you have a FormGroup named 'postdata'
      this.editform.patchValue({
        title: this.editdata.title,
        country: this.editdata.country,
        scheme_calculation_type: this.editdata.scheme_calculation_type,
        description: this.editdata.description,
        gc_scheme: this.editdata.gc_scheme,
      });
      })
  }

  // edit data posting
  editSubmit(): void {
      this.api.put(`/schemes/update/${this.editdata.id}`,this.editform.value).subscribe((res:any)=>{
        this.toas.success(res.message);
        this.editform.reset();
        this.schemeslist();
        $('#editscheme').modal('hide');

      },
      (error)=>{
      this.toas.error(error.error.message)
      })
  }
  
  refresh(){
    this.postdata.get('title')?.reset();
    this.postdata.get('description')?.reset();
    this.postdata.get('country').setValue('');
    this.postdata.get('scheme_calculation_type').setValue('');
    this.tenureform.reset();
    this.amountform.reset();
  }

// tenure list
tenurelist(id:any){
  this.tenureid=id
  this.api.get(`/schemes/tenure/list/${id}`).subscribe((res:any)=>{
    this.tenures=res.message
    this.tenurelenght=this.tenures.length
  })
}

// add tenure
addtenure(){
  const data ={
    tenure:this.tenureform.get('tenure')?.value
  }
  this.api.post(`/schemes/tenure/add/${this.tenureid}`,data).subscribe((res:any)=>{
    this.tenures=res.message;
    this.tenurelist(this.tenureid)
    this.tenureform.reset()
    this.toas.success(res.message)
  },(err)=>{
    this.toas.error(err.error.message)
  })
}
// update tenure status
updatetenurestatus(table:any){

  const data = {
    status:table.status
  };
  this.api.post(`/schemes/tenure/update/${table.id}`, data).subscribe(
    (res: any) => {
      this.toas.success(res.message);
      this.schemeslist();
    },
    (error) => {
      console.error('Error updating scheme:', error);
    }
  );
}

// deletetenure
deletetenure(table:any){
  this.api.delete(`/schemes/tenure/delete/${table.id}`).subscribe(
    (res: any) => {
      this.toas.success(res.message);
      this.tenurelist(this.tenureid);
    },
    (error) => {
      console.error('Error updating scheme:', error);
    }
  );
}


// Amount list
amountlist(id:any){
  this.tenureid=id
  this.api.get(`/schemes/amount/list/${id}`).subscribe((res:any)=>{
    this.amountres=res.message
    this.amountlenght=this.amountres.length
  })
}

// add Amount
addamount(){
  const data ={
    amount:this.amountform.get('amount')?.value
  }
  this.api.post(`/schemes/amount/add/${this.tenureid}`,data).subscribe((res:any)=>{
    this.tenures=res.message;
    this.toas.success(this.tenures)
    this.amountlist(this.tenureid)
    this.amountform.reset()
  },(err)=>{
    this.toas.error(err.error.message)
  })
}
// update Amount status
updateamountstatus(table:any){
  const data = {
    status:table.status
  };
  this.api.post(`/schemes/amount/update/${table.id}`, data).subscribe(
    (res: any) => {
      this.toas.success(res.message);
      this.amountlist(this.tenureid)

    },
    (error) => {
      console.error('Error updating scheme:', error);
    }
  );
}

// delete  Amount
deleteamount(table:any){
  this.api.delete(`/schemes/amount/delete/${table.id}`).subscribe(
    (res: any) => {
      this.toas.success(res.message);
      this.amountlist(this.tenureid)
    },
    (error) => {
      console.error('Error updating scheme:', error);
    }
  );
}



}
