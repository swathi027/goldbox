import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftCardUsedUsersComponent } from './gift-card-used-users.component';

describe('GiftCardUsedUsersComponent', () => {
  let component: GiftCardUsedUsersComponent;
  let fixture: ComponentFixture<GiftCardUsedUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftCardUsedUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiftCardUsedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
