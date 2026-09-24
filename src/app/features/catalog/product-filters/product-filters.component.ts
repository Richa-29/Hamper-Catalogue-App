import { ChangeDetectionStrategy, Component, computed, inject } from "@angular/core";
import { ProductStore } from "../../../core/stores/product.store";

@Component({
    selector: 'app-product-filters',
    templateUrl: './product-filters.component.html',
    styleUrl: './product-filters.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProductFiltersComponent {
    productStore = inject(ProductStore);

    categories = this.productStore.categories;

    selectCategory(category: string) {
        this.productStore.selectedCategory.set(category);
    }
}