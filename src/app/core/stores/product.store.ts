import { computed, inject, Injectable, signal } from "@angular/core";
import { Product } from "../models/product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, finalize, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProductStore {
    private http = inject(HttpClient);
    private _products = signal<Product[]>([]);
    private _isLoading = signal<boolean>(false);
    private _error = signal<string | null>(null);
    products = this._products.asReadonly();
    isLoading = this._isLoading.asReadonly();
    error = this._error.asReadonly();

    selectedCategory = signal<string>('all');
    sortBy = signal<'price-asc' | 'price-desc' | 'default'>('default');
    selectedDietaryTags = signal<string[]>([]);
    inStockOnly = signal<boolean>(false);
    priceRange = signal<{min: number,max: number}>({min: 0, max: 5000});
    searchTerm = signal<string>('');

    filteredProducts = computed(()=>{
        let list = this._products();
        if(this.selectedCategory() !== 'all') {
            list = list.filter(p => p.category === this.selectedCategory());
        }
        const search = this.searchTerm().toLowerCase().trim();
        if(search) {
            list = list.filter(p => p.name.toLowerCase().includes(search) || p.description.toLowerCase().includes(search)
                                    || p.category.toLowerCase().includes(search));
        }
        if(this.selectedDietaryTags().length > 0) {
            list = list.filter(p => this.selectedDietaryTags().every(
                tag => p.dietaryTags.includes(tag)
            ));
        }
        if(this.inStockOnly()) {
            list = list.filter(p => p.inStock);
        }
        list = list.filter(p => p.price >= this.priceRange().min && p.price <= this.priceRange().max);
        if(this.sortBy() === 'price-asc') {
            list = [...list].sort((a,b) => a.price - b.price);
        }
        if(this.sortBy() === 'price-desc') {
            list = [...list].sort((a,b) => b.price - a.price);
        }
        return list;
    });

    categories = computed(() => {
        const allCategories = this._products().map(p => p.category);
        return ['all', ...new Set(allCategories)];
    });

    categoryShortcuts = computed(() => {
        const categoryMap = new Map<string, Product>();
        
        for (const product of this._products()) {
            if (!categoryMap.has(product.category)) {
            categoryMap.set(product.category, product);
            }
        }
        
        return Array.from(categoryMap.entries()).map(([category, product]) => ({
            name: category,
            image: product.images[0]
        }));
    });

    loadProducts(forceRefresh = false) {
        if (this._products().length > 0 && !forceRefresh) return;
        this._isLoading.set(true);
        this._error.set(null);
        this.http.get<Product[]>('data/products.json').pipe(
            catchError((err) => {
                this._error.set('Failed to load products. Please try again.');
                console.log('Error loading products : ', err);
                return of([]);
            }),
            finalize(() => this._isLoading.set(false))
        ).subscribe((data) => {
            this._products.set(data);
        })
    }

    getProductById(id: number) {
        return computed(() => this._products().find(p => p.id === id));
    }
}
