import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import QueryProvider from '@/providers/QueryProvider';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { SocketProvider } from '@/context/SocketContext';
import WhatsAppFloatingButton from '@/components/layout/WhatsAppFloatingButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bids Awesome | Bidding Platform',
  description: 'The premier digital marketplace for sugarcane auctions. Connecting farmers and buyers through transparent, real-time bidding technology.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50">
        <QueryProvider>
          <AuthProvider>
            <SocketProvider>
              {children}
              {modal}
              <WhatsAppFloatingButton />
            </SocketProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}