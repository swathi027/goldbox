import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/shared/products.service';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  initChecked = false;
  form!:FormGroup;
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
  categorylists: any;
  subcategorylists: any;
  brandlists: any;
  selectedfile: any;
data: any;
  editdata: any;
  editform: any;
imageSrc: any;
  finalurl: any;
  subcategoryValue: any;
  selectedfile1: any;

  constructor(
    private api: ApiService,private router: Router,private toas:ToastrService, private formBuilder: FormBuilder,private Http:ProductsService) {
      this.postdata = this.formBuilder.group({
        categoryname: ['', Validators.required],
        subcategoryname: ['', Validators.required],
        brandname: ['', Validators.required],
        productname: ['', Validators.required],
        price: ['', Validators.required],
        description: ['', Validators.required],
        type: ['', Validators.required],
        carat: ['', Validators.required],
        image: ['', Validators.required],
        va: ['', Validators.required],
        weight: ['', Validators.required],
        sizes: ['', Validators.required]
      });

      this.editform = this.formBuilder.group({
        categoryname: ['', Validators.required],
        subcategoryname: ['', Validators.required],
        brandname: ['', Validators.required],
        productname: ['', Validators.required],
        price: ['', Validators.required],
        description: ['', Validators.required],
        type: ['', Validators.required],
        carat: ['', Validators.required],
        image: [''],
        va: ['', Validators.required],
   

      });
  }

  ngOnInit(): void {
    this.productlist()
    this.categorylist()
    this.brandlist()
  }

  //product list
  productlist(){
    this.api.get(`/ecom/products?page=${this.page}`).subscribe((res: any) => {
    this.tableData=res.message
    })
  }

  //category list
  categorylist(){
    this.api.get(`/ecom/categories`).subscribe((res: any) => {
    this.categorylists=res.message
    this.categorylists = this.categorylists.filter((item: { status: any; }) => item.status === 1);

    })
  }



  //brandlist
  brandlist(){
    this.api.get(`/ecom/brands?page=${this.page}`).subscribe((res: any) => {
    this.brandlists=res.message.filter((res: { brand_status: number; })=>res.brand_status===1)
    })
  }

//Action
updateproductstatus(table: any) {

    this.api.post(`/ecom/products/${table.id}`, table).subscribe(
      (res: any) => {
        this.toas.success(res.message);
        this.productlist();
      },
      (error) => {
        console.error('Error Updating Product:', error);
      }
    );
  }

  //post product
  onSubmit(): void {
    if(!this.selectedfile){
      this.toas.error('Image is required')
      return
    }
    const postdata1 = new FormData();
    postdata1.append('image_uri', this.selectedfile);
    postdata1.append('cid',this.postdata.get('categoryname').value);
    postdata1.append('sid',this.postdata.get('subcategoryname').value);
    postdata1.append('bid',this.postdata.get('brandname').value);
    postdata1.append('pname',this.postdata.get('productname').value);
    postdata1.append('type',this.postdata.get('type').value);
    postdata1.append('carat',this.postdata.get('carat').value);
    postdata1.append('price',this.postdata.get('price').value);
    postdata1.append('va',this.postdata.get('va').value);
    postdata1.append('weight',this.postdata.get('weight').value);
    postdata1.append('sizes',this.postdata.get('sizes').value);
    postdata1.append('description',this.postdata.get('description').value);
    this.api.post('/ecom/products',postdata1).subscribe(
      (res: any) => {
        this.toas.success('Product Added Successfully');
        this.postdata.reset();
        this.productlist();
        $('#addproduct').modal('hide');
        this.postdata.get('categoryname').setValue('');
        this.postdata.get('subcategoryname').setValue('');
        this.postdata.get('brandname').setValue('');
        this.postdata.get('type').setValue('');
        this.postdata.get('carat').setValue('');
      },
      (error) => {
        this.toas.error(error.error.message);
      }
    );
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
   //image validation//
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

// Assuming you have a FormGroup named 'editform'
singleproduct(id: any) {
  this.api.get(`/ecom/products/${id}`).subscribe((res: any) => {
    this.editdata = res.message;

    this.api.get(`/ecom/categories/subcategories/${this.editdata[0].cid}`).subscribe((res:any)=>{
      this.subcategorylists=res.message[0].subcategorydetails;
      if(this.subcategorylists.length===0){
        this.toas.error('Sub Categories not found Please add')
      }
    })
    this.imageSrc=this.editdata[0].image_uri,
    this.editform.patchValue({
      // image: this.editdata[0].image_uri,
      categoryname: this.editdata[0].cid,
      subcategoryname: this.editdata[0].sid,
      brandname: this.editdata[0].bid,
      productname: this.editdata[0].pname,
      va: this.editdata[0].va,
      price: this.editdata[0].price,
      type: this.editdata[0].type,
      carat: this.editdata[0].carat,
    
      description: this.editdata[0].description,
    });
  });
}

//edit data posting
editSubmit(){


  if (this.selectedfile1) {
    this.finalurl = this.selectedfile1;
  } else {
    this.finalurl = this.editdata.image_uri;
  }
  const editeddata = new FormData();
  editeddata.append('image_uri', this.finalurl);
  editeddata.append('cid',this.editform.get('categoryname')?.value);
  editeddata.append('sid',this.editform.get('subcategoryname')?.value);
  editeddata.append('bid',this.editform.get('brandname')?.value);
  editeddata.append('pname',this.editform.get('productname')?.value);
  editeddata.append('price',this.editform.get('price')?.value);
  editeddata.append('type',this.editform.get('type')?.value);
  editeddata.append('va',this.editform.get('va')?.value);
  editeddata.append('carat',this.editform.get('carat')?.value);
  editeddata.append('description',this.editform.get('description')?.value);
  editeddata.append('status',this.editdata[0].status);

  this.api.post(`/ecom/products/${this.editdata[0].id}`,editeddata).subscribe((res:any)=>{
    this.toas.success(res.message);
    this.editform.reset();
    this.productlist();
    $('#editproduct').modal('hide');
  },
  (error)=>{
  this.toas.error(error.error.message)
  })
}
  //pagination
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.productlist();
  }

  //modal refresh
  refresh(){
    this.postdata.get('productname')?.reset();
    this.postdata.get('va')?.reset();
    this.postdata.get('price')?.reset();
    this.postdata.get('description')?.reset();
    this.postdata.get('categoryname').setValue('');
    this.postdata.get('subcategoryname').setValue('');
    this.postdata.get('brandname').setValue('');
    this.postdata.get('type').setValue('');
    this.postdata.get('carat').setValue('');
  }


  // get subcat by cat
  onSubCategoryChange(event: any) {
    this.subcategoryValue = event.target.value;
    this.api.get(`/ecom/categories/subcategories/${this.subcategoryValue}`).subscribe((res:any)=>{
      this.subcategorylists=res.message[0].subcategorydetails;
      if(this.subcategorylists.length===0){
        this.toas.error('SubCategories not found please add')
      }
    })
  }





  delete(id:number){
    this.Http.deleteproducts(id).subscribe(res=>{
      this.toas.success("Successfully Deleted")
      this.productlist();
    },err=>{
      this.toas.error(err.error.message)

    })
  }
  validateNumber(event: { keyCode: any; preventDefault: () => void; }) {
    const keyCode = event.keyCode;
  
    const excludedKeys = [8, 37, 39, 46];
  
    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }
  
}

