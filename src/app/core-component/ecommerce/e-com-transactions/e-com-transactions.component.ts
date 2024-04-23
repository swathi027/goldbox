import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcomtransactionsService } from 'src/app/shared/ecomtransactions.service';
@Component({
  selector: 'app-e-com-transactions',
  templateUrl: './e-com-transactions.component.html',
  styleUrls: ['./e-com-transactions.component.scss']
})
export class EComTransactionsComponent {

   submitted = false;
  form: any;
  
  data:any;
  sunil:any;
  tableData: any;
  toaster: any;
  getfestivalcoupons: any;
  updateForm: any;
  alldaata: any;
  singledata: any;
  page: any|1;
  alltransactions: any;
  searchText:any;

  constructor(private formBuilder: FormBuilder,private Http:EcomtransactionsService) {
    this.form = this.formBuilder.group({


      
    });
  }

  ngOnInit(): void {
    this.getmethod();
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    
}


viewData(id: any) {
  this.singledata = this.alltransactions.message.filter((a: any) => a.id === id)

}

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  getmethod(){
    this.Http.getdata().subscribe((res:any)=>{
      this.alltransactions=res.message;
    })
  }



  
}
