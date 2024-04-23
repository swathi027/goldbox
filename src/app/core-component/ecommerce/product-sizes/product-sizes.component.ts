import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/shared/products.service';
import { ProductsizeService } from 'src/app/shared/productsize.service';

declare var $: any; // Declare jQuery

@Component({
  selector: 'app-product-sizes',
  templateUrl: './product-sizes.component.html',
  styleUrls: ['./product-sizes.component.scss']
})
export class ProductSizesComponent {
  sortData: any;
  initChecked = false;
  isChecked = true;
  // pagination variables
  public pageSize = 12;
  public totalData = 0;
  showFilter = false;
  public searchDataValue = '';

  myControl: any;
  page:any=1;
  tableData: any;
  searchText: any;
  subscribedata: any;
  transactiondata: any;
  editform:any;
  postdata:any;
  editdata: any;
  productid: any;
  

  constructor(
    private api: ApiService, private router: ActivatedRoute, private toas:ToastrService, private formBuilder: FormBuilder, private Http:ProductsizeService){
    this.postdata = this.formBuilder.group({
      name: ['', Validators.required],
      size: ['', Validators.required],
      weight: ['', Validators.required]
    });

    this.editform=this.formBuilder.group({
      name: ['', Validators.required],
      size: ['', Validators.required],
      weight: ['', Validators.required]
    })   
  }


  ngOnInit(): void {
    this.productsizelist();
  }

  //productsize list
  productsizelist(){
    const id = this.router.snapshot.paramMap.get('id');
    this.api.get(`/ecom/productsizes/list/${id}`).subscribe((res: any) => {
      this.tableData=res.message
      })
  }

  // post sizes
  onSubmit(): void {
    const postdata = new FormData();
    this.productid=this.router.snapshot.paramMap.get('id')
    const data={
      pid:this.productid,
      sizes:this.postdata.get('size').value,
      weight:this.postdata.get('weight').value,
    }
    this.api.post('/ecom/productsizes/',data).subscribe(
      (res: any) => {
        this.toas.success(res.message);
        this.postdata.reset();
        this.productsizelist();
        $('#addproductsize').modal('hide');
      },
      (error) => {
        this.toas.error(error.error.message);
      }
    );
  }

  //update size
  updatesizestatus(table:any){
    // const data = {
    //   status:table.status
    // };
  this.api.post(`/ecom/productsizes/${table.id}`, table).subscribe(
  (res: any) => {
    this.toas.success(res.message);
    this.productsizelist(); // Assuming you have a method to refresh the categories list
  },
  (error) => {
    console.error('Error Updating Product Size', error);
  }
);
  }

  //single data
  singledata(id:any){
    this.api.get(`/ecom/productsizes/${id}`).subscribe((res: any) => {
      this.editdata=res.message[0];
        // Assuming you have a FormGroup named 'editform'
      this.editform.patchValue({
        size: this.editdata.sizes,
        weight: this.editdata.weight,
      });
      })
  }

  //edit size
  editSubmit(){
    const editeddata = new FormData();
    this.productid=this.router.snapshot.paramMap.get('id')
    const data={
      pid:this.productid,
      sizes:this.editform.get('size').value,
      weight:this.editform.get('weight').value,
    }
    this.api.post(`/ecom/productsizes/${this.editdata.id}`,data).subscribe((res:any)=>{
      this.toas.success(res.message);
      this.productsizelist();
      $('#editsize').modal('hide');
    },
    (error)=>{
    this.toas.error(error.error.message)
    })
  }

  //Pagination
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.productsizelist();
  }

  //modal refresh
  refresh(){
    this.postdata.get('size')?.reset();
    this.postdata.get('weight')?.reset();
  }



  delete(id:number){
    this.Http.deletesize(id).subscribe(res=>{
      this.toas.success("Successfully Deleted");

      this.productsizelist();
    },err=>{
      this.toas.success("Went wrong");
    });

  }
 
 


}
