import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content');

function parseFrontmatter(raw) {
  const frontmatter = {};
  raw.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;
    const key = line.slice(0, colonIndex).trim();
    const value = line.slice(colonIndex + 1).trim();
    if (!key) return;

    // Parse array values like [a, b, c]
    const arrayMatch = value.match(/^\[(.*)\]$/);
    if (arrayMatch) {
      frontmatter[key] = arrayMatch[1].split(',').map(s => s.trim().replace(/['"]/g, ''));
    } else {
      frontmatter[key] = value.replace(/^['"]|['"]$/g, '');
    }
  });
  return frontmatter;
}

function estimateReadingTime(content, locale) {
  // Chinese/CJK: ~400 chars/min; English: ~200 words/min
  const cjkChars = (content.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;
  const words = content.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, '').split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(cjkChars / 400 + words / 200);
  const min = Math.max(1, minutes);
  return locale === 'en' ? `${min} min` : `${min} 分鐘`;
}

export async function listArticles(locale = 'zh') {
  try {
    const articlesDir = path.join(contentDirectory, 'articles', locale);
    if (!fs.existsSync(articlesDir)) return [];

    const files = fs.readdirSync(articlesDir);
    const articles = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const slug = file.replace('.md', '');
        const fullPath = path.join(articlesDir, file);
        const raw = fs.readFileSync(fullPath, 'utf8');

        const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
        if (!frontmatterMatch) return null;

        const frontmatter = parseFrontmatter(frontmatterMatch[1]);
        const body = frontmatterMatch[2] || '';

        // Build excerpt from first paragraph of body
        const firstPara = body.trim().split(/\n\n/)[0] || '';
        const excerpt = firstPara.replace(/[#>*`\[\]()_~]/g, '').trim().slice(0, 120);

        return {
          slug,
          title: frontmatter.title || slug,
          summary: frontmatter.summary || excerpt,
          excerpt: frontmatter.excerpt || excerpt,
          date: frontmatter.date || '',
          readingTime: frontmatter.readingTime || estimateReadingTime(body, locale),
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    return articles;
  } catch (error) {
    console.error('Error listing articles:', error);
    return [];
  }
}

export async function getArticle(slug, locale = 'zh') {
  try {
    const filePath = path.join(contentDirectory, 'articles', locale, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, 'utf8');

    const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!frontmatterMatch) return null;

    const frontmatter = parseFrontmatter(frontmatterMatch[1]);
    const body = frontmatterMatch[2].trim();

    return {
      meta: {
        title: frontmatter.title || slug,
        date: frontmatter.date || '',
        readingTime: frontmatter.readingTime || estimateReadingTime(body, locale),
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
        summary: frontmatter.summary || '',
        excerpt: frontmatter.excerpt || '',
      },
      content: body,
    };
  } catch (error) {
    console.error('Error getting article:', error);
    return null;
  }
}

export async function listProjects(locale = 'zh') {
  try {
    const projectsDir = path.join(contentDirectory, 'projects', locale);
    if (!fs.existsSync(projectsDir)) {
      // Fallback to flat directory for backwards compatibility
      const flatDir = path.join(contentDirectory, 'projects');
      if (!fs.existsSync(flatDir)) return [];
      return readProjectsFromDir(flatDir, locale);
    }
    return readProjectsFromDir(projectsDir);
  } catch (error) {
    console.error('Error listing projects:', error);
    return [];
  }
}

function readProjectsFromDir(dir, filterLocale) {
  const files = fs.readdirSync(dir);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace('.md', '');
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, 'utf8');

      const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
      const frontmatter = frontmatterMatch ? parseFrontmatter(frontmatterMatch[1]) : {};

      return {
        slug,
        title: frontmatter.title || slug,
        description: frontmatter.description || '',
        tech: frontmatter.tech || '',
        date: frontmatter.date || '',
        locale: frontmatter.locale || 'zh',
      };
    })
    .filter(p => !filterLocale || p.locale === filterLocale)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
