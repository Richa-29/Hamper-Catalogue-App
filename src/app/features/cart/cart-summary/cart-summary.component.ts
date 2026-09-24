import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartStore } from '../../../core/stores/cart.store';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartSummaryComponent {
  cartStore = inject(CartStore);
}