import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { CartService } from '../../../cart/services/cart.service';
import { AsyncPipe } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './front-navbar.html',
  styleUrl: './front-navbar.css',
})
export class FrontNavbar {

  authService = inject(AuthService);
  cartService = inject(CartService);
  private router = inject(Router);

  cartCount = this.cartService.cart.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}