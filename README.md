# Product Page Optimisation

Frontend technical challenge — a product listing app built with **TypeScript** and **Next.js 16 (App Router)** that fetches from the [DummyJSON Products API](https://dummyjson.com/docs/products).

**Live demo:** [fe-test-fabrotec.netlify.app](https://fe-test-fabrotec.netlify.app)

## Features

- **Product list** with title, description, price, discount and thumbnail
- **Category filtering** via sidebar navigation
- **Price sorting** in ascending / descending order
- **Pagination** with page navigation
- **Product detail page** with image carousel, availability badge, reviews, and full product info
- **Responsive layout** — 1 → 2 → 3 → 4 column grid

## Loading Time Optimisations

| Technique | Metric improved | Implementation |
|---|---|---|
| **Static Site Generation (SSG)** | TTFB | `generateStaticParams` pre-renders all 194 product pages at build time |
| **Incremental Static Regeneration (ISR)** | TTFB | `next: { revalidate: 60 }` on all fetch calls — pages stay fresh without full rebuilds |
| **Server Components** | TTI | 10 of 12 components are server-rendered — near-zero client JavaScript shipped |
| **Streaming with Suspense** | FCP | `loading.tsx` skeletons at both route levels stream a shell immediately while data loads |
| **`next/image`** | LCP, CLS | Responsive `sizes`, `priority` on above-fold images, automatic lazy loading, format optimisation |
| **Parallel data fetching** | TTFB | `Promise.all` fetches categories and products simultaneously — no request waterfall |
| **`next/font`** | CLS, FCP | Self-hosted Geist font — preloaded, no layout shift from font swap |
| **Link prefetching** | Navigation | App Router prefetches linked routes on viewport entry |

Only **2 client components** exist (`SortControl` for the interactive dropdown, `ImageCarousel` for image state) — everything else ships zero JS to the browser.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui** (Card, Badge, Button, Select)
- **Netlify** (deployment with `@netlify/plugin-nextjs`)

## Project Structure

```
app/
├── layout.tsx              # Root layout with metadata + header
├── page.tsx                # Product list (SSR with search params)
├── loading.tsx             # List skeleton
└── products/[id]/
    ├── page.tsx            # Product detail (SSG, 194 pages)
    └── loading.tsx         # Detail skeleton
components/
├── site-header.tsx         # Header bar (server)
├── product-card.tsx        # Product card (server)
├── product-grid.tsx        # Responsive grid (server)
├── category-filter.tsx     # Category sidebar (server)
├── sort-control.tsx        # Price sort dropdown (client)
├── image-carousel.tsx      # Image gallery (client)
├── availability-badge.tsx  # Status badge (server)
├── pagination.tsx          # Page navigation (server)
└── ui/                     # shadcn primitives
lib/
├── api.ts                  # Types + fetch functions with ISR caching
└── utils.ts                # Tailwind merge utility
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
pnpm build
pnpm start
```

### Deploy to Netlify

```bash
netlify deploy --prod
```
