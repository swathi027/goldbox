import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomBannersComponent } from './ecom-banners.component';

describe('EcomBannersComponent', () => {
  let component: EcomBannersComponent;
  let fixture: ComponentFixture<EcomBannersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcomBannersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcomBannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
