import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeUserInfoComponent } from './scheme-user-info.component';

describe('SchemeUserInfoComponent', () => {
  let component: SchemeUserInfoComponent;
  let fixture: ComponentFixture<SchemeUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeUserInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemeUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
