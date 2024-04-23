import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EComTransactionsComponent } from './e-com-transactions.component';

describe('EComTransactionsComponent', () => {
  let component: EComTransactionsComponent;
  let fixture: ComponentFixture<EComTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EComTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EComTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
