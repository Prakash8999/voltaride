# Aerix Energy - Next.js Website

This is the official website for Aerix Energy, redesigned and built with Next.js 15, React 18, and TypeScript.

## 🚀 Features

- **Next.js 15** with App Router for optimal performance
- **React 18** with Server and Client Components
- **TypeScript** for type safety
- **Tailwind CSS** with custom design system
- **shadcn/ui** components for consistent UI
- **Framer Motion** for smooth animations
- **React Query** for data fetching
- **next-themes** for dark mode support
- **Three.js** for 3D visualizations

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_EMAIL_API=your_email_api_endpoint
```

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── product/[id]/      # Dynamic product pages
│   ├── globals.css        # Global styles
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── providers/        # Context providers
│   └── ...               # Feature components
├── lib/                  # Utility functions
├── public/               # Static assets
└── next.config.mjs       # Next.js configuration
```

## 🎨 Design System

The website uses a custom design system with:
- **Electric Blue** primary color (HSL: 192 100% 45%)
- **Lime Green** secondary color (HSL: 82 100% 40%)
- Glassmorphism effects
- Custom animations and transitions
- Responsive design for all devices

## 🔧 Development

The development server runs on `http://localhost:4001` by default.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📱 Pages

- **Home** (`/`) - Landing page with hero, products, features
- **About** (`/about`) - Company information and mission
- **Contact** (`/contact`) - Contact form and information
- **Product Detail** (`/product/[id]`) - Individual product pages with carousel
- **404** - Custom not found page

## 🚗 Products

The website showcases the following electric scooters:
1. AERIX ENDURO
2. AERIX GLIDE
3. AERIX PRIME
4. AERIX RANGER
5. AERIX URBAN
6. AERIX TITAN
7. AERIX VOLT

## 📄 License

© 2024 Aerix Energy. All rights reserved.
