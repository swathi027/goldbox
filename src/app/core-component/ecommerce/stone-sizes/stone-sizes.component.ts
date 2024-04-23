import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { StonesService } from 'src/app/shared/stones.service';
declare var $: any; // Declare jQuery

@Component({
  selector: 'app-stone-sizes',
  templateUrl: './stone-sizes.component.html',
  styleUrls: ['./stone-sizes.component.scss']
})
export class StoneSizesComponent {
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
  sizeslist: any;

  constructor(
    private api: ApiService, private router: ActivatedRoute, private toas:ToastrService, private formBuilder: FormBuilder,private Http:StonesService){
      this.postdata = this.formBuilder.group({
        stonename: ['', Validators.required],
        colour: ['', Validators.required],
        stoneprice: ['', Validators.required],
        noofstones: ['', Validators.required]
      });
      this.editform = this.formBuilder.group({
        stonename: ['', Validators.required],
        colour: ['', Validators.required],
        stoneprice: ['', Validators.required],
        noofstones: ['', Validators.required]
      });
  }

  ngOnInit():void{
    this.stonesizelist();
  }

//stoneslist
  stonesizelist(){
    const pid = this.router.snapshot.paramMap.get('id');
    this.api.get(`/ecom/productstones/list/${pid}`).subscribe((res:any)=>{
      this.tableData=res.message;
    })
  }

//Post Stone
  onSubmit(): void{
    // if(this.postdata.invalid){
    //   this.toas.error('All fields are required')
    //   return
    // }
    const postdata = new FormData();
    this.productid=this.router.snapshot.paramMap.get('id')
    const data={
      pid:this.productid,
      stonename:this.postdata.get('stonename').value,
      colour:this.postdata.get('colour').value,
      stoneprice:this.postdata.get('stoneprice').value,
      noofstones:this.postdata.get('noofstones').value,
    }
    this.api.post('/ecom/productstones/',data).subscribe(
      (res: any) => {
        this.toas.success(res.message);
        this.postdata.reset();
        this.stonesizelist();
        $('#addstone').modal('hide');
      },
      (error) => {
        this.toas.error(error.error.message);
      }
    );
  }

  //update stone
  updatestonestatus(table:any){
    // const data = {
    //   status:table.status
    // };
  this.api.post(`/ecom/productstones/${table.id}`, table).subscribe(
  (res: any) => {
    this.toas.success(res.message);
    this.stonesizelist(); // Assuming you have a method to refresh the categories list
  },
  (error) => {
    console.error('Error Updating Stone Details', error);
  });
}

  //single stone data
  singledata(id:any){
  this.api.get(`/ecom/productstones/${id}`).subscribe((res: any) => {
    this.editdata=res.message[0];
      // Assuming you have a FormGroup named 'editform'
    this.editform.patchValue({
      stonename: this.editdata.stonename,
      colour: this.editdata.colour,
      stoneprice: this.editdata.stoneprice,
      noofstones: this.editdata.noofstones,
    });
    })
}

  //update stone
  editSubmit():void{
    const editeddata = new FormData();
    this.productid=this.router.snapshot.paramMap.get('id')
    const data={
      pid:this.productid,
      stonename:this.editform.get('stonename').value,
      colour:this.editform.get('colour').value,
      stoneprice:this.editform.get('stoneprice').value,
      noofstones:this.editform.get('noofstones').value,
    }
    this.api.post(`/ecom/productstones/${this.editdata.id}`,data).subscribe((res:any)=>{
      this.toas.success(res.message);
      this.stonesizelist();
      $('#editstone').modal('hide');
    },
    (error)=>{
    this.toas.error(error.error.message)
    })
}


  //Pagination
  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.stonesizelist();
  }

  //modal refresh
  refresh(){
    this.postdata.get('stonename')?.reset();
    this.postdata.get('colour')?.reset();
    this.postdata.get('stoneprice')?.reset();
    this.postdata.get('noofstones')?.reset();
  }




  delete(id:any){
    this.Http.deletestones(id).subscribe(res=>{
      this.toas.success("Successfully Deleted")
      this.stonesizelist();
    },err=>{
      this.toas.success("Went wrong")
    });
  }


}