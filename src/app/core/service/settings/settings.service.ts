import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public changeTheme: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('theme') || 'light'
  );
  public changeLayout: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('changeLayout') || '1'
  );

  public setLayout(value: string) {
    this.changeLayout.next(value);
    localStorage.setItem('changeLayout', value);
    // this.router.navigate([routes.dashboard]);
  }

  constructor(private router: Router) {}
}
