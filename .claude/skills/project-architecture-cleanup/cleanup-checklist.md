# Architecture Cleanup Checklist

## Pre-Cleanup 準備

### 📋 分析階段
- [ ] 執行 `npm ls --depth=0` 檢查依賴
- [ ] 執行 `npx depcheck` 找未使用依賴
- [ ] 執行 `find src -name "*.js" -o -name "*.jsx" | wc -l` 統計檔案數量
- [ ] 使用 analysis-template.md 完成架構分析
- [ ] 備份當前版本 (git commit)

### 🎯 目標設定
- [ ] 預期檔案數量減少：_____ 個
- [ ] 預期依賴減少：_____ 個  
- [ ] 預期 bundle 減少：_____ KB
- [ ] 目標目錄層級：最多 ___ 層

## Phase 1: 依賴清理

### 🧹 移除未使用依賴
- [ ] 檢查 package.json 中的 dependencies
- [ ] 檢查 package.json 中的 devDependencies
- [ ] 執行 `npm uninstall [package-name]` 移除未使用包
- [ ] 檢查是否有版本衝突
- [ ] 執行 `npm audit fix` 修復安全問題

### 📦 依賴優化
- [ ] 合併相同功能的包 (如：多個 icon 庫)
- [ ] 檢查是否可用更輕量的替代品
- [ ] 將只在開發時使用的包移到 devDependencies
- [ ] 更新過時的依賴版本

## Phase 2: 檔案清理

### 🗑️ 移除冗餘檔案
- [ ] 搜尋並移除未被 import 的組件檔案
- [ ] 刪除空檔案或只有註釋的檔案
- [ ] 移除重複的工具函數檔案
- [ ] 刪除過時的配置檔案
- [ ] 清理 public/ 目錄中未使用的資源

### 🔍 檢查方式
```bash
# 找出可能未使用的檔案
find src/components -name "*.js" -exec basename {} \; | while read file; do
  if ! grep -r "import.*$file" src/ > /dev/null; then
    echo "可能未使用: $file"
  fi
done
```

### ✂️ 程式碼清理
- [ ] 移除所有 `console.log` 語句
- [ ] 刪除註釋掉的程式碼
- [ ] 移除未使用的 import 語句
- [ ] 刪除未使用的變數和函數
- [ ] 清理空的 CSS 規則

## Phase 3: 目錄重構

### 📁 目錄結構優化
```
推薦結構：
src/
├── app/              # Next.js App Router 頁面
├── components/       # 共用 UI 組件
├── lib/             # 工具函數和配置
└── styles/          # 全局樣式 (如果需要)

content/             # 靜態內容
public/              # 靜態資源
```

### 🔄 檔案移動檢查清單
- [ ] 將真正共用的組件保留在 components/
- [ ] 將頁面特定組件移到對應 app/ 目錄
- [ ] 將工具函數整合到 lib/
- [ ] 檢查移動後的 import 路徑
- [ ] 更新 jsconfig.json 中的路徑別名

### 📝 命名規範統一
- [ ] 組件檔案：PascalCase (如：Button.js)
- [ ] 頁面檔案：kebab-case (如：page.js)
- [ ] 工具檔案：camelCase (如：dateUtils.js)
- [ ] 常數檔案：UPPER_CASE (如：CONSTANTS.js)

## Phase 4: 組件重構

### 🧩 組件拆分
- [ ] 識別超過 200 行的大型組件
- [ ] 將純展示邏輯抽取為子組件
- [ ] 將業務邏輯抽取為 hooks
- [ ] 將複雜的狀態管理抽取為 context

### 🔗 組件合併
- [ ] 找出功能重複的組件
- [ ] 合併相似的 UI 組件
- [ ] 統一類似的 hook 邏輯
- [ ] 整合重複的樣式定義

### 💡 最佳化實踐
- [ ] 確保每個組件職責單一
- [ ] 避免深層 props drilling
- [ ] 使用 TypeScript 或 PropTypes (如果適用)
- [ ] 添加必要的錯誤邊界

## Phase 5: Import 優化

### 🛤️ 路徑簡化
- [ ] 設定 jsconfig.json 的 paths alias
- [ ] 將 `../../components/Button` 改為 `@/components/Button`
- [ ] 統一 import 順序：第三方 → 內部模組 → 相對路徑
- [ ] 移除未使用的 import 語句

### 📋 Import 規範
```javascript
// ✅ 推薦順序
import React from 'react';           // React 核心
import { motion } from 'framer-motion'; // 第三方庫
import Button from '@/components/Button'; // 內部組件
import { formatDate } from '../utils';    // 相對路徑
```

## Phase 6: 配置統一

### ⚙️ 配置檔案整理
- [ ] 檢查是否有重複的配置檔案
- [ ] 統一 ESLint、Prettier 配置
- [ ] 簡化 Tailwind、PostCSS 配置
- [ ] 清理不必要的環境變數

### 🎨 樣式系統整理
- [ ] 移除未使用的 Tailwind classes
- [ ] 統一色彩變數定義
- [ ] 合併重複的 CSS 規則
- [ ] 清理 globals.css 中的冗餘樣式

## 驗證階段

### 🧪 功能測試
- [ ] 確保所有頁面正常載入
- [ ] 檢查所有 API 路由正常工作
- [ ] 驗證響應式設計完整
- [ ] 測試所有互動功能

### 📊 效能檢查
- [ ] 執行 `npm run build` 確保能正常打包
- [ ] 檢查 bundle 大小是否減少
- [ ] 測試頁面載入速度
- [ ] 檢查是否有 console 錯誤

### 📈 指標對比
| 項目 | 清理前 | 清理後 | 改善 |
|------|--------|--------|------|
| 檔案數量 | ___ | ___ | ___% |
| 依賴數量 | ___ | ___ | ___% |
| Bundle 大小 | ___KB | ___KB | ___% |
| 目錄層級 | ___ | ___ | ___ |

## 完成檢查

### ✅ 最終驗證
- [ ] 無循環依賴
- [ ] 無未使用檔案
- [ ] 無重複組件
- [ ] Import 路徑清晰
- [ ] 目錄結構邏輯
- [ ] 配置檔案整潔
- [ ] 文檔已更新

### 📚 文檔更新
- [ ] 更新 CLAUDE.md 中的架構說明
- [ ] 更新專案 README (如果有)
- [ ] 記錄重構決策和理由
- [ ] 提交最終版本到 git

### 🎉 清理完成標誌
當所有檢查項目都完成時，你的專案架構應該達到：
- 📁 目錄結構清晰，不超過 3 層嵌套
- 📦 依賴精簡，無冗餘包
- 🧹 代碼整潔，無死代碼
- 🔗 引用關係明確，無循環依賴
- ⚡ 效能提升，bundle 更小
- 📖 文檔同步，架構可理解