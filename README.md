# Hamper Catalogue

A full-featured e-commerce catalogue app built with Angular, showcasing signals-based state management, standalone components, and modern Angular patterns.

## Live Demo
https://hamper-catalogue-app.vercel.app/

## Features
- Product catalogue with search (debounced), category filtering, and sorting
- Product detail pages with image gallery and reactive routing
- Related products section, lazy-loaded with `@defer`
- Cart with persistent state (localStorage), reusable quantity stepper
- Wishlist functionality
- Mock authentication (login/logout) with route guards protecting the cart
- Multi-field checkout with reactive forms and validation
- Pull-to-refresh (mobile) and manual refresh (desktop) for product data
- Fully responsive, dark-themed UI with a custom design token system

## Tech Stack
- Angular (standalone components, signals, computed, effect, OnPush change detection)
- Angular Router (route guards, lazy-loaded routes via `loadComponent`)
- RxJS (debounced search input)
- Reactive Forms with custom validators
- SCSS with CSS custom properties for theming

## Key Architectural Decisions

**Signal-based state management instead of NgRx**
Built lightweight store services (`ProductStore`, `CartStore`, `WishlistStore`, `AuthStore`) using signals and `computed()` for derived state. This avoids NgRx's boilerplate (actions, reducers, effects, selectors) for a project of this scale, while still providing a single 
source of truth and automatic reactivity across components, any component that injects a store gets live, synced data with no manual subscriptions.

**Caching with explicit refresh**
Product data is cached after the first fetch to avoid redundant network calls. A pull-to-refresh gesture (built as a reusable directive) and a manual refresh button handle the mobile and desktop cases respectively, letting users explicitly request fresh data — balancing performance with data freshness.

**Choosing computed() over RxJS operators for local state**
Search and filtering operate on data already held in memory, so they're implemented with a `computed()` signal rather than `debounceTime`/`switchMap` operators built for cancelling in-flight async requests, which doesn't apply here. Input debouncing is still used at the UI layer to avoid recomputing on every keystroke.

**Reusable, store-agnostic components**
Components like `QuantityStepperComponent` are built using `input()`/`output()` with no knowledge of which store they're connected to, making them reusable across the Cart and Product Listing pages without duplicated logic.

**Route guards for access control**
The cart route is protected with a `CanActivateFn` guard that redirects unauthenticated users to login. Logging out also clears the cart, since cart state is treated as user-scoped rather than device-scoped.

**Lazy-loaded routes**
Every feature route uses `loadComponent()` instead of eager imports, keeping the initial bundle smaller since route code loads on demand.

**Deferred loading for below-the-fold content**
The "Related Products" section on the product detail page uses Angular's `@defer (on viewport)` so its component code only loads when the user scrolls to it, rather than on initial page load.

## Getting Started

\`\`\`bash
npm install
ng serve
\`\`\`

Navigate to `http://localhost:4200/`

## Notes
- Product data is mock JSON, fetched via `HttpClient` to simulate a real API call pattern.
- Authentication is simulated (no real backend), any valid-looking email and a password of 4+ characters will log you in.