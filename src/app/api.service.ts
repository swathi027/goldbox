import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import { BehaviorSubject, Observable, Subject, catchError, interval, merge, switchMap, throwError } from 'rxjs';
import { SpinnerService } from './core/core.index';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverEndpoint = `${environment.apiUrl}`;
  public cartData$:Subject<any> = new Subject;
  public wishCountData$:Subject<any> = new Subject;
  private refreshInterval = 1000;
 
  constructor(
    private http: HttpClient,
    private spinner: SpinnerService
  ) {
    if (environment.production) {
      this.serverEndpoint = environment.apiUrl;
    }
  }
 
  /**
   *
   * @param endpoint
   * @param data
   * @param headers
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  post(endpoint: any, data: any, headers?: {}) {
    return this.http.post(this.serverEndpoint + endpoint, data, headers);
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  get(endpoint: string, params?: {}) {
    return this.http.get(this.serverEndpoint + endpoint, params);
  }
  liveprice() {
    const endPoint = `/global/price/list`
    return this.http.get(this.serverEndpoint + endPoint);
  }
 

  /**
   *
   * @param endpoint
   * @param params
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  delete(endpoint: string, params?: {}) {
    return this.http.delete(this.serverEndpoint + endpoint, params);
  }

  /**
   *
   * @param endpoint
   * @param params
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  put(endpoint: string, params?: {}) {
    return this.http.put(this.serverEndpoint + endpoint, params);
  }
}
