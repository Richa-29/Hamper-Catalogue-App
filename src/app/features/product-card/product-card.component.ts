import { ChangeDetectionStrategy, Component, computed, inject, input } from "@angular/core";
import { Product } from "../../core/models/product.model";
import { CartStore } from "../../core/stores/cart.store";
import { QuantityStepperComponent } from "../../shared/components/quantity-stepper/quantity-stepper.component";
import { Router } from "@angular/router";
import { WishlistStore } from "../../core/stores/wishlist.store";
import { AuthStore } from "../../core/stores/auth.store";

@Component({
    selector: 'app-product-card',
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss',
    standalone: true,
    imports: [QuantityStepperComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductCardComponent {
    product = input.required<Product>();
    private cartStore = inject(CartStore);
    private router = inject(Router);
    private wishlistStore = inject(WishlistStore);
    private authStore = inject(AuthStore);

    cartItem = computed(() =>
        this.cartStore.items().find(item => item.product.id === this.product().id)
    );

    isWishlisted = computed(() => this.wishlistStore.productIds().has(this.product().id));

    onToggleWishlist(event: Event) {
        event.stopPropagation();
        this.wishlistStore.toggle(this.product().id);
    }

    onAddToCart(event: Event) {
        event.stopPropagation();
        if (!this.authStore.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }
        this.cartStore.addToCart(this.product());
    }

    onQuantityChange(newQuantity: number) {
        this.cartStore.updateQuantity(this.product().id, newQuantity);
    }

    goToProductDetail() {
        this.router.navigate(['/products/', this.product().id]);
    }
}