import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoneSizesComponent } from './stone-sizes.component';

describe('StoneSizesComponent', () => {
  let component: StoneSizesComponent;
  let fixture: ComponentFixture<StoneSizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoneSizesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoneSizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
