import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Toast,ToastrService } from 'ngx-toastr';
import { SubcategoryService } from 'src/app/shared/subcategory.service';


declare var $: any; // Declare jQuery

@Component({
  selector: 'app-subcategories-list',
  templateUrl: './subcategories-list.component.html',
  styleUrls: ['./subcategories-list.component.scss']
})
export class SubcategoriesListComponent {
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
  selectedfile: any;
  imageSrc: string | undefined;
  category: any;
  categorydata: any;
  editdata: any;
  editform: any;
  categorylists: any;
  finalurl: any;
  form: any;
  selectedfile1: any;

  constructor(
    private api: ApiService, private router: Router, private toas:ToastrService, private formBuilder: FormBuilder,private Http:SubcategoryService,){
      this.postdata = this.formBuilder.group({
        cid:['',Validators.required],
        subcatname: ['', Validators.required],
        image: ['', Validators.required],
        type: ['', Validators.required]
      });

      this.editform=this.formBuilder.group({
        cid:['',Validators.required],
        subcatname: ['', Validators.required],
        image: ['', Validators.required],
        type: ['', Validators.required],
      })   
      
  }

  ngOnInit(): void {
    this.subcategorylist()
    this.categorylist()
  }

  //Subcategory List
  subcategorylist(){
    this.api.get(`/ecom/subcategories?page=${this.page}`).subscribe((res: any) => {
    this.tableData=res.message
    })
  }

  //Categorynames
  categorylist(){
    this.api.get(`/ecom/categories`).subscribe((res: any) => {
    this.categorylists=res.message;
    // Assuming this.categorylists is an array of objects
   this.categorylists = this.categorylists.filter((item: { status: any; }) => item.status === 1);
    })
  }

  //Action
  updatesubcatstatus(table: any) {
  // var data = {
  //     status:table.status
  //   };
  this.api.post(`/ecom/subcategories/${table.id}`, table).subscribe(
    (res: any) => {
      this.toas.success(res.message);
      this.subcategorylist();
    },
    (error) => {
      console.error('Error Updating SubCategory:', error);
    }
  );
}


//image validation
onFileChange(event: any) {
  const reader = new FileReader();

  if (event.target.files && event.target.files.length) {
    const [file] = event.target.files;
        // Check if the file extension is jpg, jpeg, or png
        const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
        if (!allowedExtensions.test(file.name)) {
          this.postdata.get('image')?.setValue(null);
          this.editform.get('image')?.setValue(null);
          this.toas.error('Selected file is not a valid image format (jpg, jpeg, png).');
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
 // image validation
 onFileChange1(event: any) {
  const reader = new FileReader();

  if (event.target.files && event.target.files.length) {
    const [file] = event.target.files;

    // Check if the file extension is jpg, jpeg, or png
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if (!allowedExtensions.test(file.name)) {
      this.editform.get("image")?.setValue(null);
      this.toas.error(
        "Selected file is not a valid image format (jpg, jpeg, png)."
      );
      return;
    }

    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      console.error("Selected file size exceeds the limit.");
      return;
    }

    this.selectedfile1 = file;
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
  }
}

// post subcategory
  onSubmit(): void {
    if(!this.selectedfile){
      this.toas.error('Image is required')
      return
    }
    const postdata = new FormData();
        postdata.append('image_uri', this.selectedfile);
        postdata.append('subcatname',this.postdata.get('subcatname').value);
        postdata.append('cid',this.postdata.get('cid').value);
        postdata.append('type',this.postdata.get('type').value);
    this.api.post('/ecom/subcategories',postdata).subscribe(
      (res: any) => {
        this.toas.success('Subcategory Added Successfully');
        this.postdata.reset();
        this.postdata.get('cid').setValue('');
        this.postdata.get('type').setValue('');
        this.subcategorylist();
        $('#addsubcat').modal('hide');
      },
      (error) => {
        this.toas.error(error.error.message);
      }
    );
  }

  //get single data
  singledata(id:any){
    this.api.get(`/ecom/subcategories/${id}`).subscribe((res: any) => {
      this.editdata=res.message[0];
      // Assuming you have a FormGroup named 'editform'
      this.editform.patchValue({
        cid : this.editdata.cid,
        subcatname : this.editdata.subcatname,
        image : this.editdata.image_uri,
        type : this.editdata.type,
      });
      })
  }

  // edit subcategory
  editSubmit(): void {

    if (this.selectedfile1) {
      this.finalurl = this.selectedfile1;
    } else {
      this.finalurl = this.editdata.image_uri;
    }
  
    const editeddata = new FormData();
    editeddata.append('image_uri', this.finalurl);
    editeddata.append('cid',this.editform.get('cid').value);
    editeddata.append('subcatname',this.editform.get('subcatname').value);
    editeddata.append('type',this.editform.get('type').value);
  
    this.api.post(`/ecom/subcategories/${this.editdata.id}`,editeddata).subscribe((res:any)=>{
      this.toas.success(res.message);
      this.editform.reset();
      this.subcategorylist();
      $('#editsubcategory').modal('hide');
    },
    (error)=>{
    this.toas.error(error.error.message)
    })
  }
  

  //Pagination
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.subcategorylist();
  }

  refresh(){
    this.postdata.reset();
    this.postdata.get('cid').setValue('');
    this.postdata.get('type').setValue('');

  }



  delete(id:number){
  this.Http.deletesubcatagory(id).subscribe(res=>{
    this.toas.success("Successfully Deleted")
    this.subcategorylist();
  },err=>{
    this.toas.error(err.error.message)
  })
}




}

