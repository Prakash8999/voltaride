/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // Warning: This allows production builds to successfully complete even if
        // your project has type errors.
        ignoreBuildErrors: false,
    },
    images: {
        domains: ['localhost', 'pub-81175f420062419ca38eb19499a88ee5.r2.dev'],
        unoptimized: false,
    },
    // Experimental features
    experimental: {
        optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    },
    // Only look for pages in the app directory
    pageExtensions: ['tsx', 'ts', 'jsx', 'js'].map(ext => `app.${ext}`).concat(['tsx', 'ts', 'jsx', 'js']),
};

export default nextConfig;

