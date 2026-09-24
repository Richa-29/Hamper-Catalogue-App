import { Component, input, ChangeDetectionStrategy, computed } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './loading-skeleton.component.html',
  styleUrl: './loading-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSkeletonComponent {
  count = input<number>(8);

  skeletonItems = computed(() => Array.from({ length: this.count() }));
}