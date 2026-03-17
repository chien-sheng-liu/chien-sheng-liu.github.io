import Link from 'next/link';
import { FaBookOpen, FaArrowRight } from 'react-icons/fa';
import { listArticles } from '@/lib/content';

export default async function ArticlesPage() {
  const posts = await listArticles('zh');
  return (
    <div className="relative min-h-screen text-[var(--color-white)] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--color-electric-blue)] rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-[var(--color-violet-glow)] rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-[var(--color-electric-blue)] to-[var(--color-violet-glow)]">文章</h1>
          <p className="text-[var(--color-gray-300)] text-lg max-w-3xl mx-auto">記錄我對 AI、資料工程與產品落地的思考與實作。</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article key={post.slug} className="group relative overflow-hidden bg-gradient-to-br from-[var(--color-gray-800)]/80 to-[var(--color-gray-800)]/40 backdrop-blur-xl rounded-2xl p-6 border border-[var(--color-gray-700)]/50 transition-all duration-300 hover:border-[var(--color-electric-blue)]/50 hover:shadow-2xl hover:shadow-[var(--color-electric-blue)]/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-electric-blue)]/5 to-[var(--color-violet-glow)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center space-x-2 text-[var(--color-electric-blue)]"><FaBookOpen /><span className="text-xs uppercase tracking-wide">Article</span></div>
                  <div className="text-xs text-[var(--color-gray-400)]">{post.date} · {post.readingTime}</div>
                </div>
                <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--color-electric-blue)] transition-colors duration-300">{post.title}</h2>
                <p className="text-[var(--color-gray-400)] mb-4 leading-relaxed group-hover:text-[var(--color-gray-300)] transition-colors duration-300">{post.summary}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((t) => (<span key={t} className="px-2 py-1 bg-[var(--color-electric-blue)]/10 border border-[var(--color-electric-blue)]/20 rounded-full text-[10px] font-medium text-[var(--color-electric-blue)]">{t}</span>))}
                </div>
                <Link href={`/articles/${post.slug}`} className="inline-flex items-center text-[var(--color-electric-blue)] font-semibold group-hover:text-[var(--color-violet-glow)] transition-colors duration-300">閱讀全文 <FaArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
