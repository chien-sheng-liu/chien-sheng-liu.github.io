"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { DEFAULT_ARTICLE, TONES } from "@/lib/constants";

const STATUS_LABELS = {
  Draft: "草稿",
  Ready: "待發布",
  Publishing: "發布中",
  Published: "已上架",
  Unpublishing: "下架中",
  Unpublished: "已下架",
  Archived: "已典藏",
  Error: "需處理",
};

const GENERATION_STEPS = [
  { title: "研究資料", description: "搜尋可信來源並整理可用事實" },
  { title: "規劃大綱", description: "整理文章論點、結構與 SEO 方向" },
  { title: "撰寫中文", description: "產生可供你修改的繁體中文初稿" },
  { title: "同步英文", description: "翻譯並同步英文 SEO 內容" },
  { title: "視覺判斷", description: "Agent 判斷哪些段落真的需要圖解" },
  { title: "生成配圖", description: "逐張產圖、存入 Notion 並插入文章" },
];

async function api(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const payload = response.status === 204 ? null : await response.json();
  if (!response.ok) {
    const error = new Error(payload?.error || "請求失敗");
    error.details = payload?.details;
    throw error;
  }
  return payload;
}

function messageFromError(error) {
  if (Array.isArray(error.details) && error.details.length) {
    return `${error.message}：${error.details.join("、")}`;
  }
  if (typeof error.details === "string" && error.details.trim()) {
    return `${error.message}\n${error.details.trim()}`;
  }
  return error.message;
}

function cleanPreview(markdown) {
  return DOMPurify.sanitize(marked.parse(markdown || ""), {
    USE_PROFILES: { html: true },
  });
}

function StatusBadge({ status }) {
  return <span className={`status status--${status.toLowerCase()}`}>{STATUS_LABELS[status] || status}</span>;
}

function ConnectionDot({ ok, label }) {
  return (
    <span className="connection">
      <i className={ok ? "is-ok" : ""} />
      {label}
    </span>
  );
}

