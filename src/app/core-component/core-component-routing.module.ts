import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponentComponent } from './core-component.component';
import { AuthGuard } from '../core/core.index';



// scheems
import { SchemeListComponent } from './scheme-management/scheme-list/scheme-list.component';
import { SchemeAddComponent } from './scheme-management/scheme-add/scheme-add.component';
import { SchemeEditComponent } from './scheme-management/scheme-edit/scheme-edit.component';
import { SchemeUsersComponent } from './scheme-management/scheme-users/scheme-users.component';
import { SchemeUserInfoComponent } from './scheme-management/scheme-user-info/scheme-user-info.component';
import { SchemeInfoComponent } from './scheme-management/scheme-info/scheme-info.component';
import { BuyGoldComponent } from './scheme-management/buy-gold/buy-gold.component';
//Ecomerce
import { CategoryListComponent } from './ecommerce/categories/category-list/category-list.component';
import { SubcategoriesListComponent } from './ecommerce/subcategories-list/subcategories-list.component';
import { ProductsListComponent } from './ecommerce/products-list/products-list.component';
import { ProductSizesComponent } from './ecommerce/product-sizes/product-sizes.component';
import { StoneSizesComponent } from './ecommerce/stone-sizes/stone-sizes.component';
import { BrandsListComponent } from './ecommerce/brands-list/brands-list.component';
import { EcommerceOrdersComponent } from './ecommerce/ecommerce-orders/ecommerce-orders.component';
import { EcomInfoComponent } from './ecommerce/ecommerce-orders/ecom-info/ecom-info.component';

//Kyc,Otp llist
import { UserKycComponent } from './users/user-kyc/user-kyc.component';
import { OtpListComponent } from './otp/otp-list/otp-list.component';


// user
import { UserTransactionsComponent } from './users/transactions/transactions.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { InfoComponent } from './users/info/info.component';
import { UserLogsComponent } from './users/user-logs/user-logs.component';

//Banners
import { SplashBannersComponent } from './banners/splash-banners/splash-banners.component';
import { EcomBannersComponent } from './banners/ecom-banners/ecom-banners.component';
import { MainBannersComponent } from './banners/main-banners/main-banners.component';
// transactions
import { TransactionsComponent } from './transactions/transactions.component';
import { FestivalCouponsListComponent } from './coupons/festival-coupons-list/festival-coupons-list.component';
import { CouponsListInfoComponent } from './coupons/coupons-list-info/coupons-list-info.component';
import { AllGiftCardsComponent } from './gift-cards/all-gift-cards/all-gift-cards.component';
import { GiftCardBuyUsersComponent } from './gift-cards/gift-card-buy-users/gift-card-buy-users.component';
import { GiftCardUsedUsersComponent } from './gift-cards/gift-card-used-users/gift-card-used-users.component';

// notifications
import { NotificationsComponent } from './notifications/notifications/notifications.component';
import { EComTransactionsComponent } from './ecommerce/e-com-transactions/e-com-transactions.component';
import { AdmincouponsComponent } from './coupons/admincoupons/admincoupons.component';

// roles
import { RoleListComponent } from './roles/role-list/role-list.component';

// Admin users
import { AdminUsersComponent } from './admin-users/admin-users.component';

// Events
import { EventsListComponent } from './events/events-list/events-list.component';
import { EventInfoComponent } from './events/event-info/event-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: CoreComponentComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'schemes',
        
        children: [
          {path: 'list', component: SchemeListComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3'] }},
          {path: 'add', component: SchemeAddComponent},
          {path: 'edit', component: SchemeEditComponent},
          {path: 'users', component: SchemeUsersComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','6'] }},
          {path: 'info/:id', component: SchemeInfoComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3']}},
          {path: 'users-info/:id', component: SchemeUserInfoComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3',,'6'] } },
          {path: 'buygold', component: BuyGoldComponent},
        ]
      },
      {
        path: 'users',
        children: [
          {path: 'users-list', component: UsersListComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','6'] }},
          {path: 'userkyc', component: UserKycComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','6'] }},
          {path: 'logs/:id', component: UserLogsComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','6'] }},
          {path: 'info/:id', component: InfoComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','6'] }},
          {path: 'trasactions/:id', component: UserTransactionsComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','5','6'] }}  
        ]
      },
      {
        path: 'coupons',
        children: [
          {path: 'festival-coupons-list', component: FestivalCouponsListComponent},
          {path: 'festival-coupons-list-info/:id', component: CouponsListInfoComponent},
          {path: 'admin-coupons', component:AdmincouponsComponent,data: { restrictToRoles: ['1', '2','3'],}},
        ]
      },
      {
        path: 'giftcard',
        children: [
          {path: 'all-gift-cards', component: AllGiftCardsComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','4'] }},
          {path: 'gift-card-buy-users/:id', component: GiftCardBuyUsersComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','4'] }},
          {path: 'gift-card-used-users/:id', component: GiftCardUsedUsersComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','4'] }},
        ]
      },
      {
        path: 'otp',component:OtpListComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3'] },
      },
      {
        path: 'transactions',component:TransactionsComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','5'] },  
      },
      {
        path: 'ecommerce',
        children: [
          {path: 'category', component: CategoryListComponent},
          {path: 'sub-category', component: SubcategoriesListComponent},
          {path: 'products', component: ProductsListComponent},
          {path: 'products-sizes/:id', component: ProductSizesComponent},
          {path: 'stone-sizes/:id', component: StoneSizesComponent},
          {path: 'brands', component: BrandsListComponent},
          {path: 'ecommerce-orders', component: EcommerceOrdersComponent},
          {path: 'ecom-info', component: EcomInfoComponent},
          {path: 'ecom-transactions', component: EComTransactionsComponent,data: { restrictToRoles: ['1', '2','3',]}},
        ]
      },
      {
        path:'banners',
        children: [
          {path:'splash-banner',component:SplashBannersComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','4'] }},
          {path:'ecom-banner',component:EcomBannersComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','4'] }},
          {path:'main-banner',component:MainBannersComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','4'] }},
        ]
      },
      {path:'notifications',component:NotificationsComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3','4'] }},
      {path:'roles',component:RoleListComponent,canActivate:[AuthGuard],data: { restrictToRoles: ['1', '2','3'] }},
      {path:'fms-users',component:AdminUsersComponent,canActivate:[AuthGuard],data: {restrictToRoles: ['1','3'] }},
      { path:'events',component:EventsListComponent,canActivate:[AuthGuard],data:{restrictToRoles: ['1','2','3']}},
      { path:'events/:id',component:EventInfoComponent,canActivate:[AuthGuard],data:{restrictToRoles: ['1','2','3']}}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreComponentRoutingModule {}
