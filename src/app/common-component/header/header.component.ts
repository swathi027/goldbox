import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event as RouterEvent } from '@angular/router';
import { SettingsService, SidebarService } from 'src/app/core/core.index';
import { ApiService } from 'src/app/api.service';
import * as Feather from 'feather-icons';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  activePath = '';
  showSearch = false;
  public changeLayout = '1';
  public darkTheme = false;
  public logoPath = '';
  public miniSidebar = false;
  elem=document.documentElement
  public addClass = false;
userrole: any;
username: any;


  constructor(
    private api:ApiService,
    private Router: Router,
    private settings: SettingsService,
    private sidebar: SidebarService
  ) {
    this.activePath = this.Router.url.split('/')[2];
    this.Router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.activePath = data.url.split('/')[2];
      }
    });
    this.settings.changeLayout.subscribe((res: string) => {
      this.changeLayout = res;
    });
    this.sidebar.sideBarPosition.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    this.settings.changeTheme.subscribe((res: string) => {
      if (res == 'Dark') {
        this.darkTheme = true;
        this.logoPath = 'assets/img/logo.png';
      } else {
        this.darkTheme = false;
        this.logoPath = 'assets/img/logo.png';
      }
    });
  }

  ngOnInit(): void {
    Feather.replace();
    this.getprofile()
  }

  public logout(): void {

    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#630914",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!"
    }).then((result:any) => {
      if (result.isConfirmed) {
        localStorage.clear()
        window.location.reload()
      }
    });
    
  }

  public toggleSidebar(): void {
    this.sidebar.switchSideMenuPosition();
  }

  public togglesMobileSideBar(): void {
    this.sidebar.switchMobileSideBarPosition();
  }

  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sidebar.expandSideBar.next(true);
    } else {
      this.sidebar.expandSideBar.next(false);
    }
  }


  getprofile(){
    this.userrole=localStorage.getItem('user-rolename');
    this.username=localStorage.getItem('user-name');
  }
}
