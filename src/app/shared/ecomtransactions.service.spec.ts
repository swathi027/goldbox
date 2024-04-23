import { TestBed } from '@angular/core/testing';

import { EcomtransactionsService } from './ecomtransactions.service';

describe('EcomtransactionsService', () => {
  let service: EcomtransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcomtransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
