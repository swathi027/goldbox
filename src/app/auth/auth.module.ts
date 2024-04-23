import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AppLivepricesComponent } from './app-liveprices/app-liveprices.component';
import { DEFAULT_CURRENCY_CODE} from '@angular/core';

@NgModule({
  declarations: [
    AuthComponent,
    AppLivepricesComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'INR'},
  ],
})
export class AuthModule { }
