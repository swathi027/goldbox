import { Component } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
declare var $: any; // Declare jQuery
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-admincoupons',
  templateUrl: './admincoupons.component.html',
  styleUrls: ['./admincoupons.component.scss']
})
export class AdmincouponsComponent {

  tableData: any;
  public pageSize = 10;
  public totalData = 0;
  showFilter = false;
  page: any | 1;
  searchText: any;
  alldaata: any;
  form: any;
  updateForm: any;
  submitted = false;
  submitted2 = false;
  singledata: any;
  amounttt: any;
  userid: any;
  infodata: any;
  userData: any;
  singlecoupon: any;
  showContent: any;
  mydata:boolean=true;
  couponnnn:boolean=true;
  showContenttt: any;




  constructor(private datePipe: DatePipe,private api: ApiService, private formBuilder: FormBuilder, private toas: ToastrService) {
    this.form = this.formBuilder.group({
      amount: new FormControl('', Validators.required),
      from_date: new FormControl('', Validators.required),
      to_date: new FormControl('', Validators.required),
      minimum_transaction_amount: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      mobile:new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(10)])

    });
    this.updateForm = this.formBuilder.group({
      amount: new FormControl('', Validators.required),
      from_date: new FormControl('', Validators.required),
      to_date: new FormControl('', Validators.required),
      minimum_transaction_amount: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      mobile:new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(10)])

    });



  }

  ngOnInit(): void {
    this.admincoupons();
  }


  admincoupons() {
    this.api.get(`/coupon/admin/list`).subscribe((res: any) => {
      this.alldaata = res.message;
      this.singlecoupon=this.alldaata.message[0].coupon
    })
  }



  pageChanged(pageNumber: number) {
    this.page = pageNumber;
    this.admincoupons();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get f1(): { [key: string]: AbstractControl } {
    return this.updateForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.api.post(`/coupon/admin/store`, this.form.value).subscribe(res => {
        $('#exampleModal').modal('hide');
        this.submitted = false;
        this.form.reset();
        this.admincoupons()
        this.toas.success('coupon added successfully')
      },(error)=>{
        this.toas.error(error.error.message)

      })
    }


  }
  close() {
    this.submitted = false;
  }

  viewData(id: any) {
    this.singledata = this.alldaata.filter((a: any) => a.id === id)

  }

  editData(table: any) {
    this.userid = table.id;
        // Assuming you have a FormGroup named 'editform'
        const formattedFromDate = this.datePipe.transform(table.from_date, 'yyyy-MM-dd');
        const formattedToDate = this.datePipe.transform(table.to_date, 'yyyy-MM-dd');
    this.updateForm.patchValue({
      amount: table.amount,
      from_date: formattedFromDate,
      to_date: formattedToDate,
      minimum_transaction_amount: table.minimum_transaction_amount,
      description: table.description,
      mobile: table.mobilenumber.slice(2)

    })
  }

  update() {
    this.submitted2 = true;
    this.api.post(`/coupon/admin/update/${this.userid}`, this.updateForm.value).subscribe(() => {
      this.toas.success('Data updated successfully');
      $('#exampleModalll').modal('hide');
      this.admincoupons();
      this.submitted2 = false;
      this.updateForm.reset();

    },(error)=>{
      this.toas.error(error.error.message)

    })
  }


  updateproductstatus(data: any) {
const datas={
}

    this.api.post(`/coupon/festivals/status/${data.id}`,datas).subscribe(
      (res: any) => {
        this.toas.success(res.message);
      },(error)=>{
        this.toas.error(error.error.message)

      })
  }






  back() {
    this.showContenttt = !this.showContenttt;
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
