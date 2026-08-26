# CLAUDE.md

本文件是此 repository 的唯一開發指引。網站介面以繁體中文為預設，所有修改都必須同步檢查英文版本。

## 開發指令

- `npm run dev -- -p 3000`：以 Turbopack 啟動開發服務
- `npm run lint`：執行 ESLint
- `npm run build`：production build 並輸出靜態網站至 `out/`
- `npm run clean`：刪除 `.next` 快取
- `npm run admin:dev`：啟動本機文章 Admin
- `npm run admin:test`：執行 Admin 單元測試
- `npm run content:validate`：驗證所有 Git 追蹤中的雙語文章

`predev` 與 `prebuild` 會自動執行 clean。

## 固定連接埠規則

1. 一律先檢查 port 3000。
2. 若 3000 已是本 repository 的服務，直接沿用，不重複啟動。
3. 只有當 3000 被無關程式占用時，才改用 3100。
4. 不可自動使用其他 port。
5. 回報實際網址：`http://localhost:3000` 或 `http://localhost:3100`。

## 架構

技術棧：Next.js 15 App Router、React 19、Tailwind CSS 4、Framer Motion、GSAP、Lenis、Markdown。

網站使用 `output: "export"`，必須保持 static export 相容性，不可加入依賴 request-time server runtime 的功能。

### 雙語路由

| 語系 | Prefix | 預設 |
| --- | --- | --- |
| 繁體中文 | `/` | 是 |
| English | `/en` | 否 |

路由頁只負責載入資料與傳入 `locale`。主要畫面由下列共用元件負責：

- `EditorialHome.js`
- `AboutPage.js`
- `ProjectsPage.js`
- `ArticlesPage.js`
- `ContactPage.js`
- `ArticleDetailPage.js`

雙語資料集中在元件的 `content`／`i18n` 物件、`src/data/homeProfileData.js` 與 `src/data/projectData.js`。不要建立第三套重複頁面。

### 語言處理

- `Navbar.js` 負責切換路徑並設定 `preferred-lang` cookie。
- `LangDetect.js` 在靜態部署時依 cookie 或瀏覽器語言導向英文。
- 中文頁文案應維持自然繁體中文；專有名詞如 Data、AI、LLM 可保留英文。
- 修改共享 UI 後必須檢查 zh 與 en 路由。

### 文章系統

- Markdown：`content/articles/{zh,en}/`
- 讀取與 frontmatter：`src/lib/content.js`
- Markdown 轉 HTML 與 TOC：`src/lib/markdown.js`
- 中文與英文同主題文章使用相同 slug

## 樣式與動態

- `src/app/globals.css`：Tailwind、文章排版與基礎樣式。
- `src/app/jreast.css`：目前網站的 editorial 視覺系統與 responsive 規則。
- `SiteMotion.js`：共用 GSAP reveal、時間軸與路由動態。
- `SmoothScrollProvider.js`：Lenis 與 ScrollTrigger 同步。
- `TypewriterText.js`／`HeroTypewriter.js`：首頁與內頁 Hero 打字動畫。

首頁 Hero 有獨立版型；調整內頁 Hero 時不可連帶修改首頁，除非使用者明確要求。

所有動畫都必須尊重 `prefers-reduced-motion`。互動元件需支援鍵盤操作，裝飾圖片使用空 `alt` 並標記為非內容。

## 素材規則

- 公司素材：`public/brands/`
- Hero／作品素材：`public/media/`
- 只保留實際被程式引用的素材。
- 不提交 `.next/`、`out/`、`tem/`、`.env*`、`.DS_Store`、`.npm-cache/` 或個人 CV。

## 依賴規則

- 安裝前檢查 React 19 peer dependency。
- 不加入 Three.js 或 React Three Fiber。
- 避免為單一簡單效果新增大型套件。
- 移除元件後同步檢查並移除不再使用的 dependencies。

## 交付前檢查

```bash
npm run lint
npm run build
```

另外確認：

- `/`、`/about`、`/projects`、`/articles`、`/contact`
- `/en` 與對應英文內頁
- 桌面與手機沒有水平溢出
- 中文標題沒有過度負字距
- Hero 圖片與卡片素材可正常載入
- port 3000 優先、3100 僅為備用

GitHub Pages 使用 `.github/workflows/deploy.yml` 部署；文章 PR 使用 `.github/workflows/content-check.yml` 驗證，不得新增重複的 Pages 部署 workflow。

## 文章 Admin

- `admin/` 是獨立的 server-rendered localhost 應用，不可併入主站 static export。
- 日常使用由 `Morris Writing Studio.app` 在 `127.0.0.1:3210` 背景啟動；3000／3100 保留給公開網站。
- Admin secrets 只能放在 `admin/.env.local`，不得寫入原始碼、Notion 頁面或 Git。
- Notion 是編輯中的主資料來源；Git Markdown 是已發布內容的投影。
- 發布與下架必須成對處理 `zh`／`en`，並經 `.github/workflows/content-check.yml` 驗證。
- 發布程式必須使用隔離的暫存 clone，不得修改目前 working tree。
