import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrl: 'header.component.scss',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    TranslocoModule,
    FormsModule,
    RouterModule,
  ],
})
export class HeaderComponent {
  availableLangs = ['en', 'de', 'es'];
  selectedLang: string;

  constructor(private translocoService: TranslocoService) {
    this.selectedLang = this.translocoService.getActiveLang();
  }

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('preferredLang', lang);
  }
}
