import Link from 'next/link'
import { platforms } from '../../lib/siteData'

const checklist = [
  '把每个平台的 inviteLink 换成你的真实邀请地址',
  'bonus 和 rebate 用一句话写清楚，不要留空',
  '如果某个平台你没有合作，就先不要挂'
]

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <section className="glass-panel rounded-[36px] px-6 py-10 sm:px-8 lg:px-10">
        <p className="text-sm uppercase tracking-[0.28em] text-[var(--accent)]">领取说明</p>
        <h1 className="mt-4 text-4xl font-semibold text-[var(--ink)]">先把站点说明写清楚，再去发链接</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">
          这页不做复杂对比了，直接改成一个“怎么选、怎么领、去哪里看详情”的说明页，更贴近你现在要先把网站立起来的目标。
        </p>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="soft-card rounded-[32px] p-7">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">上线前检查</p>
          <div className="mt-4 grid gap-4">
            {checklist.map((item, index) => (
              <div key={index} className="flex gap-4 rounded-[20px] bg-[rgba(255,255,255,0.64)] p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-medium text-white">
                  {index + 1}
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="soft-card rounded-[32px] p-7">
          <p className="text-sm uppercase tracking-[0.24em] text-[var(--accent)]">现在适合怎么放</p>
          <div className="mt-4 grid gap-3">
            {platforms.map((platform) => (
              <div key={platform.slug} className="rounded-[20px] border border-[rgba(43,38,34,0.08)] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-[var(--ink)]">{platform.name}</h2>
                    <p className="mt-1 text-sm text-[var(--muted)]">{platform.tagline}</p>
                  </div>
                  <Link href={`/providers/${platform.slug}`} className="text-sm font-medium text-[var(--accent)]">
                    看详情
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
