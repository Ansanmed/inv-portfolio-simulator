// src/app/auth/components/register.component.ts
import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';
import { AuthService } from '../../services/auth.service';
import { strongPasswordValidator } from '../../../utils/validators';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, Subject, switchMap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    TranslocoModule,
    MatProgressSpinnerModule,
  ],
})
export class RegisterComponent {
  registrationForm: FormGroup;

  private destroyRef = inject(DestroyRef);

  private submitSubject$ = new Subject();

  registrationResponse$ = this.submitSubject$.pipe(
    switchMap(() =>
      this.authService
        .register(
          this.registrationForm.value.email,
          this.registrationForm.value.password,
        )
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((err) => {
            console.error('Error en registro:', err);
            return EMPTY;
          }),
        ),
    ),
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, strongPasswordValidator()]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
      honeypot: [''],
    });
  }

  private passwordMatchValidator(
    control: AbstractControl,
  ): ValidationErrors | null {
    const password = control.parent?.get('password');
    const confirmPassword = control.parent?.get('confirmPassword');
    return password?.value === confirmPassword?.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit() {
    this.submitSubject$.next(null);
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }
}
