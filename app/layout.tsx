import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/layout/Footer';
// import { Providers } from '@/components/providers';
import './globals.css';
import Header from '@/components/layout/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Next.js App',
  description: 'Built with Next.js 16',
};

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gray-50">
        {/* <Providers> */}
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        {modal}
        <Footer />
        {/* </Providers> */}
      </body>
    </html>
  );
}