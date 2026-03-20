import { getArticle, listArticles } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';
import ArticleDetailPage from '@/components/ArticleDetailPage';

export async function generateStaticParams() {
  const articles = await listArticles('zh');
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const data = await getArticle(slug, 'zh');
  const { meta, content } = data;
  const { html, toc } = markdownToHtml(content);
  return <ArticleDetailPage meta={meta} html={html} toc={toc} locale="zh" />;
}
