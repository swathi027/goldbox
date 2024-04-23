import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKycComponent } from './user-kyc.component';

describe('UserKycComponent', () => {
  let component: UserKycComponent;
  let fixture: ComponentFixture<UserKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserKycComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
