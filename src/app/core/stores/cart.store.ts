import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly STORAGE_KEY = 'hamper-cart';

  private _items = signal<CartItem[]>(this.loadFromStorage());
  items = this._items.asReadonly();

  itemCount = computed(() =>
    this._items().reduce((sum, item) => sum + item.quantity, 0)
  );

  subtotal = computed(() =>
    this._items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  constructor() {
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._items()));
    });
  }

  addToCart(product: Product) {
    const existing = this._items().find(item => item.product.id === product.id);

    if (existing) {
      this.updateQuantity(product.id, existing.quantity + 1);
    } else {
      this._items.update(items => [...items, { product, quantity: 1 }]);
    }
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this._items.update(items =>
      items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  removeFromCart(productId: number) {
    this._items.update(items => items.filter(item => item.product.id !== productId));
  }

  clearCart() {
    this._items.set([]);
  }

  private loadFromStorage(): CartItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }
}