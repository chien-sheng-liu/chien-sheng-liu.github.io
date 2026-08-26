import { getArticle, listArticles } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';
import ArticleDetailPage from '@/components/ArticleDetailPage';
import JsonLd from '@/components/JsonLd';
import { notFound } from 'next/navigation';
import { articleJsonLd, breadcrumbJsonLd, buildPageMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  const articles = await listArticles('zh');
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getArticle(slug, 'zh');
  if (!data) return {};
  const { meta } = data;
  return {
    ...buildPageMetadata({
      locale: 'zh',
      path: `/articles/${slug}`,
      title: `${meta.seoTitle || meta.title}｜Morris Liu`,
      description: meta.seoDescription || meta.summary,
      type: 'article',
      publishedTime: meta.date || undefined,
      modifiedTime: meta.updated || undefined,
      tags: meta.tags,
      image: '/media/selected-work/martech-editorial.webp',
    }),
    keywords: meta.keywords,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const data = await getArticle(slug, 'zh');
  if (!data) notFound();
  const { meta, content } = data;
  const { html, toc } = markdownToHtml(content);
  return (
    <>
      <JsonLd data={articleJsonLd(meta, slug, 'zh')} />
      <JsonLd data={breadcrumbJsonLd([
        { name: '首頁', path: '/' },
        { name: '文章', path: '/articles' },
        { name: meta.title, path: `/articles/${slug}` },
      ])} />
      <ArticleDetailPage meta={meta} html={html} toc={toc} locale="zh" />
    </>
  );
}
