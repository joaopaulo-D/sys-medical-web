import { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className='bg-[#191a1b] h-screen flex flex-col'>
      {children}
    </div>
  )
}