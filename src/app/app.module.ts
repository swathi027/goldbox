import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeatherModule } from 'angular-feather';
import { LoaderComponent } from './common-component/loader/loader.component';
import { sharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorServiceInterceptor } from './core/interceptor/interceptor.service.interceptor';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
// Import AngularFire modules
import{initializeApp} from 'firebase/app';
import { environment } from 'src/environments/environment';
initializeApp(environment.firebase)
@NgModule({
  declarations: [AppComponent, LoaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,sharedModule, BrowserAnimationsModule,ToastrModule.forRoot(),NgxPaginationModule],
  exports: [FeatherModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorServiceInterceptor, multi: true},],
  bootstrap: [AppComponent],
})
export class AppModule {}
