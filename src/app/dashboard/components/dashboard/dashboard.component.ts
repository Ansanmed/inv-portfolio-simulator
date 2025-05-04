import { Component } from '@angular/core';
import { PortfolioListComponent } from '../../../portfolio/components/portfolio-list/portfolio-list.component';

@Component({
  selector: 'app-dashboard',
  imports: [PortfolioListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
