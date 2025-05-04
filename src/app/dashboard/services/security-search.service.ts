import { Injectable } from '@angular/core';
import { SecuritySearchApiService } from '../data-access/services/security-search-api.service';
import { map, Observable } from 'rxjs';
import { SecuritySearchItem } from '../data-access/models/security-search-item';

@Injectable({
  providedIn: 'root',
})
export class SecuritySearchService {
  constructor(
    private readonly securitySearchApiService: SecuritySearchApiService,
  ) {}

  searchSecurity(term: string): Observable<SecuritySearchItem[]> {
    return this.securitySearchApiService
      .searchByTerm(term)
      .pipe(map((response) => response.response.result));
  }
}
