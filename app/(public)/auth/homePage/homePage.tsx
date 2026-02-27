import Button from '@/components/ui/custom-button/Button';
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="text-center py-12">
            <h1 className="text-4xl font-bold mb-6">
                Welcome to Next.js 16
            </h1>
            <p className="text-xl text-gray-600 mb-8">
                Built with App Router and Tailwind CSS
            </p>
            <div className="space-x-4">
                <Link href="/dashboard">
                    <Button variant="primary">Go to Dashboard</Button>
                </Link>
                <Link href="/blog">
                    <Button variant="outline">Read Blog</Button>
                </Link>
            </div>
        </div>
    );
}