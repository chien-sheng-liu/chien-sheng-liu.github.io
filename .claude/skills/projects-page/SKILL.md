# Projects Page Skill

專門負責寫入、更新「個人專案」頁面的 Claude Code skill。

## 觸發條件

當使用者要求修改專案頁面的任何內容時啟用，包括：
- 新增、修改、刪除專案卡片
- 修改 i18n 文案（zh / en / yue 三語）
- 調整 Hero 區、CTA 區內容
- 修改專案資料（技術棧、metrics、描述）
- 調整卡片排版或樣式

## 檔案結構

```
src/app/projects/page.js              # zh 路由入口
src/app/en/projects/page.js           # en 路由入口
src/app/yue/projects/page.js          # yue 路由入口
src/components/ProjectsPage.js        # 核心元件（i18n 文案 + 渲染邏輯）
src/data/projectData.js               # 專案資料（三語共用，locale 解析）
src/components/AnimatedGradientBg.js  # 背景漸層效果
```

### 路由入口（僅傳 locale prop，不含任何邏輯）

- `src/app/projects/page.js` → `<ProjectsPage locale="zh" />`
- `src/app/en/projects/page.js` → `<ProjectsPage locale="en" />`
- `src/app/yue/projects/page.js` → `<ProjectsPage locale="yue" />`

**重點：路由檔只有 5 行，所有邏輯都在 `ProjectsPage.js` 和 `projectData.js`。**

### 遺留檔案（未使用，可清除）

以下舊的 locale-specific 資料檔已被 `src/data/projectData.js` 取代：
- `src/app/projects/projectData.js`
- `src/app/en/projects/projectData.js`
- `src/app/yue/projects/projectData.js`

## 資料層：`src/data/projectData.js`

### 結構

```js
const projectBase = [
  {
    icon: <FaXxx />,           // React icon 元件
    categoryIcon: <FaXxx />,   // 分類小 icon
    category: { zh, en, yue }, // 分類名稱
    technologies: [...],       // 技術棧陣列
    link: "...",               // GitHub 連結
    color: "from-xxx to-xxx",  // Tailwind 漸層色
    bgGradient: "from-xxx/10 to-xxx/10",
    title: { zh, en, yue },
    description: { zh, en, yue },
    metrics: {
      zh: [{ label, value }, ...],  // 3 項指標
      en: [...],
      yue: [...],
    },
    extraTech: { zh, en, yue },  // 選填，額外技術標籤
  },
];
```

### 匯出函式

```js
getProjectData(locale) → { projects: [...], stats: [...] }
```

- 解析 locale-specific 欄位為扁平物件
- `stats` 為頁面頂部統計數字（目前未使用於新版排版，但資料仍保留）

## 元件層：`src/components/ProjectsPage.js`

### i18n 物件

每個 locale (`zh`, `en`, `yue`) 包含：

| Key | 說明 |
|-----|------|
| `tagline` | 頁面標籤（"Projects"） |
| `title` | Hero 大標題 |
| `desc` | Hero 描述 |
| `viewCode` | 查看程式碼按鈕文字 |
| `ctaTitle` | CTA 區標題 |
| `ctaDesc` | CTA 區描述 |
| `ctaBtn` | CTA 按鈕文字 |
| `updating` | 持續更新狀態文字 |

### 頁面區塊（由上到下）

1. **Hero** — 左對齊標籤 + 漸層標題 + 描述
2. **Project Cards** — 2 欄 grid（lg），1 欄（mobile）
3. **CTA** — 標題 + GitHub 連結按鈕 + 更新狀態

### 資料流

```
ProjectsPage(locale)
  ├── getProjectData(locale) → baseProjects
  ├── fetch('/api/content/projects?locale=xx') → extra projects
  └── merge → render cards
```

### 卡片結構

每張卡片包含：
- 左側 1px 漸層色條（`project.color`）
- Icon + 分類標籤 + 標題
- 描述文字
- 技術標籤 pills
- 3 欄 metrics
- GitHub 連結（文字連結，非按鈕）

## 動態專案（API 來源）

- 來源：`content/projects/{locale}/*.json`
- API：`/api/content/projects?locale=xx`
- 格式：`{ slug, title, category, technologies, metrics, link }`
- 自動合併到 baseProjects 後面
- 自動根據 category 分配 icon

## 修改規範

### 三語一致性（CRITICAL）

修改任何文案時，**必須同時更新 zh、en、yue**：

1. **ProjectsPage.js 的 i18n 物件** — Hero 文案、CTA 文案
2. **projectData.js 的 projectBase** — 專案標題、描述、metrics、分類

### 新增專案

1. 在 `src/data/projectData.js` 的 `projectBase` 陣列新增物件
2. 必填欄位：icon, categoryIcon, category(3語), technologies, link, color, bgGradient, title(3語), description(3語), metrics(3語 × 3項)
3. 如需新 icon，從 `react-icons/fa` 匯入

### 修改現有專案

直接編輯 `projectData.js` 中對應的物件，注意三語都要改。

### 新增動態專案

在 `content/projects/{locale}/` 新增 `.json` 檔（三語各一份）。

## 設計約束

- 漸層標題使用 `from-violet-500 via-sky-500 to-cyan-400`（全站一致）
- 卡片背景 `bg-white/70 backdrop-blur-sm`（glass panel 風格）
- 動畫使用 Framer Motion `fadeUp` + stagger
- 技術標籤為灰色 pills（`bg-slate-100`），不用彩色
- GitHub 連結為文字型（非填色按鈕），保持克制
- CTA 按鈕使用黑色（`bg-[#1d1d1f]`）而非漸層
- 保持 `"use client"` 指令（需要 useState/useEffect）

## 色彩對應

| 專案類型 | color |
|---------|-------|
| LLM | `from-blue-500 to-cyan-500` |
| NLP | `from-purple-500 to-pink-500` |
| 醫療 DL | `from-green-500 to-emerald-500` |
| 海運 DL | `from-orange-500 to-red-500` |

新增專案時選擇不重複的漸層色組合。
