import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartStore } from '../../../core/stores/cart.store';
import { AuthStore } from '../../../core/stores/auth.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
   cartStore = inject(CartStore);
   authStore = inject(AuthStore);

   onLogout() {
    this.authStore.logout();
  }
}