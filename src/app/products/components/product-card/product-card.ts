import { Component, input } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCard {
  vehicles = input.required<Vehicle>();
}
