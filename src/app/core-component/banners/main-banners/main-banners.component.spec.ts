import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBannersComponent } from './main-banners.component';

describe('MainBannersComponent', () => {
  let component: MainBannersComponent;
  let fixture: ComponentFixture<MainBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBannersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
