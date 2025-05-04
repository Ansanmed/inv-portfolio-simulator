import { TestBed } from '@angular/core/testing';

import { SecuritySearchService } from './security-search.service';

describe('SecuritySearchService', () => {
  let service: SecuritySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecuritySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
