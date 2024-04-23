import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorServiceInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let jwtizedReq = request.clone({
      // url: `${environment._URL_}/${request.url}`,
      setHeaders: {
        // 'X-Api-Key': environment._APIKEY_
      }
    });
    
    const token = localStorage.getItem('user-access');
    jwtizedReq = jwtizedReq.clone({

      setHeaders: {
        Authorization: `${token}`,
      }
    });
    return next.handle(jwtizedReq).pipe(
      tap(
        (event) => {
          if (event.type === HttpEventType.Response) {
            if(event.status===403){
            localStorage.clear();
            this.router.navigate(['/signin']);
            }
          }
        }
      ),
      finalize(() => {
        // Any cleanup you want to do after the API call
      })
    );
  }
}