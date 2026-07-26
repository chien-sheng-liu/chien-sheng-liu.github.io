# Morris Liu 個人網站

Morris Liu 的雙語個人作品集，聚焦 Data、AI、跨市場分析、顧問工作與產品實作。網站使用 Next.js App Router，建置後輸出為靜態網站並部署至 GitHub Pages。

## 技術棧

- Next.js 15、React 19
- Tailwind CSS 4、網站專用 editorial CSS
- Framer Motion、GSAP、Lenis
- Markdown 文章系統
- GitHub Pages

## 本機開發

需求：Node.js 22 與 npm。

```bash
npm ci
npm run dev -- -p 3000
```

固定使用 `http://localhost:3000`。啟動前先確認 3000 是否已有本專案服務；如果被其他程式占用，唯一備用連接埠是 3100：

```bash
lsof -Pan -iTCP:3000 -sTCP:LISTEN
npm run dev -- -p 3100
```

不要自動改用 3001、3002 或其他連接埠。

## 常用指令

```bash
npm run dev       # 開發模式
npm run lint      # ESLint
npm run build     # production build + static export
npm run start     # 啟動 production server（非靜態部署流程）
npm run clean     # 清除 .next
```

`npm run dev` 與 `npm run build` 都會先清理 `.next`，避免 Turbopack 快取損壞。

## 路由與語系

| 頁面 | 繁體中文 | English |
| --- | --- | --- |
| 首頁 | `/` | `/en` |
| 關於 | `/about` | `/en/about` |
| 作品 | `/projects` | `/en/projects` |
| 文章 | `/articles` | `/en/articles` |
| 聯絡 | `/contact` | `/en/contact` |

繁體中文是預設語系。語言切換由 `Navbar` 寫入 `preferred-lang` cookie，`LangDetect` 在靜態部署環境處理首次導向。

## 專案結構

```text
content/articles/       Markdown 文章，依 zh / en 分組
public/brands/          經歷與公司 Logo
public/media/           Hero 與作品圖片
src/app/                App Router 路由、metadata、全站樣式
src/components/         共用頁面與互動元件
src/data/               雙語首頁與作品資料
src/lib/                Markdown 讀取與轉換
scripts/                維護腳本
.github/workflows/      GitHub Pages 部署
```

主要頁面 UI 由共用元件接收 `locale`：

- `EditorialHome`
- `AboutPage`
- `ProjectsPage`
- `ArticlesPage`
- `ContactPage`

修改頁面內容時，必須同時檢查繁體中文與英文；中文介面文案維持中文，不混用不必要的英文句子。

## 文章格式

文章放在 `content/articles/{zh,en}/`，檔名即網址 slug。每篇文章需要：

```yaml
---
title: 文章標題
date: 2026-07-26
tags: [Data, AI]
category: AI
---
```

中英文同主題文章應使用相同檔名，方便維護對應內容。

## 圖片與檔案

- 只把網站實際引用的素材放入 `public/`。
- 建置輸出 `out/`、快取 `.next/`、暫存截圖 `tem/`、本機環境檔與個人 CV 不提交。
- 圖片引用使用 `/media/...` 或 `/brands/...` 的 public 絕對路徑。

## 驗證與部署

送出變更前至少執行：

```bash
npm run lint
npm run build
```

`main` 分支由 `.github/workflows/deploy.yml` 建置並部署 `out/` 至 GitHub Pages。
