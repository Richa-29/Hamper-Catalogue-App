import { Component, inject, computed, ChangeDetectionStrategy, OnInit, signal, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductStore } from '../../core/stores/product.store';
import { CartStore } from '../../core/stores/cart.store';
import { QuantityStepperComponent } from '../../shared/components/quantity-stepper/quantity-stepper.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [QuantityStepperComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productStore = inject(ProductStore);
  private cartStore = inject(CartStore);

  selectedImageIndex = signal(0);

  selectImage(index: number) {
    this.selectedImageIndex.set(index);
  }

  private productId = toSignal(
    this.route.paramMap.pipe(map(params => Number(params.get('id'))))
  );

  constructor() {
      effect(() => {
        this.product();
        this.selectedImageIndex.set(0);
      });
  }

  ngOnInit() {
    this.productStore.loadProducts();
  }

  product = computed(() => {
    const id = this.productId();
    return id ? this.productStore.products().find(p => p.id === id) : undefined;
  });

  cartItem = computed(() => {
    const p = this.product();
    if (!p) return undefined;
    return this.cartStore.items().find(item => item.product.id === p.id);
  });

  onAddToCart() {
    const p = this.product();
    if (p) this.cartStore.addToCart(p);
  }

  onQuantityChange(newQuantity: number) {
    const p = this.product();
    if (p) this.cartStore.updateQuantity(p.id, newQuantity);
  }
}