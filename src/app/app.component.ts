import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, TranslocoModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'inv-portfolio-simulator';
  private readonly translocoService = inject(TranslocoService);

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
