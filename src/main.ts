import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { registerLocaleData } from '@angular/common';

import localeEn from '@angular/common/locales/en';
import localeDe from '@angular/common/locales/de';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEn, 'en');
registerLocaleData(localeDe, 'de');
registerLocaleData(localeEs, 'es');

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
