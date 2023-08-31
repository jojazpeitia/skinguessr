import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Rajdhani, Inter } from 'next/font/google';

const rajdhani = Rajdhani({
  weight: ['500'],
  subsets: ['latin'],
  variable: '--font-rajdhani',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata = {
  title: 'SkinGuessr',
  description: 'SkinGuessr',
  viewport: 'width=512, initial-scale=0.8'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (   
    <html lang="en">
      <body className='min-h-screen overflow-hidden'>
          <div className={`${inter.className}`}>
            <NavBar />
          </div>
          <main className={`${rajdhani.variable} font-sans mt-12`}>{children}</main>
          <div className={`${rajdhani.variable} font-sans`}>
            <Footer />
          </div>
      </body>
    </html>
  );
}
