import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { platforms } from '../../../lib/siteData'

interface ProviderDetailPageProps {
  params: {
    id: string
  }
}

export function generateStaticParams() {
  return platforms.map((platform) => ({
    id: platform.slug
  }))
}

export function generateMetadata({ params }: ProviderDetailPageProps): Metadata {
  const platform = platforms.find((item) => item.slug === params.id)

  if (!platform) {
    return {
      title: '平台不存在'
    }
  }

  return {
    title: `${platform.name} | 邀请链接详情`,
    description: platform.description
  }
}

export default function ProviderDetailPage({ params }: ProviderDetailPageProps) {
  const platform = platforms.find((item) => item.slug === params.id)

  if (!platform) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="glass-panel rounded-[36px] px-6 py-10 sm:px-8 lg:px-10">
        <Link href="/providers" className="text-sm font-medium text-[var(--accent)]">
          返回全部平台
        </Link>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">{platform.category}</p>
            <h1 className="mt-3 text-4xl font-semibold text-[var(--ink)]">{platform.name}</h1>
            <p className="mt-4 text-lg leading-8 text-[var(--muted)]">{platform.tagline}</p>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">{platform.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {platform.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-[rgba(201,111,51,0.12)] px-3 py-1 text-xs font-medium text-[var(--accent-strong)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <aside className="soft-card rounded-[30px] p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-[var(--muted)]">领取入口</p>
            <div className="mt-4 rounded-[22px] bg-[rgba(17,95,89,0.08)] p-4 text-sm leading-7 text-[var(--muted)]">
              <p>
                <span className="font-medium text-[var(--ink)]">专属福利：</span>
                {platform.bonus}
              </p>
              <p className="mt-2">
                <span className="font-medium text-[var(--ink)]">返佣说明：</span>
                {platform.rebate}
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              <a
                href={platform.inviteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent-strong)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-92"
              >
                打开邀请链接
              </a>
              <a
                href={platform.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[rgba(43,38,34,0.12)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[rgba(17,95,89,0.08)]"
              >
                查看官网
              </a>
            </div>

            {platform.extraLinks && platform.extraLinks.length > 0 && (
              <div className="mt-5 grid gap-2">
                {platform.extraLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[18px] border border-[rgba(43,38,34,0.1)] px-4 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[rgba(17,95,89,0.08)]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="soft-card rounded-[32px] p-7">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">适合谁</p>
          <p className="mt-4 text-base leading-8 text-[var(--muted)]">{platform.audience}</p>
        </div>

        <div className="soft-card rounded-[32px] p-7">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">三步开始</p>
          <div className="mt-4 grid gap-4">
            {platform.steps.map((step, index) => (
              <div key={index} className="flex gap-4 rounded-[20px] bg-[rgba(255,255,255,0.6)] p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-medium text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
