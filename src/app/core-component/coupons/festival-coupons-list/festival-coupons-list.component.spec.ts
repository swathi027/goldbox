import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FestivalCouponsListComponent } from './festival-coupons-list.component';

describe('FestivalCouponsListComponent', () => {
  let component: FestivalCouponsListComponent;
  let fixture: ComponentFixture<FestivalCouponsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FestivalCouponsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FestivalCouponsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
