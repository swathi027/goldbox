import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeUsersComponent } from './scheme-users.component';

describe('SchemeUsersComponent', () => {
  let component: SchemeUsersComponent;
  let fixture: ComponentFixture<SchemeUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeUsersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
