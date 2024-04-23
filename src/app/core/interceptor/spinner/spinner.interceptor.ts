import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { SpinnerService } from '../../core.index';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinner: SpinnerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Check if the request URL is the one you want to exclude
    const isExcludedEndpoint = request.url.endsWith('/global/price/list');

    // If it's the excluded endpoint, just pass the request without showing the spinner
    if (isExcludedEndpoint) {
      return next.handle(request);
    }

    // Show the spinner for other requests
    this.spinner.show();

    return next.handle(request).pipe(
      finalize(() => {
        this.spinner.hide();
      }),
      catchError((error) => {
        if (error) {
          this.spinner.hide();
        }
        return throwError(error);
      })
    );
  }
}
