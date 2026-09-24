import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ProductStore } from '../../../core/stores/product.store';

@Component({
  selector: 'app-product-sort',
  templateUrl: './product-sort.component.html',
  styleUrl: './product-sort.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSortComponent {
  productStore = inject(ProductStore);

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.productStore.sortBy.set(value as 'price-asc' | 'price-desc' | 'default');
  }
}