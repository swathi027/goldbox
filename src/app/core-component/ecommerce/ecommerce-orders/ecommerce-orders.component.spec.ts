import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceOrdersComponent } from './ecommerce-orders.component';

describe('EcommerceOrdersComponent', () => {
  let component: EcommerceOrdersComponent;
  let fixture: ComponentFixture<EcommerceOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcommerceOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
