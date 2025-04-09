import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private defaultConfig: MatSnackBarConfig = {
    duration: 50000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
    panelClass: ['custom-toast'],
  };

  constructor(
    private snackBar: MatSnackBar,
    private translocoService: TranslocoService,
  ) {}

  private show(messageKey: string, config: MatSnackBarConfig = {}) {
    const translatedMessage = this.translocoService.translate(messageKey);
    return this.snackBar.open(translatedMessage, '×', {
      ...this.defaultConfig,
      ...config,
    });
  }

  info(messageKey: string, config: MatSnackBarConfig = {}) {
    const panelClass = Array.isArray(this.defaultConfig.panelClass)
      ? [...this.defaultConfig.panelClass, 'info-toast']
      : ['info-toast'];

    return this.show(messageKey, {
      ...config,
      panelClass: config.panelClass
        ? [...panelClass, ...config.panelClass]
        : panelClass,
    });
  }

  warning(messageKey: string, config: MatSnackBarConfig = {}) {
    const panelClass = Array.isArray(this.defaultConfig.panelClass)
      ? [...this.defaultConfig.panelClass, 'warning-toast']
      : ['warning-toast'];

    return this.show(messageKey, {
      ...config,
      panelClass: config.panelClass
        ? [...panelClass, ...config.panelClass]
        : panelClass,
    });
  }

  error(messageKey: string, config: MatSnackBarConfig = {}) {
    const panelClass = Array.isArray(this.defaultConfig.panelClass)
      ? [...this.defaultConfig.panelClass, 'error-toast']
      : ['error-toast'];

    return this.show(messageKey, {
      ...config,
      panelClass: config.panelClass
        ? [...panelClass, ...config.panelClass]
        : panelClass,
    });
  }

  dismissAll() {
    this.snackBar.dismiss();
  }
}
