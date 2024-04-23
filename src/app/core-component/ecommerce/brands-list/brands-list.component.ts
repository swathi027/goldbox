import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { BrandsService } from 'src/app/shared/brands.service';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.scss']
})
export class BrandsListComponent {
  initChecked = false;

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
  // toas: any;
  imageSrc: string | undefined;
  selectedfile: any;
  editform: FormGroup<any>;
  editdata: any;
  finalurl: any;
  submitted=false;

  constructor(
    private api: ApiService,private router: Router,private formBuilder: FormBuilder,private toas:ToastrService,private Http:BrandsService) {
      this.postdata = this.formBuilder.group({
        name: ['', Validators.required],
        image: ['', Validators.required]
      });

      this.editform=this.formBuilder.group({
        name: ['', Validators.required],
        image: ['', Validators.required]
      }) 
  }

  ngOnInit(): void {
    this.brandlist()
  }

  get f(): { [key: string]: AbstractControl } {
    return this.postdata.controls;
  }

  //Brand List
  brandlist(){
    this.api.get(`/ecom/brands?page=${this.page}`).subscribe((res: any) => {
    this.tableData=res.message
    })
  }

  //Brand Update
  updatebrandstatus(table: any) {
    // var data = {
    //   brand_status:table.brand_status
    // };
    this.api.post(`/ecom/brands/${table.id}`, table).subscribe(
      (res: any) => {
        this.toas.success(res.message);
        this.brandlist();
      },
      (error: any) => {
        console.error('Error Updating Brand:', error);
      }
    );
  }

  // image validation
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
  

  // post brand
  onSubmit(): void {
    if(!this.selectedfile || this.postdata.invalid){
      this.toas.error('All fields are required')
      return
    }
    const postdata = new FormData();
    postdata.append('image_uri', this.selectedfile);
    postdata.append('brand',this.postdata.get('name').value);

      this.api.post('/ecom/brands',postdata).subscribe(
        (res: any) => {
          this.toas.success(res.message);
          this.postdata.reset();
          this.brandlist();
          $('#addbrand').modal('hide');
        },
        (error: { error: { message: string | undefined; }; }) => {
          this.toas.error(error.error.message);
        }
      );
  }
  
// get single data
singledata(id:any){
  this.api.get(`/ecom/brands/${id}`).subscribe((res: any) => {
    this.editdata=res.message;
    // Assuming you have a FormGroup named 'editform'
    this.editform.patchValue({
      name: this.editdata.brand,
      image: this.editdata.image_uri,
    });
    })
}

// edit data posting
editSubmit(): void {

 
  if(this.imageSrc){
    this.finalurl=this.selectedfile
  }else{
    this.finalurl=this.editdata.image_uri
  }

  const editeddata = new FormData();
  editeddata.append('image_uri', this.finalurl);
  editeddata.append('brand',this.editform.get('name')?.value);

  this.api.post(`/ecom/brands/${this.editdata.id}`,editeddata).subscribe((res:any)=>{
    this.toas.success(res.message);
    this.editform.reset();
    this.brandlist();
    $('#editbrand').modal('hide');
  },
  (error: { error: { message: string | undefined; }; })=>{
  this.toas.error(error.error.message)
  })
}

  //Pagination
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.brandlist();
  }

  //modal refresh
  refresh(){
    this.postdata.get('name')?.reset();
    this.postdata.reset();
  }













  delete(id:number){
    this.Http.deleteproducts(id).subscribe(res=>{
      this.toas.success("Successfully Deleted")
      this.brandlist();
    },err=>{
      this.toas.success("Went wrong")
    })
  }
}

