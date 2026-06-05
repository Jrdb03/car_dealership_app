import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SalesService } from '../../services/sales.service';
import { Sale } from '../../interfaces/sales.interface';

@Component({
  selector: 'app-sales-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './sales-page.html',
  styleUrl: './sales-page.css',
})
export class SalesPage implements OnInit {

  private salesService = inject(SalesService);

  sales = signal<Sale[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.salesService.getSales().subscribe({
      next: (data) => {
        console.log('Sales API Response:', data);
        const rawSales = Array.isArray(data) ? data : ((data as any).sales || (data as any).data || []);
        
        // Sort sales by date descending
        const sorted = rawSales.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.sales.set(sorted);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching sales:', err);
        this.loading.set(false);
      }
    });
  }

  isVehicleObject(vehicle: any): boolean {
    return vehicle && typeof vehicle === 'object' && 'brand' in vehicle;
  }
}
