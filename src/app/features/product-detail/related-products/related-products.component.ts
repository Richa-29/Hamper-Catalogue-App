import { Component, input, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { ProductStore } from '../../../core/stores/product.store';
import { ProductCardComponent } from '../../product-card/product-card.component';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelatedProductsComponent {
  currentProductId = input.required<number>();
  category = input.required<string>();

  private productStore = inject(ProductStore);

  relatedProducts = computed(() =>
    this.productStore.getRelatedProducts(this.currentProductId(), this.category())()
  );
}