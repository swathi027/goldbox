import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl, } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';


import {  ValidatorFn } from '@angular/forms';
declare var $: any; // Declare jQuery
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent {
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
  selectedfile1: any;
  adminslists: any;
  customEmailValidator: any | string;


  


  constructor(
    private api: ApiService, private router: Router, private toas:ToastrService, private formBuilder: FormBuilder){
// Custom validator function
const emailValidator = (control: FormControl) => {
  const value = control.value as string;
  
  // Regular expression to check for at least one alphabet letter before the '@' symbol
  const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9]*@gmail\.com$/;
  
  if (!value || !emailRegex.test(value)) {
    return { invalidEmail: true };
  }
  
  return null;
};

          
      this.postdata = this.formBuilder.group({
        name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        email: ['', [Validators.required, Validators.email,emailValidator]],
        mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        role: [null, Validators.required],
      });

      

      

      this.editform=this.formBuilder.group({
        name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
        email: ['', [Validators.required, Validators.email,emailValidator]],
        mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        role: [null, Validators.required],
      })   
  }

  ngOnInit(): void {
    this.adminslist()
  }
  get f(): { [key: string]: AbstractControl } {
    return this.postdata.controls;
  }

  //Category List
  adminslist(){
    this.api.get(`/adminslist?page=${this.page}`).subscribe((res: any) => {
    this.tableData=res.message
    })
    this.api.get(`/admintype`).subscribe((res: any) => {
    this.adminslists=res.message
    })
  }

//Update category
updatecategorystatus(table: any) {


  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#630914",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Delete!"
  }).then((result:any) => {
    if (result.isConfirmed) {
      this.api.delete(`/admin/${table.id}`).subscribe(
        (res: any) => {
          this.toas.success('Role deleted Successfully');
          this.adminslist(); // Assuming you have a method to refresh the categories list
        },
        (error) => {
          console.error('Error Updating Category:', error);
        }
      );
    }
  });


  
}

  
  // post category
  onSubmit(): void {
    
   if(this.postdata.invalid){
    this.toas.error("Invalid form Details");
    return
   }else{
    
    const emailControl = this.postdata.get('email');
 
    if (emailControl && emailControl.invalid) {
      this.toas.success('invalid email');
      return
    }
    this.api.post('/addadmin',this.postdata.value).subscribe((res: any) => {
      this.toas.success(res.message);
      this.postdata.reset();
      this.adminslist();   
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
  this.api.get(`/admin/${id}`).subscribe((res: any) => {
    this.editdata=res.message;
    // Assuming you have a FormGroup named 'editform'
    this.editform.patchValue({
      name: this.editdata.name,
      email: this.editdata.email,
      mobile: this.editdata.mobile,
      password: this.editdata.password,
      role: this.editdata.role,
    });
  })
}

// edit data posting
editSubmit(): void {
  if(this.editform.invalid){
    this.toas.error("Invalid form Details");
    return
   }else{
    const emailControl = this.editform.get('email');
    if (emailControl && emailControl.invalid) {
      this.toas.success('invalid email');
      return
    }
  this.api.post(`/admin/${this.editdata.id}`,this.editform.value).subscribe((res:any)=>{
    this.toas.success(res.message);
    this.editform.reset();
    this.adminslist();
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
    this.adminslist();
  }

  refresh(){
    this.postdata.reset();
    this.postdata.get('catname')?.reset();
}



// validation

}
function containsAlphabet(): any | string {
  throw new Error('Function not implemented.');
}

