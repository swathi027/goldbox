import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardBuyUsersComponent } from './gift-card-buy-users.component';

describe('GiftCardBuyUsersComponent', () => {
  let component: GiftCardBuyUsersComponent;
  let fixture: ComponentFixture<GiftCardBuyUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCardBuyUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCardBuyUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
