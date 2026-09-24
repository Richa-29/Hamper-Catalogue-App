import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ProductStore } from "../../core/stores/product.store";
import { ProductCardComponent } from "../product-card/product-card.component";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [RouterLink, ProductCardComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomeComponent implements OnInit{
    productStore = inject(ProductStore);

    categoryShortcuts = this.productStore.categoryShortcuts;

    featuredProducts = computed(() => 
        [...this.productStore.products()]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4)
    );

    ngOnInit() {
        this.productStore.loadProducts();
    }
}