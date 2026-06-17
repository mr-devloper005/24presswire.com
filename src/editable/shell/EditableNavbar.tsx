'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, Share2, Shuffle, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const topLinks = [
    { label: 'Home', href: '/' },
    { label: 'Latest News', href: '/media-distribution' },
    { label: 'Submit News', href: '/create' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Login', href: '/login'}

  ]
  const categoryLinks = [
    { label: 'Media Distribution', href: '/media-distribution' },
    
  ]
  const brand = SITE_CONFIG.name
  const splitAt = Math.max(2, Math.ceil(brand.length * 0.52))

  return (
    <header className="bg-[#FFF6DE] text-[#2f1d16]">
      <div className="bg-[#8BDFDD] text-[#2f1d16]">
        <div className="mx-auto flex min-h-[38px] max-w-[1040px] items-center justify-between gap-5 px-4 text-[13px] font-semibold">
          <nav className="hidden min-w-0 items-center gap-6 lg:flex">
            {topLinks.map((item) => (
              <Link key={item.label} href={item.href} className="whitespace-nowrap hover:text-[var(--slot4-accent)]">{item.label}</Link>
            ))}
          </nav>
          <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-9 w-9 items-center justify-center lg:hidden" aria-label="Toggle navigation">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="ml-auto flex shrink-0 items-center gap-5">
            <Link href="/contact" className="hidden items-center gap-2 sm:inline-flex"><Share2 className="h-4 w-4" /> Share News</Link>
            <Link href="/search" className="inline-flex items-center gap-2"><Search className="h-4 w-4" /> Search</Link>
            {session ? <button type="button" onClick={logout} className="hidden font-semibold hover:text-[#F48F68] sm:inline-flex">Logout</button> : null}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1040px] px-4">
        <div className="flex min-h-[104px] items-center">
          <Link href="/" className="market-wordmark truncate text-4xl font-black italic leading-none sm:text-5xl">
            <span className="text-[var(--slot4-accent)]">{brand.slice(0, splitAt)}</span><span className="text-black">{brand.slice(splitAt)}</span>
          </Link>
        </div>

        <nav className="flex min-h-[50px] items-center overflow-x-auto bg-[var(--slot4-accent)] text-sm font-bold uppercase text-white">
          {categoryLinks.map((item) => (
            <Link key={item.label} href={item.href} className="whitespace-nowrap px-6 py-4 hover:bg-black/10">{item.label}</Link>
          ))}
          <Link href="/search" aria-label="Random posts" className="ml-auto hidden h-[50px] w-[64px] shrink-0 items-center justify-center sm:flex"><Shuffle className="h-5 w-5" /></Link>
        </nav>

        {open ? (
          <div className="grid gap-px bg-black/10 pb-4 lg:hidden">
            {[...topLinks, ...categoryLinks].map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="bg-white px-4 py-3 text-sm font-bold">{item.label}</Link>
            ))}
            {session ? <button onClick={logout} className="bg-white px-4 py-3 text-left text-sm font-bold">Logout</button> : null}
          </div>
        ) : null}
        <div className="h-8" />
      </div>
    </header>
  )
}
