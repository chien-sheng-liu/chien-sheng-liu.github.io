import Link from 'next/link';
import { getArticle } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default async function ArticlePage({ params }) {
  const { slug } = params;
  const data = await getArticle(slug, 'zh');
  const { meta, content } = data;
  const { html, toc } = markdownToHtml(content);
  return (
    <div className="relative min-h-screen text-[var(--color-white)] overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 max-w-6xl">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--color-electric-blue)] to-[var(--color-violet-glow)]">{meta.title}</h1>
          <div className="text-sm text-[var(--color-gray-400)] mb-6">{meta.date} · {meta.readingTime}</div>
          <article className="leading-relaxed text-[var(--color-gray-200)] space-y-4">
            <MarkdownRenderer html={html} />
          </article>
          <div className="mt-8">
            <Link href="/articles" className="text-[var(--color-electric-blue)] hover:text-[var(--color-violet-glow)] font-semibold">← 回到文章列表</Link>
          </div>
        </div>
        <aside className="hidden lg:block sticky top-28 h-max bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="text-sm font-semibold text-white mb-2">目錄</div>
          <nav className="space-y-1">
            {toc.map((h) => {
              const indent = Math.max(0, h.level - 2) * 12; // px
              return (
                <a key={h.id} href={`#${h.id}`} className="block text-[var(--color-gray-300)] hover:text-white transition-colors" style={{ paddingLeft: `${indent}px` }}>{h.text}</a>
              );
            })}
          </nav>
        </aside>
      </div>
    </div>
  );
}
