import { Component, inject, input } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { AuthService } from '../../../auth/services/auth.service';
import { CartService } from '../../../cart/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCard {

  vehicles = input.required<Vehicle>();

  private authService = inject(AuthService);
  private cartService = inject(CartService);

  // acceso al template
  get auth() {
    return this.authService;
  }

  addToCart(vehicle: Vehicle) {
    this.cartService.addItem({
      id: vehicle._id,
      name: `${vehicle.brand} ${vehicle.model}`,
      price: vehicle.price,
      stock: vehicle.stock,
      quantity: 1
    });
  }

  removeFromCart(id: string) {
    this.cartService.removeItem(id);
  }

  isInCart(id: string): boolean {
    return this.cartService.getSnapshot().some(p => p.id === id);
  }
}