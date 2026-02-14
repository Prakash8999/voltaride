import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Aerix Energy - Electric Vehicle Solutions",
    description: "Leading provider of electric vehicle charging solutions and sustainable energy products",
    keywords: ["electric vehicles", "EV charging", "sustainable energy", "Aerix"],
    authors: [{ name: "Aerix Energy" }],
    openGraph: {
        title: "Aerix Energy - Electric Vehicle Solutions",
        description: "Leading provider of electric vehicle charging solutions and sustainable energy products",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    <QueryProvider>
                        <TooltipProvider>
                            {children}
                            <Toaster />
                        </TooltipProvider>
                    </QueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
