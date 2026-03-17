# Architecture Designer Skill

多語系 Next.js 個人網站的架構設計與重構指南。

## 核心架構原則

### 1. 多語系檔案組織

**現行模式**：每個語系一份完整頁面檔案（zh/en/yue 各自獨立 page.js）

**最佳實踐**：
- **資料與 UI 分離**：頁面邏輯放 shared component，語系文字放 locale data 檔
- **共用元件抽取**：跨語系重複率 > 70% 的 UI 區塊提取為共用元件，透過 props 傳入翻譯文字
- **資料檔合併**：同結構不同翻譯的 data 檔（projectData、articlesData）合併成單檔多 locale key

```
推薦結構：
src/
  data/
    projects.js        # { zh: [...], en: [...], yue: [...] }
    articles.js         # 同上
  components/
    sections/           # 可跨語系共用的 section 元件
      HeroSection.js
      ContactForm.js
      ProjectGrid.js
  app/
    page.js             # import HeroSection + zh data
    en/page.js          # import HeroSection + en data
    yue/page.js         # import HeroSection + yue data
```

### 2. 元件職責邊界

| 層級 | 職責 | 範例 |
|------|------|------|
| Page | 組合 sections + 注入 locale data | `page.js` |
| Section | 單一區塊 UI + 接收 props | `HeroSection.js` |
| Component | 原子級可複用 UI | `Card3D.js`, `ScrollReveal.js` |
| Data | 純資料，無邏輯 | `projectData.js` |
| Lib | 工具函式 | `content.js`, `markdown.js` |

### 3. 動畫元件設計

- **不裝新套件**：優先 CSS animation + Intersection Observer + vanilla JS mousemove
- **元件封裝**：每個動效封裝成獨立元件（CursorGlow、Card3D、ScrollReveal）
- **效能保護**：所有 mousemove handler 使用 requestAnimationFrame、手機停用非必要動效
- **無障礙**：`prefers-reduced-motion` 關閉所有動畫

### 4. 樣式系統

- Tailwind CSS v4 `@theme` directive 管理設計 token（不用 tailwind.config.js）
- 顏色直接用 Tailwind class，不用 CSS custom properties（避免語義反轉問題）
- 只保留真正的 design token 作為 CSS 變數（accent colors）
- `globals.css` 負責：keyframes、base styles、utility classes

### 5. 檔案大小控制

- 頁面檔案 < 200 行（超過則拆 section 元件）
- 元件檔案 < 400 行（超過則拆子元件）
- 資料檔案獨立存放，不混入 UI 邏輯

## 重構決策樹

```
發現重複代碼？
  ├─ 跨語系重複 → 抽取共用元件 + locale props
  ├─ 同頁面重複 → 抽取子元件
  └─ 跨頁面重複 → 放 src/components/

檔案太大？
  ├─ 頁面 > 200 行 → 拆 section 元件
  ├─ 元件 > 400 行 → 拆子元件
  └─ 資料 > 100 行 → 獨立 data 檔

新增功能？
  ├─ 全站適用 → layout.js 掛載
  ├─ 多頁面使用 → src/components/
  ├─ 單頁面使用 → 同目錄 section 元件
  └─ 語系相關 → data 層處理
```

## 效能檢查項

- [ ] 動態 import 用於大型元件（Three.js、tsparticles）
- [ ] 圖片使用 next/image 自動優化
- [ ] 字體使用 next/font 避免 FOUT
- [ ] mousemove listener 用 requestAnimationFrame 節流
- [ ] `will-change` 只加在真正需要 GPU 加速的元素

## 跨語系修改 SOP

修改任何頁面時：
1. 先改 zh 版本
2. 同步修改 en、yue 版本
3. 結構性修改（新元件、新 section）→ 抽取共用元件
4. 純文字修改 → 各語系獨立更新
5. `npm run build` 驗證所有語系編譯通過