import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeEditComponent } from './scheme-edit.component';

describe('SchemeEditComponent', () => {
  let component: SchemeEditComponent;
  let fixture: ComponentFixture<SchemeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchemeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchemeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
