import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SidebarService {
 
  public sideBarPosition: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('sideBarPosition') || 'false'
  );

  public toggleMobileSideBar: BehaviorSubject<string> =
    new BehaviorSubject<string>(
      localStorage.getItem('isMobileSidebar') || 'false'
    );

  public expandSideBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  public switchSideMenuPosition(): void {
    if (localStorage.getItem('sideBarPosition')) {
      this.sideBarPosition.next('false');
      this.expandSideBar.next(true);
      localStorage.removeItem('sideBarPosition');
    } else {
      this.sideBarPosition.next('true');
      this.expandSideBar.next(false);
      localStorage.setItem('sideBarPosition', 'true');
    }
  }

  public switchMobileSideBarPosition(): void {
    if (localStorage.getItem('isMobileSidebar')) {
      this.toggleMobileSideBar.next('false');
      localStorage.removeItem('isMobileSidebar');
    } else {
      this.toggleMobileSideBar.next('true');
      localStorage.setItem('isMobileSidebar', 'true');
    }
  }


  public sidebarData1 = [
    {
      showAsTab: true,
      separateRoute: false,
      menu: [
        {
          menuValue: 'Dashboard',
          route: 'dashboard',
          role:'1,2,3,4,5,6',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'grid',
          subMenus: [],
        },
        {
          menuValue: 'Users',
          role:'1,2,3,6',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'users',
          subMenus: [
            {
              menuValue: 'Users List',
              role:'1,2,3,6',
              route: 'users/users-list',
              icon: 'user-check',
              hasSubRoute: true,
              showSubRoute: false,
            },
            {
              menuValue: 'User KYC',
              role:'1,2,3,6',
              route: 'users/userkyc',
              icon: 'user-plus',
              hasSubRoute: true,
              showSubRoute: false,
            },

           
            
          ],
        },
        {
          menuValue: 'Schemes',
          role:'1,2,3,6',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'smartphone',
          subMenus: [
            {
              menuValue: 'Scheme List',
              role:'1,2,3',
              route: 'schemes/list',
              icon:'list',
              hasSubRoute: true,
              showSubRoute: false,
            },
            {
              menuValue: 'Scheme Users',
              role:'1,2,3,6',
              route: 'schemes/users',
              icon:'user-check',
              hasSubRoute: true,
              showSubRoute: false,
            },
            {
              menuValue: 'Buy Gold',
              role:'1,2,3',
              route: 'schemes/buygold',
              icon:'users',
              hasSubRoute: true,
              showSubRoute: false,
            },
            
          ],
        },
        {
          menuValue: 'Ecommerce',
          role:'1,2,3,4',
          hasSubRoute: true,
          icon: 'layers',
          showSubRoute: false,
          route: 'routes.settings',
          subMenus: [
            {
              menuValue: 'Category',
              role:'1,2,3,4',
              route: 'ecommerce/category',
              page: 'add-category',
              page2: 'edit-category',
              hasSubRoute: false,
              showSubRoute: false,
              icon: 'codepen',
              subMenus: [],
            },
            {
              menuValue: 'Sub Category',
              role:'1,2,3,4',
              route: 'ecommerce/sub-category',
              page: 'sub-add-category',
              page2: 'edit-subcategory',
              hasSubRoute: false,
              showSubRoute: false,
              icon: 'speaker',
              subMenus: [],
            },
            {
              menuValue: 'Products',
              role:'1,2,3,4',
              route: 'ecommerce/products',
              page: 'edit-product',
              hasSubRoute: false,
              showSubRoute: false,
              icon: 'box',
              subMenus: [],
            },
            {
              menuValue: 'Brands',
              role:'1,2,3,4',
              route: 'ecommerce/brands',
              page: 'add-brand',
              page2: 'edit-brand',
              hasSubRoute: false,
              showSubRoute: false,
              icon: 'tag',
              subMenus: [],
            }, 
            {
              menuValue: 'Ecommerce Orders',
              role:'1,2,3,4',
              route: 'ecommerce/ecommerce-orders',
              page: 'add-brand',
              page2: 'edit-brand',
              hasSubRoute: false, 
              showSubRoute: false,
              icon: 'shopping-bag',
              subMenus: [],
            },
            {
              menuValue: 'Ecom-Transactions',
              role:'1,2,3',
              route: 'ecommerce/ecom-transactions',
              page: 'add-brand',
              page2: 'edit-brand',
              hasSubRoute: false, 
              showSubRoute: false,
              icon: 'shopping-bag',
              subMenus: [],
            },
          ],
        },
        {
          menuValue: 'Banners',
          role:'1,2,3,4',
          hasSubRoute: true,
          icon: 'image',
          showSubRoute: false,
          route: 'routes.settings',
          subMenus: [
            {
              menuValue: 'Main Banners',
              role:'1,2,3,4',
              route: 'banners/main-banner',
              hasSubRoute: false,
              showSubRoute: false,
              icon: 'info',
              subMenus: [],
            },
            {
              menuValue: 'Splash Banners',
              role:'1,2,3,4',
              route: 'banners/splash-banner',
              hasSubRoute: false,
              showSubRoute: false,
              icon: 'star',
              subMenus: [],
            },
            {
              menuValue: 'Ecom Banners',
              role:'1,2,3,4',
              route: 'banners/ecom-banner',
              hasSubRoute: false,
              showSubRoute: false,
              icon: 'speaker',
              subMenus: [],
            },
            
          ],
        },
        {
          menuValue: 'Coupons',
          role:'1,2,3,4',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'eye',
          subMenus: [
            {
              menuValue: 'Coupons List',
              role:'1,2,3,4',
              route: 'coupons/festival-coupons-list',
              icon:'list',
              hasSubRoute: true,
              showSubRoute: false,
            },
            {
              menuValue: 'Admin Coupons',
              role:'1,2,3',
              route: 'coupons/admin-coupons',
              icon:'list',
              hasSubRoute: true,
              showSubRoute: false,
            },
          ],
        },
        {
          menuValue: 'Gift Cards',
          role:'1,2,3,4',
          hasSubRoute: true,
          showSubRoute: false,
          icon: 'gift',
          subMenus: [
            {
              menuValue: 'All Gift cards',
              role:'1,2,3,4',
              route: 'giftcard/all-gift-cards',
              icon:'gift',
              hasSubRoute: true,
              showSubRoute: false,
            },
          
            
          ],
        },
        {
          menuValue: 'Notifications',
          role:'1,2,3,4',
          route: 'notifications',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'bell',
          subMenus: [],
        },
        {
          menuValue: 'Transactions',
          role:'1,2,3,5',
          route: 'transactions',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'list',
          subMenus: [],
        },
        {
          menuValue: 'Events',
          role:'1,2,3',
          route: 'events',
          hasSubRoute: false,
          showSubRoute: false,
          icon: 'box',
          subMenus: [],
        },
        {
          menuValue: 'Settings',
          role:'1,2,3',
          hasSubRoute: true,
          icon: 'settings',
          showSubRoute: false,
          route: 'routes.settings',
          subMenus: [
            {
              menuValue: 'OTP List',
              role:'1,2,3',
              route: 'otp',
              hasSubRoute: false,
              showSubRoute: false,
              icon: 'list',
              subMenus: [],
            },
            {
              menuValue: 'Roles',
              role:'1,2,3',
              route: 'roles',
              hasSubRoute: false,
              showSubRoute: false,
              icon: 'info',
              subMenus: [],
            },
            {
              menuValue: 'FMS Users',
              role:'1,3',
              route: 'fms-users',
              hasSubRoute: false,
              showSubRoute: false,
              icon: 'users',
              subMenus: [],
            },
          ],
        },
        
      ],
    }
  ];

      }
