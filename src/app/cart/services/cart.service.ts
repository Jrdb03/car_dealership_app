import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CartItem } from '../interfaces/cart.interface';

const baseUrl = environment.baseUrl;

@Injectable({ providedIn: 'root' })
export class CartService {

  private http = inject(HttpClient);

  private _cart = new BehaviorSubject<CartItem[]>([]);
  cart = this._cart.asObservable();

  addItem(item: CartItem) {
    const currentCart = this._cart.value;
    const existing = currentCart.find(p => p.id === item.id);

    if (existing) {
      this.updateQuantity(item.id, existing.quantity + 1);
      return;
    }

    this._cart.next([
      ...currentCart,
      { ...item, quantity: 1 }
    ]);
  }

  removeItem(id: string) {
    this._cart.next(this._cart.value.filter(item => item.id !== id));
  }

  updateQuantity(id: string, quantity: number) {
    this._cart.next(
      this._cart.value.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }

  clear() {
    this._cart.next([]);
  }

  checkout(): Observable<any> {
    const payload = {
      items: this._cart.value.map(item => ({
        vehicleId: item.id,
        quantity: item.quantity
      }))
    };
    return this.http.post(`${baseUrl}/checkout`, payload).pipe(
      tap(() => this.clear())
    );
  }

  getTotal(): number {
    return this._cart.value.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  getSnapshot(): CartItem[] {
    return this._cart.value;
  }
}