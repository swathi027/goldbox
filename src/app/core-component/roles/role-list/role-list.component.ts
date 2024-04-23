import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl, } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
declare var $: any; // Declare jQuery
import Swal from 'sweetalert2';
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent {
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

  constructor(
    private api: ApiService, private router: Router, private toas:ToastrService, private formBuilder: FormBuilder){
      this.postdata = this.formBuilder.group({
        title: ['', Validators.required],
      });

      this.editform=this.formBuilder.group({
        title: ['', Validators.required],
      })   
  }

  ngOnInit(): void {
    this.roleslist()
  }
  get f(): { [key: string]: AbstractControl } {
    return this.postdata.controls;
  }

  //Category List
  roleslist(){
    this.api.get(`/admintype?page=${this.page}`).subscribe((res: any) => {
    this.tableData=res.message
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
      this.api.delete(`/admintype/${table.id}`).subscribe(
        (res: any) => {
          this.toas.success('Role deleted Successfully');
          this.roleslist(); // Assuming you have a method to refresh the categories list
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
    this.api.post('/admintype',this.postdata.value).subscribe((res: any) => {
      this.toas.success(res.message);
      this.postdata.reset();
      this.roleslist();   
      $('#addcategory').modal('hide');
    },
    (error) => {
      this.toas.error(error.error.message);
    }
  );
  }

// get single data
singledata(id:any){
  this.api.get(`/admintype/${id}`).subscribe((res: any) => {
    this.editdata=res.message;
    // Assuming you have a FormGroup named 'editform'
    this.editform.patchValue({
      title: this.editdata.title,
    });
  })
}

// edit data posting
editSubmit(): void {
  this.api.put(`/admintype/${this.editdata.id}`,this.editform.value).subscribe((res:any)=>{
    this.toas.success(res.message);
    this.editform.reset();
    this.roleslist();
    $('#editcategory').modal('hide');
  },
  (error)=>{
  this.toas.error(error.error.message)
  })
  
}

//Pagination
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.roleslist();
  }

  refresh(){
    this.postdata.reset();
    this.postdata.get('catname')?.reset();
}
}
