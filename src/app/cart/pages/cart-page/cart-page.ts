import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartCard } from "../../components/cart-card/cart-card";
import { CartItem } from '../../interfaces/cart.interface';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CurrencyPipe, CartCard, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage implements OnInit, OnDestroy {

  private cartService = inject(CartService);
  private router = inject(Router);
  private sub?: Subscription;

  cartItems: CartItem[] = [];
  loading = signal(false);

  ngOnInit() {
    this.sub = this.cartService.cart.subscribe(items => {
      this.cartItems = items;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  getTotal() {
    return this.cartService.getTotal();
  }

  checkout() {
    if (this.cartItems.length === 0) return;
    this.loading.set(true);
    this.cartService.checkout().subscribe({
      next: () => {
        this.loading.set(false);
        alert('¡Compra realizada con éxito!');
        this.router.navigateByUrl('/sales');
      },
      error: (err) => {
        this.loading.set(false);
        console.error(err);
        alert('Ocurrió un error al procesar tu compra. Por favor, inténtalo de nuevo.');
      }
    });
  }
}