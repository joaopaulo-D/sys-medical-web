import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { FirebaseAuthenticationContextProvider } from '@/contexts/FirebaseAuthenticationContext.tsx'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SysLae Health',
  description: 'Sistema de Diagnóstico Online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FirebaseAuthenticationContextProvider>
          {children}
        </FirebaseAuthenticationContextProvider>
      </body>
    </html>
  )
}
