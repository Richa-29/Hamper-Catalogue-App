import { Component, input, inject, ChangeDetectionStrategy } from '@angular/core';
import { CartItem } from '../../../core/models/cart-item.model';
import { CartStore } from '../../../core/stores/cart.store';
import { QuantityStepperComponent } from '../../../shared/components/quantity-stepper/quantity-stepper.component';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [QuantityStepperComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  item = input.required<CartItem>();
  private cartStore = inject(CartStore);

  onQuantityChange(newQuantity: number) {
    this.cartStore.updateQuantity(this.item().product.id, newQuantity);
  }

  onRemove() {
    this.cartStore.removeFromCart(this.item().product.id);
  }
}