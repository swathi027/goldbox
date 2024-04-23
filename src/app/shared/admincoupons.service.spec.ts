import { TestBed } from '@angular/core/testing';

import { AdmincouponsService } from './admincoupons.service';

describe('AdmincouponsService', () => {
  let service: AdmincouponsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmincouponsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
