import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'cart-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-card.html',
  styleUrl: './cart-card.css',
})
export class CartCard {

  cart = input<any[]>(); 

  remove = input.required<(id: string) => void>();
  update = input.required<(id: string, qty: number, stock: number) => void>();

}