import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  expectedRoles: any;
  loginRole: any;
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {


      
      
    if (localStorage.getItem('user-access') !== null) {

      // User has access, allow navigation
      this.expectedRoles = route.data['restrictToRoles'];
      if (this.expectedRoles) {
        this.expectedRoles = route.data['restrictToRoles'];
       this.loginRole = localStorage.getItem('user-roleid');
      const result= this.isRoleInArray(this.expectedRoles,this.loginRole)
      if(result===true){
        return true;
      }else{
      this.router.navigate(['/errorpages/error500']);
      // Return false to prevent navigation to the protected route
      return false;
      }
      }
      return true;

    } else {
      // User doesn't have access, navigate to sign-in page
      this.router.navigate(['/signin']);
      // Return false to prevent navigation to the protected route
      return false;
    }
  }
private isRoleInArray(a:any,b:any){
  return a.includes(b);
}
}
