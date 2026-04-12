import PlatformCard from '../../components/PlatformCard'
import { categories, platforms } from '../../lib/siteData'

export default function ProvidersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="glass-panel rounded-[36px] px-6 py-10 sm:px-8 lg:px-10">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">全部平台</p>
        <h1 className="mt-4 text-4xl font-semibold text-[var(--ink)]">把你要推广的平台按卡片挂出来</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">
          这一页已经是静态可展示结构。你可以继续加平台，也可以只保留你真正要放邀请链接的几个。
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-[rgba(43,38,34,0.1)] bg-[rgba(255,255,255,0.62)] px-4 py-2 text-sm text-[var(--muted)]"
            >
              {category}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        {platforms.map((platform) => (
          <PlatformCard key={platform.slug} platform={platform} />
        ))}
      </section>
    </div>
  )
}
