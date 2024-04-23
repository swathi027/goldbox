import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit{

  show = false;

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private api:ApiService,private toas:ToastrService,private route:Router) {}

  ngOnInit() {
  }

  // form SUbmisssion
  submit() {

    this.api.post('/login',this.form.value).subscribe((res:any)=>{
      localStorage.setItem('user-access',res.token)
      localStorage.setItem('user-email',res.admin.email)
      localStorage.setItem('user-roleid',res.admin.role)
      localStorage.setItem('user-rolename',res.roleName)
      localStorage.setItem('user-name',res.admin.name)
      
        this.toas.success('Login Successfully');
        this.route.navigate(['/dashboard'])
    },err=>{
      this.toas.error(err.error.message)
      })
    }

   // password
   togglePasswordVisibility(): void {
    this.show = !this.show;
  }
    
}
