import './globals.css';
import ClientLayoutWrapper from './ClientLayoutWrapper';

export const metadata = {
  title: 'Kanary Group of Restaurants | Fine Indian & Global Dining',
  description: "Experience premium culinary dining in Thrissur. Book your table online and view our complete gourmet food and drinks menu, prepared with authentic ingredients.",
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
