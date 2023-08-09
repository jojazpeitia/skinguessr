import './globals.css';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (   
    <html lang="en">
      <body>
          <div className={`${inter.className}`}>
            <NavBar />
          </div>
          <main className={`${rajdhani.variable} font-sans mt-12`}>{children}</main>
          <div className={`${rajdhani.variable} font-sans mt-12`}>
            <Footer />
          </div>
      </body>
    </html>
  );
}
