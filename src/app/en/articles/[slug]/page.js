import { getArticle } from '@/lib/content';
import { markdownToHtml } from '@/lib/markdown';
import ArticleDetailPage from '@/components/ArticleDetailPage';

export default async function ArticlePageEn({ params }) {
  const { slug } = await params;
  const data = await getArticle(slug, 'en');
  const { meta, content } = data;
  const { html, toc } = markdownToHtml(content);
  return <ArticleDetailPage meta={meta} html={html} toc={toc} locale="en" />;
}
