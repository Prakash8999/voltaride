# ⚠️ IMPORTANT: Migration from Vite to Next.js

## Old Vite Files (DO NOT USE)

The `src/` directory contains the **old Vite/React Router code** and should be **IGNORED**.

### Current Routing: App Router (Next.js 15)

All pages are now in the `app/` directory:

```
app/
├── page.tsx              # Home page (/)
├── about/
│   └── page.tsx         # About page (/about)
├── contact/
│   └── page.tsx         # Contact page (/contact)
├── product/[id]/
│   └── page.tsx         # Product detail (/product/:id)
└── not-found.tsx        # 404 page
```

### Components Location

All components have been moved to the root `components/` directory:

```
components/
├── Header.tsx
├── Footer.tsx
├── Hero.tsx
├── ProductGrid.tsx
├── providers/           # Next.js providers
│   ├── query-provider.tsx
│   └── theme-provider.tsx
└── ui/                  # shadcn/ui components
    └── ...
```

### What to Do with `src/`

The `src/` directory is kept as a backup but is excluded from compilation via:
- `tsconfig.json` - has `"exclude": ["src", ...]`
- Next.js will not compile files in excluded directories

**You can safely delete the `src/` directory if you want, or keep it as a backup reference.**

## Migration Status

✅ **Complete** - All functionality has been migrated to Next.js App Router
- All pages migrated
- All components moved to root `components/`
- All routing updated to Next.js
- Environment variables updated
- Build configuration updated

## To Build/Run

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start
```
