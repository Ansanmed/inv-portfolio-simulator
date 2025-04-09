import { Router, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { DashboardComponent } from './dashboard/components/dashboard/dashboard.component';
import { authGuard } from './auth/guards/auth.guard';
import { AuthService } from './auth/services/auth.service';
import { inject } from '@angular/core';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

export const ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [
      (): boolean => {
        const authService = inject(AuthService);
        const router = inject(Router);
        if (authService.isAuthenticated()) {
          router.navigate(['/dashboard']);
          return false;
        }
        return true;
      },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [
      (): boolean => {
        const authService = inject(AuthService);
        const router = inject(Router);
        if (authService.isAuthenticated()) {
          router.navigate(['/dashboard']);
          return false;
        }
        return true;
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard], // Usar el guard funcional
  },
  { path: '**', redirectTo: '' },
];
