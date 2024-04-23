import { Component } from '@angular/core';
import { SidebarService} from 'src/app/core/core.index';
import { ActivatedRoute, NavigationEnd, Router, Event as RouterEvent } from '@angular/router';
import { url } from 'src/app/shared/model/sidebar.model';

@Component({
  selector: 'app-sidebar-one',
  templateUrl: './sidebar-one.component.html',
  styleUrls: ['./sidebar-one.component.scss'],
})
export class SidebarOneComponent{
  base = '';
  page = '';
  currentUrl = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public side_bar_data: Array<any> = [];
  roleid: any;

  constructor(
    private Router: Router,
    private sidebar: SidebarService,
    private router: Router,
    private activeRouter:ActivatedRoute
  ) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
      }
    });
    this.getRoutes(this.router);
    this.roleid=localStorage.getItem('user-roleid');
    this.side_bar_data = this.sidebar.sidebarData1;
  }

  private getRoutes(route: url): void {
    const splitVal = route.url.split('/');
    this.currentUrl = route.url;
    this.base = splitVal[1];
    this.page = splitVal[2];
  }

  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sidebar.expandSideBar.next(true);
    } else {
      this.sidebar.expandSideBar.next(false);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public expandSubMenus(menu: any): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.side_bar_data.map((mainMenus: any) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mainMenus.menu.map((resMenu: any) => {
        if (resMenu.menuValue == menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }


  // validation of roles
  isUserInRole(roleString: string): boolean {
    // Split the roleString into an array of role values
    const roles = roleString.split(',');
    // Check if roleId is present in the roles array
    return roles.includes(this.roleid.toString());
  }
}
