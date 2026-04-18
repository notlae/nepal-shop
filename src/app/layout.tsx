import type { Metadata } from 'next'
import '../styles/index.css'

export const metadata: Metadata = {
  title: 'Nepal Shop',
  description: 'Your one-stop shop for everything Nepali',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}