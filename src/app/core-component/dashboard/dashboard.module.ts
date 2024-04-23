import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FeatherModule } from 'angular-feather';
import { sharedModule } from 'src/app/shared/shared.index';
import { SearchPipe } from './search.pipe';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TransactionsComponent } from '../transactions/transactions.component';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [DashboardComponent, SearchPipe,TransactionsComponent],
  imports: [MatFormFieldModule, MatDatepickerModule, MatNativeDateModule,CommonModule, DashboardRoutingModule, sharedModule,NgxPaginationModule, FormsModule, ReactiveFormsModule],
  exports: [FeatherModule],
})
export class DashboardModule {
 
 
}
