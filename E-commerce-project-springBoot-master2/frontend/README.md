# 🚀 Perishable Shop - Standalone Frontend Deployment Package

This directory contains the complete, self-contained **Progressive Web App (PWA)** frontend for **Perishable Shop**. It runs 100% in the browser with client-side state management (`localStorage`) and is ready for immediate deployment on **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 📂 Included Pages & Capabilities:

1. **`index.html`** — Storefront with hero banner, category filters, voice search mic, mini-cart drawer, and mobile bottom tab bar.
2. **`products.html`** — Full produce catalog with facet filters (category, price slider, sorting, and wishlist).
3. **`bulk-order.html`** — Wholesale B2B fast ordering matrix with live subtotal/total calculations.
4. **`compare.html`** — Side-by-side produce comparison table with 1-click cart addition.
5. **`cart.html`** — Shopping cart with item quantity steppers and promo code engine (`SUPER30`, `FRESH10`).
6. **`checkout.html`** — Interactive checkout with Delivery Slot selector, Store Pickup toggle, and Digital Wallet payment.
7. **`orders.html`** — Customer order history with 1-click re-order and 24h freshness return/refund modals.
8. **`track.html`** — Live Leaflet GPS delivery route map with animated driver van and timeline.
9. **`wallet.html`** — Digital wallet with balance top-up buttons and transaction ledger.
10. **`admin.html`** — Executive analytics dashboard with 3 Chart.js charts and CSV exports.

---

## ⚡ How to Deploy in 60 Seconds:

### Option 1: Deploy to Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New Project"** ➔ Import your repository OR install the Vercel CLI:
   ```bash
   npm i -g vercel
   cd frontend
   vercel --prod
   ```
3. Your live HTTPS URL (e.g. `https://freshshop.vercel.app`) will be ready in 15 seconds!

---

### Option 2: Deploy to Netlify (Drag & Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop this entire `frontend` folder into the upload box.
3. Your live HTTPS URL is generated instantly with free SSL!

---

### Option 3: Deploy to GitHub Pages
1. Push this folder to your GitHub repository.
2. In your repo on GitHub: Go to **Settings ➔ Pages**.
3. Under **Branch**, select `main` and set folder to `/frontend` (or root if placed there).
4. Click **Save** — your site is published at `https://<your-username>.github.io/<repo-name>/`.
