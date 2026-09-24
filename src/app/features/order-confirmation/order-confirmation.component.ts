import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderConfirmationComponent {
  orderNumber = this.generateOrderNumber();

  private generateOrderNumber(): string {
    return 'HMP' + Math.floor(100000 + Math.random() * 900000);
  }
}