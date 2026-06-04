import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../interfaces/cart.interface';


@Injectable({ providedIn: 'root' })
export class CartService {

  private _cart = new BehaviorSubject<CartItem[]>([]);
  cart$ = this._cart.asObservable();

  private get cart(): CartItem[] {
    return this._cart.value;
  }

  addItem(item: CartItem) {
  const existing = this.cart.find(p => p.id === item.id);

  if (existing) {
    this.updateQuantity(item.id, existing.quantity + 1);
    return;
  }

  this._cart.next([
    ...this.cart,
    { ...item, quantity: 1 }
  ]);
}

  removeItem(id: string) {
    this._cart.next(this.cart.filter(item => item.id !== id));
  }

  updateQuantity(id: string, quantity: number) {

    this._cart.next(
      this.cart.map(item =>
        item.id === id
          ? { ...item, quantity }
          : item
      )
    );
  }

  getTotal(): number {
    return this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  clear() {
    this._cart.next([]);
  }

  getSnapshot(): CartItem[] {
    return this.cart;
  }
}