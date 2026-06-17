import Link from 'next/link'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const contentOf = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''

function postCategory(post: SitePost) {
  return asText(contentOf(post).category) || post.tags?.[0] || 'Vehement Finance News Network'
}

function postExcerpt(post: SitePost) {
  const raw = post.summary || asText(contentOf(post).description) || asText(contentOf(post).excerpt) || asText(contentOf(post).body)
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > 155 ? `${clean.slice(0, 155).trim()}...` : clean
}

function postHref(route: string, post: SitePost) {
  return `${route}/${post.slug}`
}

function MarketPostCard({ post, route }: { post: SitePost; route: string }) {
  return (
    <article className="min-w-0">
      <Link href={postHref(route, post)} className="text-[11px] font-medium uppercase text-[var(--slot4-accent)] hover:text-black">{postCategory(post)}</Link>
      <h2 className="mt-3 text-[23px] font-bold leading-[1.3] text-[#2f1d16]">
        <Link href={postHref(route, post)} className="hover:text-[var(--slot4-accent)]">{post.title}</Link>
      </h2>
      <p className="mt-4 line-clamp-3 text-[15px] leading-[1.65] text-black">{postExcerpt(post)}</p>
      <div className="mt-5 flex flex-wrap items-center gap-5 text-[11px] uppercase text-[#7c6b4f]">
        <span>Asher Jones</span>
      </div>
    </article>
  )
}

function MarketSidebar({ posts, route }: { posts: SitePost[]; route: string }) {
  const categories = Array.from(new Map([
    ...CATEGORY_OPTIONS,
    ...posts.map((post) => {
      const name = postCategory(post)
      return name ? { name, slug: normalizeCategory(name) } : null
    }).filter((item): item is { name: string; slug: string } => Boolean(item)),
  ].map((item) => [item.slug, item])).values())
  return (
    <aside className="space-y-12">
      <form action="/search">
        <label className="text-base">Search</label>
        <div className="mt-1 flex gap-3">
          <input name="q" className="h-10 min-w-0 flex-1 border border-black/20 bg-white px-3 outline-none" />
          <button className="bg-[var(--slot4-accent)] px-5 text-sm font-bold uppercase text-white">Search</button>
        </div>
      </form>

      <section>
        <h2 className="text-[28px] font-bold text-[#2f1d16]">Recent Posts</h2>
        <div className="mt-5 grid gap-4 text-[16px] leading-[1.6] text-[#7c6b4f]">
          {posts.slice(0, 5).map((post) => (
            <Link key={post.id || post.slug} href={postHref(route, post)} className="hover:text-[var(--slot4-accent)]">{post.title}</Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-[28px] font-bold text-[#2f1d16]">Categories</h2>
        <div className="mt-8 grid gap-y-4 text-[16px] text-[#7c6b4f]">
          {categories.map((category) => (
            <Link key={category.slug} href={`/media-distribution?category=${category.slug}`} className="hover:text-[var(--slot4-accent)]">{category.name}</Link>
          ))}
        </div>
      </section>
    </aside>
  )
}

export function EditableHomeHero({ primaryRoute, posts }: HomeSectionProps) {
  return (
    <section className="bg-[#FFF6DE] text-[#2f1d16]">
      <div className="mx-auto grid max-w-[1040px] gap-7 px-4 pb-14 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="grid gap-x-10 gap-y-11 md:grid-cols-2">
          {posts.slice(0, 12).map((post) => <MarketPostCard key={post.id || post.slug} post={post} route={primaryRoute} />)}
        </div>
        <MarketSidebar posts={posts} route={primaryRoute} />
      </div>
    </section>
  )
}

export function EditableStoryRail(_props: HomeSectionProps) {
  return null
}

export function EditableMagazineSplit(_props: HomeSectionProps) {
  return null
}

export function EditableTimeCollections(_props: HomeSectionProps) {
  return null
}

export function EditableHomeCta() {
  return null
}
