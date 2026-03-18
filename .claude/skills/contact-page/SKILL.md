# Contact Page Skill

專門負責寫入、更新「與我聯繫」頁面的 Claude Code skill。

## 觸發條件

當使用者要求修改聯絡頁面的任何內容時啟用，包括：
- 更新聯絡資訊（Email、LinkedIn、Calendar 連結）
- 修改 i18n 文案（zh / en / yue 三語）
- 新增或移除聯絡方式卡片
- 調整 Hero 區、CTA 區、承諾區內容
- 修改 quickInfo 資訊（位置、回覆時間、語言）
- 更新 Calendar modal 時段

## 檔案結構

```
src/app/contact/page.js          # zh 路由入口
src/app/en/contact/page.js       # en 路由入口
src/app/yue/contact/page.js      # yue 路由入口
src/components/ContactPage.js    # 核心元件（所有邏輯與 i18n 都在此）
src/components/ScrollReveal.js   # 滾動動畫包裝
src/components/Card3D.js         # 3D 傾斜卡片效果
src/components/AnimatedGradientBg.js  # CTA 區漸層背景
```

### 路由入口（僅傳 locale prop，不含任何邏輯）

- `src/app/contact/page.js` → `<ContactPage locale="zh" />`
- `src/app/en/contact/page.js` → `<ContactPage locale="en" />`
- `src/app/yue/contact/page.js` → `<ContactPage locale="yue" />`

**重點：所有內容修改只需改 `src/components/ContactPage.js`，不需動路由檔。**

## ContactPage.js 結構

### 常數

| 常數 | 用途 |
|------|------|
| `TO_EMAIL` | Email 地址 |
| `CALENDAR_URL` | Google Calendar 預約連結 |
| `LINKEDIN_URL` | LinkedIn 個人頁連結 |

### i18n 物件（三語）

每個 locale (`zh`, `en`, `yue`) 包含：

| Key | 說明 |
|-----|------|
| `heroTitle` | 頁面主標題 |
| `heroDesc` | Hero 描述（JSX，含 highlight span） |
| `quickInfo[]` | 快速資訊 pills（icon, label, value） |
| `sectionTitle` | 聯絡方式區標題 |
| `email` | Email 卡片文案（label, desc） |
| `linkedin` | LinkedIn 卡片文案（label, desc） |
| `calendar` | Calendar 卡片文案（label, value, desc） |
| `commitTitle` | 回覆承諾標題 |
| `commitDesc` | 回覆承諾描述 |
| `ctaTitle` | CTA 區標題 |
| `ctaDesc` | CTA 區描述 |
| `ctaOnline` | 在線狀態文字 |
| `calendarModal` | Modal 內文案（title, tz, slots[], book, openCal, later） |

### 頁面區塊（由上到下）

1. **Hero** — 大標題 + 描述 + quickInfo pills
2. **Contact Cards** — 3 欄 grid（Email / LinkedIn / Calendar）
3. **Commitment Box** — 回覆承諾區塊
4. **CTA** — 底部行動呼籲 + 在線狀態
5. **Calendar Modal** — 點擊 Calendar 卡片彈出的時段選擇

## 修改規範

### 三語一致性（CRITICAL）

修改任何文案時，**必須同時更新 `zh`、`en`、`yue` 三個 locale**。檢查清單：
- [ ] zh 繁體中文（台灣用語）
- [ ] en 英文
- [ ] yue 粵語（香港用語，與 zh 有細微差異）

### 新增聯絡方式

1. 在 `contactInfo` 陣列新增物件：
   ```js
   { icon: <FaXxx size={24} />, label: t.xxx.label, value: "...", href: "...", description: t.xxx.desc, color: "from-xxx to-xxx" }
   ```
2. 在 i18n 三語中都新增對應 key
3. 如需新 icon，從 `react-icons/fa` 匯入

### 更新 quickInfo

修改 `quickInfo[]` 陣列，每項包含 `icon`（FaXxx）、`label`、`value`。三語都要改。

### Calendar Modal 時段

時段寫在 `calendarModal.slots[]`，為靜態文字陣列。所有時段都連結到同一個 `CALENDAR_URL`。

## 設計約束

- 使用 Framer Motion 動畫（`containerVariants` / `itemVariants`）
- 卡片用 `Card3D` + `ScrollReveal` 包裝
- 色彩遵循全站設計系統：sky-500 / indigo-500 / violet-500
- 背景用 `AnimatedGradientBg`，不加額外背景元素
- 保持 `"use client"` 指令（需要 useState for calendar modal）

## 常見操作範例

### 更新 Email
修改 `TO_EMAIL` 常數即可。

### 更新位置資訊
修改三語 `quickInfo[0].value`（位置那項）。

### 新增社群連結（如 GitHub）
1. 頂部加常數：`const GITHUB_URL = "...";`
2. 匯入 icon：`import { ..., FaGithub } from "react-icons/fa";`
3. 三語 i18n 加 `github: { label: "...", desc: "..." }`
4. `contactInfo` 陣列加一筆
5. grid 可能需從 `md:grid-cols-3` 改為 `md:grid-cols-2 lg:grid-cols-4`
