import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-quantity-stepper',
  standalone: true,
  imports: [],
  templateUrl: './quantity-stepper.component.html',
  styleUrl: './quantity-stepper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuantityStepperComponent {
  quantity = input.required<number>();
  min = input<number>(1);
  max = input<number>(99);

  quantityChange = output<number>();

  increase() {
    const next = this.quantity() + 1;
    if (next <= this.max()) {
      this.quantityChange.emit(next);
    }
  }

  decrease() {
    const next = this.quantity() - 1;
    if (next >= this.min()) {
      this.quantityChange.emit(next);
    }
  }
}