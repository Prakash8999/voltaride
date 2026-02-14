# Migration Guide: React Vite → Next.js

## Overview

This document outlines the migration from React Vite to Next.js 15 for the Aerix Energy website.

## Key Changes

### 1. Routing

**Before (React Router):**
```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
```

**After (Next.js App Router):**
```
app/
├── page.tsx              # / route
├── about/
│   └── page.tsx         # /about route
└── product/[id]/
    └── page.tsx         # /product/:id route
```

### 2. Navigation

**Before:**
```tsx
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
navigate("/about");
```

**After:**
```tsx
import { useRouter } from "next/navigation";
const router = useRouter();
router.push("/about");
```

### 3. Environment Variables

**Before (Vite):**
```env
VITE_EMAIL_API=http://localhost:3001
```
```tsx
import.meta.env.VITE_EMAIL_API
```

**After (Next.js):**
```env
NEXT_PUBLIC_EMAIL_API=http://localhost:3001
```
```tsx
process.env.NEXT_PUBLIC_EMAIL_API
```

### 4. Client Components

All components using hooks or browser APIs must be marked as client components:

```tsx
"use client";

import { useState } from "react";
// ... component code
```

### 5. Image Optimization

**Before:**
```tsx
<img src="/logo.png" alt="Logo" />
```

**After (recommended):**
```tsx
import Image from "next/image";
<Image src="/logo.png" alt="Logo" width={200} height={50} />
```

### 6. Metadata & SEO

**Before:**
```tsx
<Helmet>
  <title>Page Title</title>
  <meta name="description" content="..." />
</Helmet>
```

**After:**
```tsx
// In page.tsx or layout.tsx
export const metadata = {
  title: "Page Title",
  description: "...",
};
```

## File Structure Mapping

| Vite Structure | Next.js Structure |
|----------------|-------------------|
| `src/pages/Index.tsx` | `app/page.tsx` |
| `src/pages/About.tsx` | `app/about/page.tsx` |
| `src/pages/Contact.tsx` | `app/contact/page.tsx` |
| `src/pages/ProductDetail.tsx` | `app/product/[id]/page.tsx` |
| `src/pages/NotFound.tsx` | `app/not-found.tsx` |
| `src/main.tsx` | `app/layout.tsx` |
| `src/index.css` | `app/globals.css` |
| `src/components/` | `components/` (unchanged) |

## Components Requiring Updates

### Components with Navigation
- Update all `useNavigate()` to `useRouter()`
- Update all `navigate()` calls to `router.push()`
- Update `<Link to="...">` to `<Link href="...">`

### Components with Environment Variables
- Replace `import.meta.env.VITE_*` with `process.env.NEXT_PUBLIC_*`

### Components with Client-Side Features
- Add `"use client"` directive at the top of files using:
  - `useState`, `useEffect`, `useRef`
  - Browser APIs (`localStorage`, `window`, etc.)
  - Event handlers
  - Third-party libraries that use hooks

## Configuration Files

### Removed
- `vite.config.ts` - No longer needed
- `index.html` - Replaced by Next.js app structure
- `tsconfig.app.json` - Merged into main tsconfig.json

### Added
- `next.config.mjs` - Next.js configuration
- `app/layout.tsx` - Root layout with providers

### Modified
- `package.json` - Updated scripts and dependencies
- `tsconfig.json` - Updated for Next.js
- `.gitignore` - Added Next.js specific entries

## Provider Setup

All providers are now centralized in the root layout:

```tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <QueryProvider>
            <TooltipProvider>
              {children}
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

## Testing the Migration

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Test all pages:**
   - Home: `http://localhost:4001/`
   - About: `http://localhost:4001/about`
   - Contact: `http://localhost:4001/contact`
   - Product: `http://localhost:4001/product/1`

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## Benefits of Next.js

1. **Better Performance**
   - Automatic code splitting
   - Optimized image loading
   - Server-side rendering
   - Static generation

2. **Improved SEO**
   - Server-side rendering
   - Better meta tag management
   - Automatic sitemap generation

3. **Developer Experience**
   - File-based routing
   - Built-in TypeScript support
   - Fast refresh
   - Better error messages

4. **Production Ready**
   - Optimized builds
   - Edge runtime support
   - Middleware capabilities
   - API routes (if needed)

## Rollback Plan

If you need to rollback to Vite:

1. The original Vite files are still in `src/` directory
2. Restore the original `package.json` from git history
3. Run `npm install`
4. Run `npm run dev` (Vite)

## Next Steps

1. ✅ Install dependencies
2. ✅ Test development server
3. ✅ Verify all pages load correctly
4. ✅ Test all interactive features
5. ✅ Build for production
6. ✅ Deploy to Vercel/hosting platform

## Support

For issues or questions about the migration, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration)
