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
    <>
      <div className="fixed top-0 ">
        <NavBar />
      </div>
      <div className='mt-20'>
        <main>{children}</main>
      </div>
    </>
  )
}
