# Hamper Catalogue

A full-featured e-commerce catalogue app built with Angular, showcasing signals-based, state management, standalone components, and modern Angular patterns.

<!-- ## Live Demo -->

## Features
- Product catalogue with search, category filtering, and sorting
- Product detail pages with reactive routing
- Cart with persistent state (localStorage)
- Wishlist functionality
- Multi-field checkout with reactive forms and validation
- Fully responsive, dark-themed UI

## Tech Stack
- Angular (standalone components, signals, OnPush change detection)
- RxJS (debounced search)
- Reactive Forms
- SCSS with CSS custom properties for theming

## Key Architectural Decisions

**Signal-based state management instead of NgRx**
Built lightweight store services (`ProductStore`, `CartStore`, `WishlistStore`) using signals and computed() for derived state. This avoids NgRx's boilerplate (actions, reducers, effects, selectors) for a project of this scale, while still providing a single source of truth and automatic reactivity across components.

**Caching with explicit refresh**
Product data is cached after the first fetch to avoid redundant network calls. A pull-to-refresh gesture (built as a reusable directive) lets users explicitly request fresh data, balancing performance with data freshness.

**Reusable, store-agnostic components**
Components like `QuantityStepperComponent` are built using input()/output() with no knowledge of which store they're connected to, making them reusable across the Cart and Product Listing pages.

## Getting Started

\`\`\`bash
npm install
ng serve
\`\`\`

Navigate to `http://localhost:4200/`