import { Routes } from '@angular/router';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', 
      loadComponent: () => import('./features/home/home.component').then(m=>m.HomeComponent)
    },
    { path: 'products',
      loadComponent: () => import('./features/product-list/product-list.component').then(m=>m.ProductListComponent)
    },
    { path: 'products/:id', 
      loadComponent: () => import('./features/product-detail/product-detail.component').then(m=>m.ProductDetailComponent)
    },
    { path: 'cart',
      loadComponent: () => import('./features/cart/cart.component').then(m=>m.CartComponent),
      canActivate: [authGuard]
    },
    { path: 'checkout', 
      loadComponent: () => import('./features/checkout/checkout.component').then(m=>m.CheckoutComponent)
    },
    { path: 'order-confirmation',
      loadComponent: () => import('./features/order-confirmation/order-confirmation.component').then(m=>m.OrderConfirmationComponent)
    },
    { path: 'wishlist',
      loadComponent: () => import('./features/wishlist/wishlist.component').then(m=>m.WishlistComponent)
    },
    { path: 'login', 
      loadComponent: () => import('./features/auth/auth.component').then(m => m.LoginComponent)
    }
];
