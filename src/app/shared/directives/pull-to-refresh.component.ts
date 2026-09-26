import { Directive, ElementRef, HostListener, output, inject } from '@angular/core';

@Directive({
  selector: '[appPullToRefresh]',
  standalone: true
})
export class PullToRefreshDirective {
  private el = inject(ElementRef<HTMLElement>);

  refresh = output<void>();

  private startY = 0;
  private isPulling = false;
  private readonly threshold = 80;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (window.scrollY === 0) {
      this.startY = event.touches[0].clientY;
      this.isPulling = true;
    }
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.isPulling) return;

    const currentY = event.touches[0].clientY;
    const pullDistance = currentY - this.startY;

    if (pullDistance > 0 && window.scrollY === 0) {
      event.preventDefault();
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (!this.isPulling) return;

    const endY = event.changedTouches[0].clientY;
    const pullDistance = endY - this.startY;

    if (pullDistance > this.threshold) {
      this.refresh.emit();
    }

    this.isPulling = false;
    this.startY = 0;
  }
}