import Link from 'next/link'
import PlatformCard from '../components/PlatformCard'
import { featuredPlatforms, platforms, siteConfig } from '../lib/siteData'

const highlights = [
  '站点结构已经收敛到最小可上线形态',
  '所有邀请链接统一放在一个数据文件里维护',
  '后面你只需要补自己的真实链接和福利说明'
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="glass-panel overflow-hidden rounded-[36px] px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent)]">{siteConfig.heroLabel}</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight text-[var(--ink)] sm:text-5xl lg:text-6xl">
              {siteConfig.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--muted)]">{siteConfig.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/providers"
                className="rounded-full bg-[var(--accent-strong)] px-6 py-3 text-sm font-medium text-white transition hover:opacity-92"
              >
                查看全部平台
              </Link>
              <Link
                href="/compare"
                className="rounded-full border border-[rgba(43,38,34,0.12)] px-6 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[rgba(17,95,89,0.08)]"
              >
                先看领取说明
              </Link>
            </div>
          </div>

          <div className="soft-card rounded-[32px] p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <div className="text-3xl font-semibold text-[var(--ink)]">{platforms.length}</div>
                <p className="mt-1 text-sm text-[var(--muted)]">已整理的平台模板</p>
              </div>
              <div>
                <div className="text-3xl font-semibold text-[var(--ink)]">1</div>
                <p className="mt-1 text-sm text-[var(--muted)]">个集中维护的数据文件</p>
              </div>
              <div>
                <div className="text-3xl font-semibold text-[var(--ink)]">0</div>
                <p className="mt-1 text-sm text-[var(--muted)]">个你现在必须接数据库的理由</p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] bg-[rgba(17,95,89,0.08)] p-5">
              <p className="text-sm leading-7 text-[var(--muted)]">{siteConfig.announcement}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {highlights.map((item) => (
          <div key={item} className="soft-card rounded-[28px] p-5 text-sm leading-7 text-[var(--muted)]">
            {item}
          </div>
        ))}
      </section>

      <section className="mt-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-[var(--accent)]">精选入口</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--ink)]">先把最常发的几个链接挂上去</h2>
          </div>
          <Link href="/providers" className="text-sm font-medium text-[var(--accent)]">
            查看全部平台
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredPlatforms.map((platform) => (
            <PlatformCard key={platform.slug} platform={platform} />
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="soft-card rounded-[32px] p-7">
          <p className="text-sm uppercase tracking-[0.26em] text-[var(--accent)]">上线方式</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--ink)]">这个站点现在适合直接静态上线</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            不需要先做会员、评论、收藏、数据库。先让链接页跑起来，再根据流量和转化决定要不要加复杂功能。
          </p>
        </div>

        <div className="soft-card rounded-[32px] p-7">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">01</div>
              <h3 className="mt-3 text-xl font-semibold text-[var(--ink)]">替换链接</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                把 `src/lib/siteData.ts` 里的示例链接，替换成你的真实邀请地址。
              </p>
            </div>
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">02</div>
              <h3 className="mt-3 text-xl font-semibold text-[var(--ink)]">补上福利</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                每个平台补一句“适合谁”和“一句福利说明”，已经足够形成转化。
              </p>
            </div>
            <div>
              <div className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">03</div>
              <h3 className="mt-3 text-xl font-semibold text-[var(--ink)]">直接部署</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                内容填完后就可以部署，不需要等复杂后台。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
