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
npm run admin:dev # 啟動本機文章 Admin（http://127.0.0.1:3210）
npm run admin:test
npm run content:validate
```

`npm run dev` 與 `npm run build` 都會先清理 `.next`，避免 Turbopack 快取損壞。

## 本機文章 Admin

`admin/` 是獨立的 localhost 應用，Notion 保存草稿與雙語正文，GitHub 只保存已發布的 Markdown。它不會被匯出到 GitHub Pages。

完整初稿流程包含研究、大綱、繁中撰寫、英文同步，以及可關閉的「視覺內容 Agent」。Agent 只在圖片能改善理解時規劃 1–3 張橫式配圖，逐張顯示進度，將 WebP 圖片本體與規劃紀錄保存到 Notion，並在發布時連同中英文 Markdown 一起送往 GitHub。圖片模型可用 `OPENAI_IMAGE_MODEL` 覆寫，預設為 `gpt-image-2`。

日常使用可直接在 Finder 雙擊 repository 根目錄的 `Morris Writing Studio.app`。啟動器會：

- 在背景啟動 Admin 專屬的 `http://127.0.0.1:3210`，不占用網站的 3000／3100。
- 若 Admin 已啟動，直接開啟瀏覽器而不重複建立程序。
- 首次使用時自動執行 `npm install`。
- 將執行紀錄與 PID 放在 `admin/.data/`；啟動失敗時顯示 macOS 對話框。

可把 `Morris Writing Studio.app` 拖到 Dock，但不要把它移出 repository；啟動器需要同層的 `admin/` 與 `scripts/`。

首次使用：

```bash
cd admin
npm install
cp .env.example .env.local
# 填入 OPENAI_API_KEY、NOTION_API_KEY
gh auth login
cd ..
npm run admin:dev
```

手動啟動預設供開發使用；日常啟動器固定開啟 `http://127.0.0.1:3210`。在設定畫面直接貼上既有 Notion database 網址；系統會沿用其中的 Articles data source，並在同一個 database 內建立 Article Locales data source。Notion integration 必須對該 database 有讀取、插入與更新 content 的權限。

初始化後可匯入目前 Git 追蹤中的文章：

```bash
npm run content:import
```

匯入器以 slug 判斷重複，只讀取 `git ls-files` 回傳的文章，因此不會碰觸本機未追蹤稿件。

發布流程會在系統暫存目錄 clone 最新 repository、輸出中英文 Markdown、執行內容驗證／lint／build、建立 PR、等待 checks、自動合併並追蹤 GitHub Pages。若只想驗證而不 push：

```bash
PUBLISH_DRY_RUN=true npm run admin:dev
```

密鑰只放在 `admin/.env.local`，不可提交至 Git。

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
