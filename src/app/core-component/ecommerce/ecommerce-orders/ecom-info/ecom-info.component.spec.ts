import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcomInfoComponent } from './ecom-info.component';

describe('EcomInfoComponent', () => {
  let component: EcomInfoComponent;
  let fixture: ComponentFixture<EcomInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcomInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcomInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
