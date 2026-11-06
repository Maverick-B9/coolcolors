# COOLCOLORS – React + TypeScript frontend

Vite + React 18 + TypeScript + React Router. No Liquid.

    npm install
    npm run dev        # http://localhost:5173
    npm run build      # type-check + production build into dist/

## Routes
/ · /collections/:handle · /products/:handle · /cart · /search · /account
/pages/our-story · /pages/about-us?view=lookbook · /pages/lookbook · /pages/store-location · /pages/:slug (FAQ, contact, policies)

## Connecting your backend
Copy `.env.example` to `.env` and set `VITE_API_BASE` to your Swagger base URL.
All data calls live in `src/api.ts` (collection, product, search, subscribe).
With no value set, the app uses the mock catalogue in `src/data.ts`.

## Where things are
- `src/components/home.tsx` – hero slideshow, shop-by-category, editorial blocks, featured collection, Watch and Buy
- `src/components/Header.tsx` – transparent-to-solid header, dropdowns, mobile drawer
- `src/components/PresenceMap.tsx` – dot-matrix India map with store pins
- `src/styles/global.css` – all styles (brand tokens at the top)

## Known gaps
- Product and collection data is mock; product images are placeholders until the API is connected.
- Lookbook shows 8 of the 11 looks; add the rest in `src/pages/Lookbook.tsx`.
- Policy/blog pages show placeholder text until wired to a CMS.
