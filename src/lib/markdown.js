import { marked } from 'marked';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\u3400-\u4dbf\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function markdownToHtml(markdown) {
  if (!markdown) return { html: '', toc: [] };

  const toc = [];

  const renderer = new marked.Renderer();

  renderer.heading = function ({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    // Strip HTML tags from text for TOC display
    const plainText = text.replace(/<[^>]*>/g, '');
    const id = slugify(plainText);

    if (depth >= 2 && depth <= 3) {
      toc.push({ id, text: plainText, level: depth });
    }

    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };

  // Add language class to code blocks for Shiki highlighting
  renderer.code = function ({ text, lang }) {
    const langClass = lang ? ` class="language-${lang}"` : '';
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<pre><code${langClass}>${escaped}</code></pre>`;
  };

  marked.setOptions({
    renderer,
    gfm: true,
    breaks: false,
  });

  const html = marked.parse(markdown);

  return { html, toc };
}
