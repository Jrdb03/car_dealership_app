import { Component, inject } from '@angular/core';
import { CurrencyPipe, AsyncPipe } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartCard } from "../../components/cart-card/cart-card";

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CurrencyPipe, AsyncPipe, CartCard],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {

  private cartService = inject(CartService);

  cart$ = this.cartService.cart$;

  getTotal() {
    return this.cartService.getTotal();
  }

  remove = (id: string) => {
    this.cartService.removeItem(id);
  };

  update = (id: string, qty: number, stock: number) => {
    if (qty < 1) return;
    if (qty > stock) return;

    this.cartService.updateQuantity(id, qty);
  };
}