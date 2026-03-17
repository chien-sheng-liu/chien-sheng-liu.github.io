import fs from 'fs';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content');

export async function listArticles(locale = 'zh') {
  try {
    const articlesDir = path.join(contentDirectory, 'articles');
    if (!fs.existsSync(articlesDir)) return [];
    
    const files = fs.readdirSync(articlesDir);
    const articles = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const slug = file.replace('.md', '');
        const fullPath = path.join(articlesDir, file);
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Simple frontmatter extraction
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        const frontmatter = {};
        if (frontmatterMatch) {
          frontmatterMatch[1].split('\n').forEach(line => {
            const [key, ...values] = line.split(':');
            if (key && values.length) {
              frontmatter[key.trim()] = values.join(':').trim().replace(/['"]/g, '');
            }
          });
        }
        
        return {
          slug,
          title: frontmatter.title || slug,
          excerpt: frontmatter.excerpt || '',
          date: frontmatter.date || '',
          locale: frontmatter.locale || 'zh'
        };
      })
      .filter(article => article.locale === locale)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return articles;
  } catch (error) {
    console.error('Error listing articles:', error);
    return [];
  }
}

export async function getArticle(slug, locale = 'zh') {
  try {
    const filePath = path.join(contentDirectory, 'articles', `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract frontmatter and content
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!frontmatterMatch) return null;
    
    const frontmatter = {};
    frontmatterMatch[1].split('\n').forEach(line => {
      const [key, ...values] = line.split(':');
      if (key && values.length) {
        frontmatter[key.trim()] = values.join(':').trim().replace(/['"]/g, '');
      }
    });
    
    return {
      slug,
      title: frontmatter.title || slug,
      content: frontmatterMatch[2].trim(),
      date: frontmatter.date || '',
      excerpt: frontmatter.excerpt || '',
      locale: frontmatter.locale || 'zh'
    };
  } catch (error) {
    console.error('Error getting article:', error);
    return null;
  }
}

export async function listProjects(locale = 'zh') {
  try {
    const projectsDir = path.join(contentDirectory, 'projects');
    if (!fs.existsSync(projectsDir)) return [];
    
    const files = fs.readdirSync(projectsDir);
    const projects = files
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const slug = file.replace('.md', '');
        const fullPath = path.join(projectsDir, file);
        const content = fs.readFileSync(fullPath, 'utf8');
        
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        const frontmatter = {};
        if (frontmatterMatch) {
          frontmatterMatch[1].split('\n').forEach(line => {
            const [key, ...values] = line.split(':');
            if (key && values.length) {
              frontmatter[key.trim()] = values.join(':').trim().replace(/['"]/g, '');
            }
          });
        }
        
        return {
          slug,
          title: frontmatter.title || slug,
          description: frontmatter.description || '',
          tech: frontmatter.tech || '',
          date: frontmatter.date || '',
          locale: frontmatter.locale || 'zh'
        };
      })
      .filter(project => project.locale === locale)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return projects;
  } catch (error) {
    console.error('Error listing projects:', error);
    return [];
  }
}