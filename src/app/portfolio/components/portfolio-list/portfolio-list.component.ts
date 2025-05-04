import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { Portfolio } from '../../data-access/models/portfolio';
import { AmountComponent } from '../../../shared/components/amount/amount.component';
import { EarningsComponent } from '../../../shared/components/earnings/earnings.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { InstrumentSearchService } from '../../../shared/services/instrument-search.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-portfolio-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    TranslocoModule,
    AmountComponent,
    EarningsComponent,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './portfolio-list.component.html',
  styleUrl: './portfolio-list.component.scss',
})
export class PortfolioListComponent {
  destroyRef = inject(DestroyRef);
  constructor(
    private readonly instrumentSearchService: InstrumentSearchService,
  ) {}
  portfoliosPlaceholder: Portfolio[] = [
    {
      id: '12345',
      name: 'Australian Shepherd Herding Group',
      description: 'A portfolio focused on tech stocks',
      value: { amount: 12345.67, currency: 'USD' },
      earnings: {
        value: { amount: -567.89, currency: 'USD' },
        percentage: -4.8,
      },
      composition: [
        {
          tick: 'AAPL',
          qty: 10,
          purchasePrice: { amount: 150, currency: 'USD' },
          currentPrice: { amount: 152.25, currency: 'USD' },
          value: { amount: 1522.5, currency: 'USD' },
          changePercent: 1.8,
        },
        {
          tick: 'TSLA',
          qty: 5,
          purchasePrice: { amount: 600, currency: 'USD' },
          currentPrice: { amount: 610.5, currency: 'USD' },
          value: { amount: 3052.5, currency: 'USD' },
          changePercent: -0.5,
        },
      ],
      sectorAllocation: { Technology: 80, Automotive: 20 },
      bestPerformer: { tick: 'AAPL', changePercent: 1.8 },
      lastUpdated: '2025-04-13T16:16:00Z',
    },
  ];

  openSearchModal() {
    this.instrumentSearchService
      .openSearchModal()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          console.log('Instrument selected:', result);
        } else {
          console.log('Modal closed without selection');
        }
      });
  }
}
