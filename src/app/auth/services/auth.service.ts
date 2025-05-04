import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthApiService } from '../data-access/auth-api.service';
import { LoginResponse } from '../models/login-response';
import { RegisterResponse } from '../models/register-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;

  private isAuthenticated$ = new BehaviorSubject(false);

  constructor(private readonly authApiService: AuthApiService) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.authApiService.login({ email, password }).pipe(
      tap((response) => {
        if (response && response.token) {
          this.setToken(response.token);
        }
      }),
      catchError((error) => {
        console.error('Error en login:', error);
        return throwError(() => new Error('Credenciales inválidas'));
      }),
    );
  }

  register(email: string, password: string): Observable<RegisterResponse> {
    return this.authApiService.register({ email, password }).pipe(
      tap((response) => {
        if (response && response.accessToken) {
          this.setToken(response.accessToken);
        }
      }),
      catchError((error) => {
        console.error('Error en register:', error);
        return throwError(() => new Error('Error al registrar el usuario'));
      }),
    );
  }

  private setToken(token: string): void {
    this.token = token;
    localStorage.setItem('accessToken', token);
    this.isAuthenticated$.next(true);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('accessToken');
    }
    this.isAuthenticated$.next(!!this.token);

    return this.token;
  }

  private getTokenPayload(
    token: string,
  ): { userId: string; iat: number; exp: number } | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const payload = this.getTokenPayload(token);
    if (!payload) {
      return true;
    }
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return payload.exp < currentTimestamp;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    return !this.isTokenExpired(token);
  }
  isAuthenticatedObservable(): Observable<boolean> {
    return this.isAuthenticated$.asObservable();
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('accessToken');
    this.isAuthenticated$.next(false);
  }
}
