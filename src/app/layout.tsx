import './globals.css'
import NavBar from './components/NavBar';

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
          <NavBar />
          <main className='mt-10'>{children}</main>
      </body>
    </html>
  );
}
