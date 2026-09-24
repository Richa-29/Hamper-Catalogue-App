import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from "@angular/core";
import { ProductStore } from "../../core/stores/product.store";
import { ProductCardComponent } from "../product-card/product-card.component";
import { ProductSortComponent } from "../catalog/product-sort/product-sort.component";
import { ProductFiltersComponent } from "../catalog/product-filters/product-filters.component";
import { SearchBoxComponent } from "../../shared/components/search-box/search-box.component";
import { ActivatedRoute } from "@angular/router";
import { LoadingSkeletonComponent } from "../../shared/components/loading-skeleton/loading-skeleton.component";

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ProductCardComponent, ProductFiltersComponent, ProductSortComponent, SearchBoxComponent, LoadingSkeletonComponent]
})

export class ProductListComponent implements OnInit {

    productStore = inject(ProductStore);
    products = this.productStore.filteredProducts;
    private route = inject(ActivatedRoute);

    ngOnInit(): void {
        this.productStore.loadProducts();
        const categoryFromUrl = this.route.snapshot.queryParamMap.get('category');
        if (categoryFromUrl) {
            this.productStore.selectedCategory.set(categoryFromUrl);
        }
    }

    onRefreshClick() {
        this.productStore.loadProducts(true); // force fresh fetch
    }
}