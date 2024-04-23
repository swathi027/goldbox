import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CountToModule } from 'angular-count-to';

import { FeatherModule } from 'angular-feather';

import { SpinnerInterceptor } from '../core/interceptor/spinner/spinner.interceptor';
import { MaterialModule } from './material/material.module';
import { FeatherIconModule } from './feather/feather.module';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CustomPaginationModule } from './custom-pagination/custom-pagination.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxbootstrapModule } from 'src/app/shared/ngx-bootstrap/ngxbootstrap.module';


import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
} from 'ngx-perfect-scrollbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgChartsModule } from 'ng2-charts';
import { NgxMaskModule } from 'ngx-mask';
import { DatepickerModule } from 'ng2-datepicker';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};
@NgModule({
  imports: [
    PerfectScrollbarModule,
    FeatherIconModule,
    MaterialModule,
    HttpClientModule,
    NgApexchartsModule,
    CountToModule,
    FormsModule,
    CarouselModule,
    CustomPaginationModule,
    PerfectScrollbarModule,
    DragDropModule,
    AngularEditorModule,
    NgxMaskModule.forRoot({
      showMaskTyped: false,
    }),
    NgChartsModule.forRoot(),
    FullCalendarModule,
    DatepickerModule,
    NgxbootstrapModule
  ],
  exports: [
    FeatherModule,
    PerfectScrollbarModule,
    MaterialModule,
    HttpClientModule,
    FeatherIconModule,
    CountToModule,
    NgApexchartsModule,
    FormsModule,
    CarouselModule,
    CustomPaginationModule,
    PerfectScrollbarModule,
    DragDropModule,
    AngularEditorModule,
    NgChartsModule,
    FullCalendarModule,
    DatepickerModule,
    NgxbootstrapModule
  ],
  providers: [

    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class sharedModule {}
