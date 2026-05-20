import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MiMo Content Studio',
  description: 'Multi-modal AI content generator powered by Xiaomi MiMo V2.5 models',
  keywords: ['AI', 'content generation', 'MiMo', 'Xiaomi', 'multi-modal', 'text generation', 'image generation', 'voice generation'],
  authors: [{ name: 'MiMo Content Studio' }],
  openGraph: {
    title: 'MiMo Content Studio',
    description: 'Generate text, images, and voice content using Xiaomi MiMo V2.5 models',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
