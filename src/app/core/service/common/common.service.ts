import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
   

  private _currency = new BehaviorSubject<string>('INR');
  public readonly currency$ = this._currency.asObservable();
}
