import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { ProductCard } from "../../../products/components/product-card/product-card";

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, ProductCard],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export class HomePage {

  productsService = inject(ProductsService);

  productResource = rxResource({
  stream: () =>
    this.productsService.getProducts().pipe(
      tap(products => console.log('Products:', products))
    ),
});


}
