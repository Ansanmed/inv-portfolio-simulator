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
import { catchError, of } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastService } from '../../../shared/services/toast.service';

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
  loading = false;
  error: string | null = null;

  private destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private readonly toastService: ToastService,
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
    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const { email, password } = this.registrationForm.value;

    this.authService
      .register(email, password)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          this.toastService.error(err.code);
          this.loading = false;
          return of(null);
        }),
      )
      .subscribe((response) => {
        this.loading = false;
        if (response && response.accessToken) {
          this.router.navigate(['/dashboard']);
        }
      });
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
