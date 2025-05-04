import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../auth/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.scss',
  imports: [
    CommonModule,
    MatToolbarModule,
    TranslocoModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  availableLangs = ['en', 'de', 'es'];
  selectedLang: string;
  isLogged$: Observable<boolean>;

  constructor(
    private translocoService: TranslocoService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
    this.selectedLang = this.translocoService.getActiveLang();
    this.isLogged$ = this.authService.isAuthenticatedObservable();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('preferredLang', lang);
  }
}
