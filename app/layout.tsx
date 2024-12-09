import './globals.css'
import '../components/style.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col items-center overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}
