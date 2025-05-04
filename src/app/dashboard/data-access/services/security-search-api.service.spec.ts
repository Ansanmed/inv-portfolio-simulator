import { TestBed } from '@angular/core/testing';

import { SecuritySearchApiService } from './security-search-api.service';

describe('SecuritySearchApiService', () => {
  let service: SecuritySearchApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecuritySearchApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
