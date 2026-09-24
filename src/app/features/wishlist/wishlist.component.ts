import { Component, inject, computed, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { WishlistStore } from '../../core/stores/wishlist.store';
import { ProductStore } from '../../core/stores/product.store';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishlistComponent implements OnInit {
  private wishlistStore = inject(WishlistStore);
  private productStore = inject(ProductStore);

  wishlistedProducts = computed(() =>
    this.productStore.products().filter(p => this.wishlistStore.productIds().has(p.id))
  );

  ngOnInit() {
    this.productStore.loadProducts();
  }
}