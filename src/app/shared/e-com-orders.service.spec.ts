import { TestBed } from '@angular/core/testing';

import { EComOrdersService } from './e-com-orders.service';

describe('EComOrdersService', () => {
  let service: EComOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EComOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
