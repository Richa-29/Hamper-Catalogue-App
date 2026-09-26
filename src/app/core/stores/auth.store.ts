import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { User } from '../models/user.model';
import { CartStore } from './cart.store';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly STORAGE_KEY = 'hamper-auth-user';

  private _currentUser = signal<User | null>(this.loadFromStorage());
  currentUser = this._currentUser.asReadonly();
  private cartStore = inject(CartStore);

  isLoggedIn = computed(() => this._currentUser() !== null);

  constructor() {
    effect(() => {
      const user = this._currentUser();
      if (user) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(this.STORAGE_KEY);
      }
    });
  }

  login(email: string, password: string): boolean {
    if (email.includes('@') && password.length >= 4) {
      const name = email.split('@')[0];
      this._currentUser.set({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email
      });
      return true;
    }
    return false;
  }

  logout() {
    this._currentUser.set(null);
    this.cartStore.clearCart();
  }

  private loadFromStorage(): User | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
}