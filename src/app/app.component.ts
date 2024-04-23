import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, Event as RouterEvent } from '@angular/router';
import { SettingsService, SpinnerService } from './core/core.index';
import { getMessaging, getToken } from 'firebase/messaging';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'template';
  public page = '';

  constructor(
    private settings: SettingsService,
    private router: Router,
    private spinner: SpinnerService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.page = event.url.split('/')[1];
        // Show the spinner unless it's the /liveprice endpoint
        if (!event.url.includes('/liveprice')) {
          this.spinner.show();
        }
      }

      if (event instanceof NavigationEnd) {
        // Hide the spinner at the end of navigation
        this.spinner.hide();
      }
    });
  }

  ngOnInit(): void {
    this.requestPermission();
  }

  requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, { vapidKey: environment.firebase.vpaidkey }).then(
      (currentToken) => {
        console.log(currentToken);
      }
    );
  }
}
