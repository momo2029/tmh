import Link from 'next/link'
import type { Platform } from '../lib/siteData'

export default function PlatformCard({ platform }: { platform: Platform }) {
  return (
    <article className="soft-card flex h-full flex-col rounded-[28px] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--muted)]">{platform.category}</p>
          <h3 className="mt-3 text-2xl font-semibold text-[var(--ink)]">{platform.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{platform.tagline}</p>
        </div>
        <div className="rounded-full bg-[rgba(17,95,89,0.1)] px-3 py-1 text-xs font-medium text-[var(--accent)]">
          专属入口
        </div>
      </div>

      <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{platform.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {platform.badges.map((badge) => (
          <span
            key={badge}
            className="rounded-full bg-[rgba(201,111,51,0.12)] px-3 py-1 text-xs font-medium text-[var(--accent-strong)]"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-3 rounded-[22px] bg-[rgba(17,95,89,0.06)] p-4 text-sm text-[var(--muted)]">
        <p>
          <span className="font-medium text-[var(--ink)]">适合人群：</span>
          {platform.audience}
        </p>
        <p>
          <span className="font-medium text-[var(--ink)]">专属福利：</span>
          {platform.bonus}
        </p>
      </div>

      <div className="mt-6 flex gap-3">
        <a
          href={platform.inviteLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:opacity-92"
        >
          进入邀请链接
        </a>
        <Link
          href={`/providers/${platform.slug}`}
          className="inline-flex items-center justify-center rounded-full border border-[rgba(43,38,34,0.12)] px-5 py-3 text-sm font-medium text-[var(--ink)] transition hover:bg-[rgba(201,111,51,0.08)]"
        >
          查看详情
        </Link>
      </div>

      {platform.extraLinks && platform.extraLinks.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {platform.extraLinks.slice(0, 2).map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[rgba(43,38,34,0.1)] px-3 py-2 text-xs font-medium text-[var(--muted)] transition hover:bg-[rgba(17,95,89,0.08)] hover:text-[var(--ink)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
