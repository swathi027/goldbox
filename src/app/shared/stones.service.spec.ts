import { TestBed } from '@angular/core/testing';

import { StonesService } from './stones.service';

describe('StonesService', () => {
  let service: StonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
