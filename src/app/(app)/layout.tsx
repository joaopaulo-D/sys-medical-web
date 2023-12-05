import { Footer } from '@/components/layouts/footer'
import { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='bg-[#222529] h-screen flex flex-col'>
      {children}
    </div>
  )
}