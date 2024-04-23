import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllGiftCardsComponent } from './all-gift-cards.component';

describe('AllGiftCardsComponent', () => {
  let component: AllGiftCardsComponent;
  let fixture: ComponentFixture<AllGiftCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGiftCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllGiftCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
