import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashBannersComponent } from './splash-banners.component';

describe('SplashBannersComponent', () => {
  let component: SplashBannersComponent;
  let fixture: ComponentFixture<SplashBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplashBannersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplashBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
