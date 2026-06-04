import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { CartService } from '../../../cart/services/cart.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './front-navbar.html',
  styleUrl: './front-navbar.css',
})
export class FrontNavbar {

  authService = inject(AuthService);
  cartService = inject(CartService);

  cart$ = this.cartService.cart$;
}