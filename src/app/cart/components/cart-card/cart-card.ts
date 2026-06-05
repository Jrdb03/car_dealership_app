import { Component, input, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-card.html',
  styleUrl: './cart-card.css',
})
export class CartCard {

  cart = input<any[]>(); 

  private cartService = inject(CartService);

  remove(id: string) {
    this.cartService.removeItem(id);
  }

  update(id: string, qty: number, stock: number) {
    if (qty < 1) return;
    if (stock !== undefined && stock !== null && qty > Number(stock)) return;

    this.cartService.updateQuantity(id, qty);
  }

}