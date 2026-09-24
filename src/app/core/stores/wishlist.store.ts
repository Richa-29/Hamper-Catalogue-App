import { computed, effect, Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class WishlistStore {
    private readonly STORAGE_KEY = 'hamper-wishlist';
    private _productIds = signal<Set<number>>(this.loadFromStorage());
    productIds = this._productIds.asReadonly();

    count = computed(() => this._productIds().size);

    constructor() {
        effect(() => {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...this._productIds()]));
        });
    }

    loadFromStorage(): Set<number> {
        try {
             const stored = localStorage.getItem(this.STORAGE_KEY)
             return stored ? new Set(JSON.parse(stored)) : new Set();
        } catch {
            return new Set();
        }
    }

    isWishlisted(productId: number) {
        return computed(() => this._productIds().has(productId));
    }

    toggle(productId: number) {
       this._productIds.update(ids => {
        const set = new Set(ids);
        if (set.has(productId)) {
            set.delete(productId);
        } else {
            set.add(productId);
        }
        return set;
       })
    }
}