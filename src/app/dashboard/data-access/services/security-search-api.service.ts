import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { SecuritySearchResponse } from '../models/security-search-response';

@Injectable({
  providedIn: 'root',
})
export class SecuritySearchApiService {
  private baseUrl = environment.apiUrl;

  access_token: string | null;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
  ) {
    this.access_token = this.authService.getToken();
  }

  searchByTerm(term: string): Observable<SecuritySearchResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.access_token}`,
    });
    const url = `${this.baseUrl}/api/securities/search?searchTerm=${term}&exchange=US`;
    console.log('url: ', url);

    return this.http.get<SecuritySearchResponse>(url, {
      headers: headers,
    });
  }
}
