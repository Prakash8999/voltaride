import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h2>
                    <p className="text-gray-600">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                </div>

                <Link href="/">
                    <Button size="lg" className="gap-2">
                        <Home className="w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
