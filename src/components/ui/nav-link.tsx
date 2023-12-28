'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export type NavLinkProps = ComponentProps<typeof Link>

export function NavLink(props: NavLinkProps) {
  const pathname = usePathname()

  const isActive = pathname === props.href

  return (
    <Link
      data-active={isActive}
      className={twMerge(
        'text-sm font-normal transition-colors flex flex-col justify-center items-center text-white hover:text-blue-500 data-[active=true]:text-blue-500',
        props.className,
      )}
      {...props}
    />
  )
}