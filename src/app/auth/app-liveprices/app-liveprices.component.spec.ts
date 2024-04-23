import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLivepricesComponent } from './app-liveprices.component';

describe('AppLivepricesComponent', () => {
  let component: AppLivepricesComponent;
  let fixture: ComponentFixture<AppLivepricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppLivepricesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppLivepricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
