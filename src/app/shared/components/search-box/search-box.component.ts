import { Component, inject, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ProductStore } from '../../../core/stores/product.store';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  productStore = inject(ProductStore);

  private searchInput$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.searchInput$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.productStore.searchTerm.set(value);
      });
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchInput$.next(value);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}