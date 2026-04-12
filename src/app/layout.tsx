import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import { siteConfig } from '../lib/siteData'

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.heroLabel}`,
  description: siteConfig.description
}

const navItems = [
  { href: '/', label: '首页' },
  { href: '/providers', label: '全部平台' },
  { href: '/compare', label: '领取说明' }
]

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="site-shell">
          <header className="border-b border-[rgba(43,38,34,0.1)] bg-[rgba(255,248,236,0.85)] backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--accent-strong)] text-sm font-semibold text-white">
                  TM
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.28em] text-[var(--muted)]">Invite Hub</div>
                  <div className="text-lg font-semibold text-[var(--ink)]">{siteConfig.name}</div>
                </div>
              </Link>

              <nav className="flex items-center gap-2 text-sm text-[var(--muted)]">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full px-4 py-2 transition hover:bg-[rgba(17,95,89,0.08)] hover:text-[var(--ink)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>

          <main>{children}</main>

          <footer className="border-t border-[rgba(43,38,34,0.1)] bg-[rgba(255,248,236,0.72)]">
            <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-[var(--muted)] sm:px-6 lg:px-8">
              <p className="text-[var(--ink)]">{siteConfig.contactText}</p>
              <p className="mt-2">你后面主要维护的文件是 `src/lib/siteData.ts`。</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
