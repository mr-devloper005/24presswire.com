'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'

export function EditableFooter() {
  return (
    <footer className="bg-[#8BDFDD] text-[#2f1d16]">
      <div className="mx-auto grid max-w-[1040px] gap-8 px-4 py-14 md:grid-cols-[1.2fr_.8fr_.8fr_250px]">
        <section>
          <h2 className="text-lg font-bold uppercase text-[#F48F68]">About 24Press Wire</h2>
          <p className="mt-5 max-w-[280px] text-[16px] leading-[1.62] text-[#2f1d16]/80">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </section>
        <section>
          <h2 className="text-lg font-bold uppercase text-[#F48F68]">Explore</h2>
          <div className="mt-5 grid gap-3 text-[16px] leading-[1.55] text-[#2f1d16]/80">
            <Link href="/media-distribution" className="hover:text-[var(--slot4-accent)]">Latest News</Link>
            <Link href="/press-release" className="hover:text-[var(--slot4-accent)]">Press Releases</Link>
            <Link href="/business" className="hover:text-[var(--slot4-accent)]">Business News</Link>
            <Link href="/news-agency" className="hover:text-[var(--slot4-accent)]">News Agency</Link>
          </div>
        </section>
        <section>
          <h2 className="text-lg font-bold uppercase text-[#F48F68]">Website</h2>
          <div className="mt-5 grid gap-3 text-[16px] text-[#2f1d16]/80">
            <Link href="/about" className="hover:text-[var(--slot4-accent)]">About</Link>
            <Link href="/contact" className="hover:text-[var(--slot4-accent)]">Contact</Link>
            <Link href="/create" className="hover:text-[var(--slot4-accent)]">Submit News</Link>
            <Link href="/search" className="hover:text-[var(--slot4-accent)]">Search</Link>
          </div>
        </section>
        <section>
          <form action="/search">
            <label className="text-base">Search</label>
            <div className="mt-1 flex gap-3">
              <input name="q" className="h-10 min-w-0 flex-1 bg-white px-3 text-black outline-none" />
              <button className="bg-[#F48F68] px-5 text-sm font-bold uppercase text-[#2f1d16]">Search</button>
            </div>
          </form>
        </section>
      </div>
      <div className="mx-auto max-w-[1040px] border-t border-[#2f1d16]/25 px-4 py-5 text-xs text-[#2f1d16]/60">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. News and media distribution.</div>
    </footer>
  )
}
