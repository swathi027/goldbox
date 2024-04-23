import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CoreComponentRoutingModule } from './core-component-routing.module';
import { CoreComponentComponent } from './core-component.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {DEFAULT_CURRENCY_CODE} from '@angular/core';
import { NgxEditorModule } from 'ngx-editor';
import { searchfilter } from '../search-filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';



import {NgxPaginationModule} from 'ngx-pagination';
import { SidebarOneComponent } from '../common-component/sidebar-one/sidebar-one.component';
import { HeaderComponent } from '../common-component/header/header.component';
import { LayoutComponent } from '../common-component/layout/layout.component';
import { sharedModule } from '../shared/shared.module';

import { SchemeAddComponent } from './scheme-management/scheme-add/scheme-add.component';
import { SchemeEditComponent } from './scheme-management/scheme-edit/scheme-edit.component';
import { SchemeListComponent } from './scheme-management/scheme-list/scheme-list.component';
import { SchemeUsersComponent } from './scheme-management/scheme-users/scheme-users.component';

import { CategoryListComponent } from './ecommerce/categories/category-list/category-list.component';
import { SubcategoriesListComponent } from './ecommerce/subcategories-list/subcategories-list.component';
import { ProductsListComponent } from './ecommerce/products-list/products-list.component';
import { ProductSizesComponent } from './ecommerce/product-sizes/product-sizes.component';
import { BrandsListComponent } from './ecommerce/brands-list/brands-list.component';
import { EcommerceOrdersComponent } from './ecommerce/ecommerce-orders/ecommerce-orders.component';
import { EcomInfoComponent } from './ecommerce/ecommerce-orders/ecom-info/ecom-info.component';
import { SchemeUserInfoComponent } from './scheme-management/scheme-user-info/scheme-user-info.component';
import { SchemeInfoComponent } from './scheme-management/scheme-info/scheme-info.component';
import { UserKycComponent } from './users/user-kyc/user-kyc.component';
import { OtpListComponent } from './otp/otp-list/otp-list.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { InfoComponent } from './users/info/info.component';

import { StoneSizesComponent } from './ecommerce/stone-sizes/stone-sizes.component';
import { SplashBannersComponent } from './banners/splash-banners/splash-banners.component';
import { FestivalCouponsListComponent } from './coupons/festival-coupons-list/festival-coupons-list.component';
import { EcomBannersComponent } from './banners/ecom-banners/ecom-banners.component';
import { MainBannersComponent } from './banners/main-banners/main-banners.component';
import { CouponsListInfoComponent } from './coupons/coupons-list-info/coupons-list-info.component';
import { BuyGoldComponent } from './scheme-management/buy-gold/buy-gold.component';
import { AllGiftCardsComponent } from './gift-cards/all-gift-cards/all-gift-cards.component';
import { GiftCardBuyUsersComponent } from './gift-cards/gift-card-buy-users/gift-card-buy-users.component';
import { GiftCardUsedUsersComponent } from './gift-cards/gift-card-used-users/gift-card-used-users.component';
import { UserTransactionsComponent } from './users/transactions/transactions.component';
import { UserLogsComponent } from './users/user-logs/user-logs.component';
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { RoleListComponent } from './roles/role-list/role-list.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventInfoComponent } from './events/event-info/event-info.component';
import { EComTransactionsComponent } from './ecommerce/e-com-transactions/e-com-transactions.component';
import { AdmincouponsComponent } from './coupons/admincoupons/admincoupons.component';

@NgModule({
  declarations: [
    CoreComponentComponent,
    HeaderComponent,
    SidebarOneComponent,
    LayoutComponent,
    SchemeAddComponent,
    SchemeEditComponent,
    SchemeListComponent,
    CategoryListComponent,
    SchemeUsersComponent,
    SubcategoriesListComponent,
    ProductsListComponent,
    ProductSizesComponent,
    BrandsListComponent,
    EcommerceOrdersComponent,
    EcomInfoComponent,
    SchemeUserInfoComponent,
    SchemeInfoComponent,
    UserKycComponent,
    OtpListComponent,
    UsersListComponent,
    searchfilter,
    InfoComponent,
    StoneSizesComponent,
    SplashBannersComponent,
    FestivalCouponsListComponent,
    EcomBannersComponent,
    MainBannersComponent,
    CouponsListInfoComponent,
    BuyGoldComponent,
    AllGiftCardsComponent,
    GiftCardBuyUsersComponent,
    GiftCardUsedUsersComponent,
    UserTransactionsComponent,
    UserLogsComponent,
    NotificationsComponent,
    RoleListComponent,
    AdminUsersComponent,
    EventsListComponent,
    EventInfoComponent,
    EComTransactionsComponent,
    AdmincouponsComponent,
   
  ],
  imports: [HttpClientModule,CommonModule, CoreComponentRoutingModule, sharedModule,MatTableModule, MatPaginatorModule,NgxPaginationModule,FormsModule,ReactiveFormsModule,NgxEditorModule],
  providers: [
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'INR'},DatePipe
  ],
})
export class CoreComponentModule {}
