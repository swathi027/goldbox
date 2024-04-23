import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsListInfoComponent } from './coupons-list-info.component';

describe('CouponsListInfoComponent', () => {
  let component: CouponsListInfoComponent;
  let fixture: ComponentFixture<CouponsListInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouponsListInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsListInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
