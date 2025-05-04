import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InstrumentSearchComponent } from '../components/instrument-search/instrument-search.component';
@Injectable({
  providedIn: 'root',
})
export class InstrumentSearchService {
  constructor(private dialog: MatDialog) {}

  openSearchModal(config: MatDialogConfig = {}): Observable<any> {
    console.log('open en el servicio');

    const defaultConfig: MatDialogConfig = {
      width: '500px',
      maxHeight: '80vh',
      autoFocus: true,
      ariaLabel: 'Search Financial Instruments Dialog',
    };

    const dialogRef = this.dialog.open(InstrumentSearchComponent, {
      ...defaultConfig,
      ...config,
    });

    return dialogRef.afterClosed();
  }
}