export default function AdminApp() {
  const [config, setConfig] = useState(null);
  const [articles, setArticles] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [draft, setDraft] = useState(null);
  const [locale, setLocale] = useState("zh");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [dirty, setDirty] = useState(false);
  const [outline, setOutline] = useState("");
  const [researchForm, setResearchForm] = useState({ topic: "", notes: "", urls: "" });
  const [setupPageId, setSetupPageId] = useState("");
  const [inspector, setInspector] = useState("assistant");
  const [viewMode, setViewMode] = useState("edit");
  const [generation, setGeneration] = useState({
    active: false,
    step: 0,
    status: "idle",
    detail: "",
    visualDecision: "",
  });
  const [generationSeconds, setGenerationSeconds] = useState(0);
  const editorRef = useRef(null);
  const saveTimer = useRef(null);

  const loadConfig = useCallback(async () => {
    const value = await api("/api/config");
    setConfig(value);
    return value;
  }, []);

  const loadArticles = useCallback(async () => {
    const value = await api("/api/articles");
    setArticles(value.articles);
    return value.articles;
  }, []);

  useEffect(() => {
    // Initial hydration is intentionally client-side because connection state is local and secret-backed.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadConfig()
      .then((value) => {
        if (value.connections.notionDataSources) return loadArticles();
        return [];
      })
      .catch((err) => setError(err.message));
  }, [loadArticles, loadConfig]);

  const openArticle = useCallback(async (id) => {
    setBusy("loading");
    setError("");
    try {
      const value = await api(`/api/articles/${id}`);
      setDraft(value.article);
      setSelectedId(id);
      setLocale("zh");
      setDirty(false);
      setOutline("");
      setInspector("assistant");
      setViewMode("edit");
      setGeneration({
        active: false,
        step: 0,
        status: "idle",
        detail: "",
        visualDecision: value.article.visualManifest?.rationale || "",
      });
      setGenerationSeconds(0);
      setResearchForm((current) => ({ ...current, topic: value.article.name }));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy("");
    }
  }, []);

  const updateDraft = useCallback((patch) => {
    setDraft((current) => ({ ...current, ...patch }));
    setDirty(true);
  }, []);

  const updateLocale = useCallback(
    (patch) => {
      setDraft((current) => ({
        ...current,
        ...(locale === "zh" && typeof patch.body === "string" ? { englishCurrent: false } : {}),
        locales: {
          ...current.locales,
          [locale]: { ...current.locales[locale], ...patch },
        },
      }));
      setDirty(true);
    },
    [locale],
  );

  const save = useCallback(
    async (silent = false) => {
      if (!draft?.id || !dirty || busy === "saving") return draft;
      setBusy("saving");
      setError("");
      try {
        const value = await api(`/api/articles/${draft.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            name: draft.name,
            slug: draft.slug,
            status: draft.status,
            category: draft.category,
            tags: draft.tags,
            tone: draft.tone,
            customPrompt: draft.customPrompt,
            targetZh: Number(draft.targetZh),
            targetEn: Number(draft.targetEn),
            autoVisuals: draft.autoVisuals,
            maxVisuals: Number(draft.maxVisuals),
            visualManifest: draft.visualManifest,
            research: draft.research,
            expectedLastEditedTime: draft.lastEditedTime,
            locales: {
              zh: {
                ...draft.locales.zh,
                expectedLastEditedTime: draft.locales.zh.lastEditedTime,
              },
              en: {
                ...draft.locales.en,
                expectedLastEditedTime: draft.locales.en.lastEditedTime,
              },
            },
          }),
        });
        setDraft(value.article);
        setDirty(false);
        setArticles((current) =>
          current.map((item) => (item.id === value.article.id ? value.article : item)),
        );
        if (!silent) setNotice("已儲存到 Notion");
        return value.article;
      } catch (err) {
        setError(messageFromError(err));
        throw err;
      } finally {
        setBusy("");
      }
    },
    [busy, dirty, draft],
  );

  useEffect(() => {
    if (!dirty || !draft?.id) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => save(true).catch(() => {}), 1800);
    return () => clearTimeout(saveTimer.current);
  }, [dirty, draft?.id, save]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2400);
    return () => clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    if (!generation.active) return;
    const timer = setInterval(() => setGenerationSeconds((seconds) => seconds + 1), 1000);
    return () => clearInterval(timer);
  }, [generation.active]);

  const create = async () => {
    setBusy("create");
    setError("");
    try {
      const value = await api("/api/articles", {
        method: "POST",
        body: JSON.stringify(DEFAULT_ARTICLE),
      });
      await loadArticles();
      await openArticle(value.article.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy("");
    }
  };

  const action = async (name, body = {}) => {
    if (!draft) return null;
    if (dirty) await save(true);
    setBusy(name);
    setError("");
    try {
      const value = await api(`/api/articles/${draft.id}/actions/${name}`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (value.article) {
        setDraft(value.article);
        setArticles((current) =>
          current.map((item) => (item.id === value.article.id ? value.article : item)),
        );
      }
      setNotice(
        {
          research: "研究資料已存入 Notion",
          outline: "大綱已生成",
          "generate-zh": "中文初稿已生成",
          "translate-en": "英文版本已同步",
          "visual-plan": "視覺內容 Agent 已完成判斷",
          "generate-visual": "文章配圖已生成",
          publish: "文章已發布",
          unpublish: "文章已下架",
          archive: "文章已典藏",
          restore: "文章已還原為草稿",
        }[name] || "操作完成",
      );
      return value;
    } catch (err) {
      setError(messageFromError(err));
      throw err;
    } finally {
      setBusy("");
    }
  };

  const syncArticle = (article) => {
    if (!article) return;
    setDraft(article);
    setArticles((current) =>
      current.map((item) => (item.id === article.id ? article : item)),
    );
    setDirty(false);
  };

  const runVisualAgent = async (maxVisuals) => {
    setGeneration((current) => ({
      ...current,
      active: true,
      step: 4,
      status: "working",
      detail: "",
    }));
    let value = await api(`/api/articles/${draft.id}/actions/visual-plan`, {
      method: "POST",
      body: JSON.stringify({ maxVisuals }),
    });
    syncArticle(value.article);
    const plan = value.result;
    setGeneration((current) => ({
      ...current,
      visualDecision: plan.rationale,
      detail: plan.visuals.length ? `建議產生 ${plan.visuals.length} 張圖` : "判斷不需要配圖",
    }));
    if (!plan.visuals.length) return value.article;

    for (let index = 0; index < plan.visuals.length; index += 1) {
      const visual = plan.visuals[index];
      setGeneration((current) => ({
        ...current,
        active: true,
        step: 5,
        status: "working",
        detail: `正在產生第 ${index + 1}/${plan.visuals.length} 張：${visual.purpose}`,
      }));
      value = await api(`/api/articles/${draft.id}/actions/generate-visual`, {
        method: "POST",
        body: JSON.stringify({ visualId: visual.id }),
      });
      syncArticle(value.article);
    }
    return value.article;
  };

  const generateFullDraft = async () => {
    const topic = researchForm.topic.trim() || draft.name.trim();
    if (!topic || topic === "未命名文章") {
      setError("先告訴我這篇文章想寫什麼。");
      return;
    }
    setError("");
    const visualsEnabled = draft.autoVisuals !== false;
    const maxVisuals = Math.min(3, Math.max(1, Number(draft.maxVisuals) || 2));
    try {
      if (dirty) await save(true);
      setBusy("generate-all");
      setGenerationSeconds(0);
      setGeneration({
        active: true,
        step: 0,
        status: "working",
        detail: "",
        visualDecision: "",
      });

      let value = await api(`/api/articles/${draft.id}/actions/research`, {
        method: "POST",
        body: JSON.stringify({
          topic,
          notes: researchForm.notes,
          urls: researchForm.urls
            .split("\n")
            .map((item) => item.trim())
            .filter(Boolean),
          keywords: draft.tags,
        }),
      });
      syncArticle(value.article);

      setGeneration({ active: true, step: 1, status: "working" });
      value = await api(`/api/articles/${draft.id}/actions/outline`, {
        method: "POST",
        body: "{}",
      });
      const generatedOutline = value.result?.markdown || "";
      setOutline(generatedOutline);

      setGeneration({ active: true, step: 2, status: "working" });
      value = await api(`/api/articles/${draft.id}/actions/generate-zh`, {
        method: "POST",
        body: JSON.stringify({ outline: generatedOutline }),
      });
      syncArticle(value.article);

      setGeneration({ active: true, step: 3, status: "working" });
      value = await api(`/api/articles/${draft.id}/actions/translate-en`, {
        method: "POST",
        body: "{}",
      });
      syncArticle(value.article);

      if (visualsEnabled) {
        await runVisualAgent(maxVisuals);
      }

      setGeneration((current) => ({
        ...current,
        active: false,
        step: visualsEnabled ? 6 : 4,
        status: "done",
        detail: visualsEnabled ? current.detail : "視覺內容 Agent 已關閉",
      }));
      setLocale("zh");
      setNotice(
        visualsEnabled
          ? "完整雙語初稿與必要配圖已產生，現在換你修改"
          : "完整雙語初稿已產生，現在換你修改",
      );
    } catch (err) {
      setGeneration((current) => ({ ...current, active: false, status: "error" }));
      setError(messageFromError(err));
    } finally {
      setBusy("");
    }
  };

  const generateVisualsForCurrentDraft = async () => {
    if (!draft.locales.zh.body.trim() || !draft.locales.en.body.trim()) {
      setError("請先完成中英文文章，再讓視覺內容 Agent 檢查。");
      return;
    }
    setError("");
    try {
      if (dirty) await save(true);
      setBusy("visual-agent");
      setGenerationSeconds(0);
      setGeneration({
        active: true,
        step: 4,
        status: "working",
        detail: "",
        visualDecision: "",
      });
      await runVisualAgent(Math.min(3, Math.max(1, Number(draft.maxVisuals) || 2)));
      setGeneration((current) => ({
        ...current,
        active: false,
        step: 6,
        status: "done",
      }));
      setLocale("zh");
      setNotice("視覺內容 Agent 已完成檢查與配圖");
    } catch (err) {
      setGeneration((current) => ({ ...current, active: false, status: "error" }));
      setError(messageFromError(err));
    } finally {
      setBusy("");
    }
  };

  const openPreview = async () => {
    try {
      if (dirty) await save(true);
      setViewMode("preview");
    } catch {
      // Save already displays an actionable error.
    }
  };

  const rewrite = async (instruction) => {
    const textarea = editorRef.current;
    const start = textarea?.selectionStart || 0;
    const end = textarea?.selectionEnd || 0;
    const selection = draft.locales[locale].body.slice(start, end);
    if (!selection) {
      setError("請先在正文中選取一段文字。");
      return;
    }
    const value = await action("rewrite", { selection, instruction });
    if (!value?.result?.text) return;
    const body = draft.locales[locale].body;
    updateLocale({ body: `${body.slice(0, start)}${value.result.text}${body.slice(end)}` });
  };

  const remove = async () => {
    const confirmTitle = window.prompt(`輸入「${draft.name}」確認刪除：`);
    if (confirmTitle !== draft.name) return;
    setBusy("delete");
    try {
      await api(`/api/articles/${draft.id}`, {
        method: "DELETE",
        body: JSON.stringify({ confirmTitle }),
      });
      setDraft(null);
      setSelectedId("");
      await loadArticles();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy("");
    }
  };

  const setup = async () => {
    setBusy("setup");
    setError("");
    try {
      await api("/api/setup", {
        method: "POST",
        body: JSON.stringify({ databaseReference: setupPageId }),
      });
      await loadConfig();
      await loadArticles();
      setNotice("Notion 資料庫已連接");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy("");
    }
  };

  const filtered = useMemo(
    () =>
      articles.filter((article) => {
        const statusMatch = filter === "All" || article.status === filter;
        const text = `${article.name} ${article.slug} ${article.category} ${article.tags.join(" ")}`.toLowerCase();
        return statusMatch && text.includes(query.toLowerCase());
      }),
    [articles, filter, query],
  );

  const selectFilter = (status) => {
    setFilter(status);
    setDraft(null);
    setSelectedId("");
    setViewMode("edit");
  };

  const localized = draft?.locales?.[locale];
  const englishCurrent = Boolean(draft?.englishCurrent);
  const generationSteps =
    draft?.autoVisuals !== false || busy === "visual-agent"
      ? GENERATION_STEPS
      : GENERATION_STEPS.slice(0, 4);
  const connectionsReady =
    config?.connections?.openai &&
    config?.connections?.notion &&
    config?.connections?.notionDataSources;

  if (!config) {
    return <main className="splash">正在檢查本機環境…</main>;
  }

  if (!config.connections.notionDataSources) {
    return (
      <main className="setup">
        <section className="setup__card">
          <span className="eyebrow">MORRIS WRITING STUDIO</span>
          <h1>先連接你的寫作資料庫</h1>
          <p>
            直接貼上現有的 Notion 資料庫網址。系統會沿用文章資料表、補上缺少的欄位，
            並在同一個資料庫中建立 Article Locales；既有資料不會被刪除。
          </p>
          <div className="connection-row">
            <ConnectionDot ok={config.connections.openai} label="OpenAI" />
            <ConnectionDot ok={config.connections.notion} label="Notion" />
            <ConnectionDot ok={config.github.authenticated} label="GitHub CLI" />
          </div>
          <label>
            Notion 資料庫網址
            <input
              value={setupPageId}
              onChange={(event) => setSetupPageId(event.target.value)}
              placeholder="https://www.notion.so/…?v=…"
            />
          </label>
          <button className="button button--primary" disabled={!setupPageId || busy} onClick={setup}>
            {busy === "setup" ? "連接中…" : "連接 Notion 資料庫"}
          </button>
          {!config.connections.notion && (
            <p className="setup__warning">請先把 NOTION_API_KEY 寫入 admin/.env.local 並重啟。</p>
          )}
          {error && <div className="error-box">{error}</div>}
        </section>
      </main>
    );
  }

  return (
    <main className="admin-shell">
      <aside className="sidebar">
        <header className="brand">
          <div className="brand__mark">M</div>
          <div>
            <strong>Writing Studio</strong>
            <span>Notion × AI × GitHub</span>
          </div>
        </header>

        <button className="new-button" onClick={create} disabled={Boolean(busy)}>
          <span>＋</span> 新增文章
        </button>

        <nav className="filters" aria-label="文章狀態">
          {["All", "Draft", "Ready", "Published", "Unpublished", "Archived", "Error"].map(
            (status) => (
              <button
                className={filter === status ? "is-active" : ""}
                key={status}
                onClick={() => selectFilter(status)}
              >
                {status === "All" ? "全部文章" : STATUS_LABELS[status]}
                <span>
                  {status === "All"
                    ? articles.length
                    : articles.filter((article) => article.status === status).length}
                </span>
              </button>
            ),
          )}
        </nav>

        <footer className="sidebar__footer">
          <ConnectionDot ok={connectionsReady} label="Notion / OpenAI" />
          <ConnectionDot ok={config.github.authenticated} label="GitHub" />
          <span className="model">文字 {config.model} · 圖片 {config.imageModel}</span>
        </footer>
      </aside>

      {!draft ? (
        <section className="article-library">
          <header className="article-library__header">
            <div>
              <span className="eyebrow">CONTENT LIBRARY</span>
              <h1>{filter === "All" ? "全部文章" : STATUS_LABELS[filter]}</h1>
              <p>{filtered.length} 篇文章</p>
            </div>
            <button className="button button--primary" onClick={create} disabled={Boolean(busy)}>
              ＋ 新增文章
            </button>
          </header>

          <div className="article-library__tools">
            <div className="search search--library">
              <span>⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜尋標題、slug、分類或標籤"
              />
            </div>
          </div>

          <div className="article-library__list">
            {filtered.map((article) => (
              <button
                className={`library-row ${selectedId === article.id ? "is-active" : ""}`}
                key={article.id}
                onClick={() => openArticle(article.id)}
              >
                <span className="library-row__content">
                  <strong>{article.name || "未命名文章"}</strong>
                  <small>
                    {article.category || "未分類"} · {article.slug || "no-slug"}
                  </small>
                </span>
                <span className="library-row__tags">
                  {article.tags.length ? article.tags.slice(0, 3).join(" · ") : "尚無標籤"}
                </span>
                <StatusBadge status={article.status} />
                <span className="library-row__open">編輯 →</span>
              </button>
            ))}
            {!filtered.length && (
              <div className="article-library__empty">
                <span>✦</span>
                <h2>這裡還沒有文章</h2>
                <p>調整搜尋條件，或建立一篇新的雙語草稿。</p>
              </div>
            )}
          </div>

          {!config.github.authenticated && (
            <div className="error-box">GitHub CLI 尚未登入；發布前請執行 gh auth login。</div>
          )}
        </section>
      ) : (
        <section className="workspace">
          {viewMode === "preview" ? (
            <>
              <header className="workspace__header preview-header">
                <div>
                  <div className="breadcrumb">FINAL CHECK</div>
                  <strong>發布前預覽</strong>
                </div>
                <div className="header-actions">
                  <button className="button" onClick={() => setViewMode("edit")} disabled={Boolean(busy)}>
                    ← 返回修改
                  </button>
                  <button
                    className="button button--primary"
                    onClick={() => action("publish")}
                    disabled={Boolean(busy)}
                  >
                    {busy === "publish"
                      ? "正在發布…"
                      : draft.status === "Published"
                        ? "確認更新網站"
                        : "確認送出並發布"}
                  </button>
                </div>
              </header>
              <div className="preview-screen">
                <div className="preview-screen__toolbar">
                  <div className="locale-tabs locale-tabs--preview">
                    <button className={locale === "zh" ? "is-active" : ""} onClick={() => setLocale("zh")}>
                      繁體中文
                    </button>
                    <button className={locale === "en" ? "is-active" : ""} onClick={() => setLocale("en")}>
                      English
                    </button>
                  </div>
                  <span>確認標題、摘要、正文與連結後再發布</span>
                </div>
                <article className="article-preview article-preview--full">
                  <div className="article-preview__meta">{draft.category} · {draft.tags.join(" · ")}</div>
                  <h1>{localized.title || (locale === "zh" ? "文章標題" : "Article title")}</h1>
                  <p className="article-preview__summary">{localized.summary}</p>
                  <div className="article-preview__body" dangerouslySetInnerHTML={{ __html: cleanPreview(localized.body) }} />
                </article>
              </div>
            </>
          ) : (
            <>
              <header className="workspace__header">
                <div className="workspace__identity">
                  <button className="back-button" onClick={() => selectFilter(filter)} aria-label="回到文章列表">
                    ←
                  </button>
                  <div>
                    <div className="breadcrumb">ARTICLES / {draft.slug || "NEW-DRAFT"}</div>
                    <input
                      className="working-title"
                      value={draft.name}
                      onChange={(event) => updateDraft({ name: event.target.value })}
                      aria-label="工作標題"
                    />
                  </div>
                </div>
                <div className="header-actions">
                  <span className={`save-state ${dirty ? "is-dirty" : ""}`}>
                    {busy === "saving" ? "儲存中…" : dirty ? "尚未儲存" : "已同步 Notion"}
                  </span>
                  <button className="button" onClick={() => save(false)} disabled={!dirty || Boolean(busy)}>
                    儲存
                  </button>
                  <button
                    className="button button--primary"
                    onClick={openPreview}
                    disabled={Boolean(busy) || !localized.body.trim()}
                  >
                    預覽與發布 →
                  </button>
                </div>
              </header>

              <div className="writer-layout">
                <section className="editor-panel">
                  <div className="locale-tabs">
                    <button className={locale === "zh" ? "is-active" : ""} onClick={() => setLocale("zh")}>
                      繁體中文
                    </button>
                    <button className={locale === "en" ? "is-active" : ""} onClick={() => setLocale("en")}>
                      English
                      <i className={englishCurrent ? "sync-ok" : "sync-stale"} title={englishCurrent ? "與中文同步" : "需要重新翻譯"} />
                    </button>
                  </div>

                  <div className="seo-fields">
                    <input
                      className="article-title-input"
                      value={localized.title}
                      onChange={(event) => updateLocale({ title: event.target.value })}
                      placeholder={locale === "zh" ? "文章標題" : "Article title"}
                    />
                    <textarea
                      rows="2"
                      value={localized.summary}
                      onChange={(event) => updateLocale({ summary: event.target.value })}
                      placeholder={locale === "zh" ? "一句話摘要" : "One-sentence summary"}
                    />
                  </div>

                  <div className="editor-toolbar">
                    <span>選取一段文字後使用 AI</span>
                    <div>
                      <button onClick={() => rewrite("讓文字更精煉")}>縮短</button>
                      <button onClick={() => rewrite("補充有用的解釋，但不要新增未查證事實")}>延伸</button>
                      <button onClick={() => rewrite("依文章設定調整語氣並改善流暢度")}>調語氣</button>
                      <button onClick={() => rewrite("修正文法、結構與 Markdown 格式")}>修正</button>
                    </div>
                  </div>
                  <textarea
                    ref={editorRef}
                    className="markdown-editor"
                    value={localized.body}
                    onChange={(event) => updateLocale({ body: event.target.value })}
                    spellCheck
                    placeholder={locale === "zh" ? "AI 初稿會出現在這裡，你也可以直接開始寫…" : "The English draft will appear here…"}
                  />
                  <footer className="editor-stats">
                    <span>{locale === "zh" ? `${(localized.body.match(/[\u3400-\u9fff]/g) || []).length} 中文字` : `${localized.body.trim().split(/\s+/).filter(Boolean).length} words`}</span>
                    <span>{localized.body.split("\n").length} 行</span>
                  </footer>
                </section>

                <aside className="inspector-panel">
                  <div className="inspector-tabs">
                    <button className={inspector === "assistant" ? "is-active" : ""} onClick={() => setInspector("assistant")}>
                      ✦ AI 初稿助手
                    </button>
                    <button className={inspector === "settings" ? "is-active" : ""} onClick={() => setInspector("settings")}>
                      進階設定
                    </button>
                  </div>

                  {inspector === "assistant" ? (
                    <div className="inspector-content">
                      <span className="eyebrow">ONE-CLICK DRAFT</span>
                      <h2>先讓 AI 寫，你再改</h2>
                      <p className="inspector-intro">
                        只要填主題和你的想法。研究、大綱、中英文初稿會自動完成。
                      </p>
                      <label>
                        這篇想寫什麼？
                        <input
                          value={researchForm.topic}
                          onChange={(event) => setResearchForm({ ...researchForm, topic: event.target.value })}
                          placeholder="例如：PM 如何用 AI 改善決策品質"
                        />
                      </label>
                      <label>
                        我想加入的觀點（選填）
                        <textarea
                          rows="6"
                          value={researchForm.notes}
                          onChange={(event) => setResearchForm({ ...researchForm, notes: event.target.value })}
                          placeholder="貼上筆記、經驗、立場，或一定要提到的內容"
                        />
                      </label>
                      <details className="optional-input">
                        <summary>指定參考網址（選填）</summary>
                        <textarea
                          rows="4"
                          value={researchForm.urls}
                          onChange={(event) => setResearchForm({ ...researchForm, urls: event.target.value })}
                          placeholder="一行一個網址"
                        />
                      </details>
                      <div className={`visual-agent-card ${draft.autoVisuals ? "is-on" : ""}`}>
                        <div className="visual-agent-card__heading">
                          <span className="visual-agent-card__avatar">V</span>
                          <span>
                            <strong>視覺內容 Agent</strong>
                            <small>只在圖片能幫助理解時才產生</small>
                          </span>
                          <label className="switch" aria-label="自動產生必要配圖">
                            <input
                              type="checkbox"
                              checked={draft.autoVisuals !== false}
                              onChange={(event) => updateDraft({ autoVisuals: event.target.checked })}
                            />
                            <i />
                          </label>
                        </div>
                        {draft.autoVisuals !== false && (
                          <div className="visual-agent-card__setting">
                            <span>每篇最多</span>
                            <select
                              value={draft.maxVisuals}
                              onChange={(event) => updateDraft({ maxVisuals: Number(event.target.value) })}
                            >
                              <option value="1">1 張</option>
                              <option value="2">2 張</option>
                              <option value="3">3 張</option>
                            </select>
                            <span>文章配圖</span>
                          </div>
                        )}
                      </div>
                      <button
                        className="generate-button"
                        onClick={generateFullDraft}
                        disabled={Boolean(busy)}
                      >
                        <span>✦</span>
                        {generation.active ? "AI 正在產生完整初稿…" : "AI 產生完整雙語初稿"}
                      </button>
                      <p className="generate-hint">
                        {draft.autoVisuals !== false
                          ? "文字通常 2–5 分鐘；每張圖可能再需要約 1–2 分鐘。"
                          : "通常需要 2–5 分鐘，可留在此頁查看進度。"}
                      </p>

                      {(generation.status !== "idle" || generation.active) && (
                        <div className={`generation-progress generation-progress--${generation.status}`} aria-live="polite">
                          <div className="generation-progress__header">
                            <strong>
                              {generation.status === "done"
                                ? "內容生成已完成"
                                : generation.status === "error"
                                  ? "生成中斷"
                                  : `正在${GENERATION_STEPS[generation.step]?.title || "完成"}`}
                            </strong>
                            <span>
                              {Math.floor(generationSeconds / 60)}:
                              {String(generationSeconds % 60).padStart(2, "0")}
                            </span>
                          </div>
                          <div className="generation-progress__track">
                            <i
                              style={{
                                width: `${Math.max(
                                  8,
                                  (generation.step / generationSteps.length) * 100,
                                )}%`,
                              }}
                            />
                          </div>
                          <ol>
                            {generationSteps.map((step, index) => {
                              const complete = index < generation.step || generation.status === "done";
                              const active = generation.active && index === generation.step;
                              return (
                                <li className={complete ? "is-complete" : active ? "is-active" : ""} key={step.title}>
                                  <i>{complete ? "✓" : index + 1}</i>
                                  <span>
                                    <strong>{step.title}</strong>
                                    <small>
                                      {active
                                        ? generation.detail || step.description
                                        : complete
                                          ? "完成"
                                          : "等待中"}
                                    </small>
                                  </span>
                                </li>
                              );
                            })}
                          </ol>
                          {generation.visualDecision && (
                            <p className="visual-decision">
                              <strong>Agent 判斷：</strong>
                              {generation.visualDecision}
                            </p>
                          )}
                        </div>
                      )}

                      {draft.locales.zh.body.trim() && draft.locales.en.body.trim() && (
                        <button
                          className="visual-agent-run"
                          onClick={generateVisualsForCurrentDraft}
                          disabled={Boolean(busy)}
                        >
                          只檢查目前文章是否需要配圖
                        </button>
                      )}

                      {(outline || draft.research) && (
                        <details className="generation-details">
                          <summary>查看 AI 研究與大綱</summary>
                          {outline && <textarea value={outline} onChange={(event) => setOutline(event.target.value)} rows="10" />}
                          {draft.research && (
                            <div className="research-preview" dangerouslySetInnerHTML={{ __html: cleanPreview(draft.research) }} />
                          )}
                        </details>
                      )}
                    </div>
                  ) : (
                    <div className="inspector-content">
                      <h2>文章與 SEO 設定</h2>
                      <label>
                        Slug
                        <input
                          value={draft.slug}
                          disabled={draft.status === "Published"}
                          onChange={(event) => updateDraft({ slug: event.target.value.toLowerCase() })}
                          placeholder="article-slug"
                        />
                      </label>
                      <div className="field-grid">
                        <label>
                          分類
                          <input value={draft.category} onChange={(event) => updateDraft({ category: event.target.value })} />
                        </label>
                        <label>
                          狀態
                          <input value={STATUS_LABELS[draft.status] || draft.status} disabled />
                        </label>
                      </div>
                      <label>
                        標籤
                        <input
                          value={draft.tags.join(", ")}
                          onChange={(event) =>
                            updateDraft({
                              tags: event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean),
                            })
                          }
                          placeholder="AI, Data, Career"
                        />
                      </label>
                      <label>
                        語氣
                        <select value={draft.tone} onChange={(event) => updateDraft({ tone: event.target.value })}>
                          {TONES.map((tone) => (
                            <option key={tone.value} value={tone.value}>{tone.label}</option>
                          ))}
                        </select>
                      </label>
                      <div className="field-grid">
                        <label>
                          中文字數
                          <input type="number" value={draft.targetZh} onChange={(event) => updateDraft({ targetZh: event.target.value })} />
                        </label>
                        <label>
                          English words
                          <input type="number" value={draft.targetEn} onChange={(event) => updateDraft({ targetEn: event.target.value })} />
                        </label>
                      </div>
                      <label>
                        自訂 Prompt
                        <textarea
                          rows="5"
                          value={draft.customPrompt}
                          onChange={(event) => updateDraft({ customPrompt: event.target.value })}
                          placeholder="希望 AI 遵守的寫作要求"
                        />
                      </label>
                      <div className="panel-divider" />
                      <h3>{locale === "zh" ? "中文" : "英文"} SEO</h3>
                      <label>
                        SEO title
                        <input value={localized.seoTitle} onChange={(event) => updateLocale({ seoTitle: event.target.value })} />
                      </label>
                      <label>
                        SEO description
                        <textarea rows="3" value={localized.seoDescription} onChange={(event) => updateLocale({ seoDescription: event.target.value })} />
                      </label>
                      <label>
                        Keywords
                        <input
                          value={localized.keywords.join(", ")}
                          onChange={(event) =>
                            updateLocale({
                              keywords: event.target.value.split(",").map((item) => item.trim()).filter(Boolean),
                            })
                          }
                        />
                      </label>
                      <div className="lifecycle-actions">
                        {draft.status === "Published" && (
                          <button onClick={() => action("unpublish")} disabled={Boolean(busy)}>下架</button>
                        )}
                        <button onClick={() => action("archive")} disabled={Boolean(busy)}>典藏</button>
                        {["Archived", "Error"].includes(draft.status) && (
                          <button onClick={() => action("restore")} disabled={Boolean(busy)}>還原</button>
                        )}
                        <button className="danger-link" onClick={remove} disabled={Boolean(busy)}>刪除</button>
                      </div>
                    </div>
                  )}
                </aside>
              </div>
            </>
          )}
        </section>
      )}

      {(error || notice || busy === "loading") && (
        <div className={`toast ${error ? "toast--error" : ""}`}>
          {error || notice || "載入中…"}
          {error && <button onClick={() => setError("")}>×</button>}
        </div>
      )}
    </main>
  );
}
