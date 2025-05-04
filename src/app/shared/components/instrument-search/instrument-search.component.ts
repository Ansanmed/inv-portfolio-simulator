import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { SecuritySearchService } from '../../../dashboard/services/security-search.service';
import { SecuritySearchItem } from '../../../dashboard/data-access/models/security-search-item';

@Component({
  selector: 'app-instrument-search',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './instrument-search.component.html',
  styleUrl: './instrument-search.component.scss',
})
export class InstrumentSearchComponent {
  searchControl = new FormControl('');
  instruments$: Observable<SecuritySearchItem[]>;
  error: string | null = null;

  constructor(
    private securitySearchService: SecuritySearchService,
    public dialogRef: MatDialogRef<InstrumentSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    // Escuchar cambios en el campo de búsqueda y buscar instrumentos
    this.instruments$ = this.searchControl.valueChanges.pipe(
      debounceTime(600),
      switchMap((searchTerm) =>
        this.securitySearchService.searchSecurity(searchTerm || ''),
      ),
      catchError(() => {
        this.error = 'Error searching instruments';
        return of([]);
      }),
    );
  }

  // Seleccionar un instrumento y cerrar el modal
  selectInstrument(instrument: any) {
    this.dialogRef.close(instrument);
  }

  // Cerrar el modal sin seleccionar nada
  closeDialog() {
    this.dialogRef.close();
  }
}
