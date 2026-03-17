# Architecture Cleanup Commands Reference

## 依賴分析命令

### 📦 Package 分析
```bash
# 查看當前依賴樹
npm ls --depth=0

# 查看過時的依賴
npm outdated

# 檢查未使用的依賴
npx depcheck

# 檢查依賴安全漏洞
npm audit

# 修復安全問題
npm audit fix

# 檢查 bundle 大小
npm run build
npx bundle-analyzer

# 清理 node_modules 重新安裝
rm -rf node_modules package-lock.json
npm install
```

### 🧹 依賴清理
```bash
# 移除未使用的依賴 (根據 depcheck 結果)
npm uninstall package-name

# 移除多個依賴
npm uninstall package1 package2 package3

# 將依賴移動到 devDependencies
npm uninstall package-name
npm install --save-dev package-name
```

## 檔案分析命令

### 🔍 檔案搜尋
```bash
# 統計各類型檔案數量
find src -name "*.js" | wc -l
find src -name "*.jsx" | wc -l
find src -name "*.css" | wc -l

# 找出大型檔案 (超過 200 行)
find src -name "*.js" -o -name "*.jsx" | xargs wc -l | sort -nr | head -10

# 找出可能未使用的組件
find src/components -name "*.js" | while read file; do
  basename=$(basename "$file" .js)
  if ! grep -r "import.*$basename" src/ --exclude="$file" > /dev/null; then
    echo "可能未使用: $file"
  fi
done

# 搜尋所有 console.log
grep -r "console\.log" src/

# 搜尋註釋掉的程式碼
grep -r "//.*[a-zA-Z]" src/ | grep -v "// "

# 找出空檔案或只有註釋的檔案
find src -name "*.js" -o -name "*.jsx" | xargs grep -L "[a-zA-Z]"
```

### 📊 程式碼統計
```bash
# 計算程式碼行數 (排除空行和註釋)
find src -name "*.js" -o -name "*.jsx" | xargs cat | grep -v '^[[:space:]]*$' | grep -v '^[[:space:]]*//.*$' | wc -l

# 統計 import 語句數量
grep -r "^import" src/ | wc -l

# 找出最多 import 的檔案
grep -r "^import" src/ | cut -d: -f1 | sort | uniq -c | sort -nr | head -10
```

## 重複內容檢查

### 🔄 重複檔案檢查
```bash
# 使用 MD5 找出完全相同的檔案
find src -type f -name "*.js" -o -name "*.jsx" | xargs md5sum | sort | uniq -d

# 找出相似的函數名
grep -r "function\s\+\w\+" src/ | cut -d: -f2 | sort | uniq -c | sort -nr

# 找出相似的組件名
grep -r "export.*function\s\+\w\+" src/ | cut -d: -f2 | sort | uniq -c | sort -nr
```

### 🎨 CSS/樣式重複檢查
```bash
# 找出未使用的 Tailwind classes (需要 purge 工具)
npx @tailwindcss/cli --content './src/**/*.{js,jsx}' --dry-run

# 統計最常用的 className
grep -r "className=" src/ | grep -o 'className="[^"]*"' | sort | uniq -c | sort -nr | head -20
```

## Import 語句優化

### 🛤️ Import 分析
```bash
# 找出所有相對路徑 import
grep -r "import.*\.\./\.\." src/

# 找出可以使用 alias 的 import
grep -r "import.*\.\./.*components" src/

# 找出未使用的 import (需要 unimported 工具)
npx unimported

# 統計最常 import 的模組
grep -r "^import.*from" src/ | cut -d"'" -f2 | sort | uniq -c | sort -nr | head -10
```

### ✂️ Import 清理
```bash
# 自動修復 import 順序 (如果使用 ESLint)
npx eslint --fix src/

# 移除未使用的 import (如果配置了相應規則)
npx eslint --fix --rule="no-unused-vars: error" src/
```

## 目錄操作命令

### 📁 目錄重組
```bash
# 安全移動檔案 (保留 git 歷史)
git mv src/components/old-path/Component.js src/components/new-path/Component.js

# 批量移動相似檔案
find src/components -name "*Button*" -exec git mv {} src/components/ui/ \;

# 創建新的目錄結構
mkdir -p src/{features,shared/{components,utils,hooks}}

# 扁平化過深的目錄
find src/components -mindepth 3 -name "*.js" -exec git mv {} src/components/ \;
```

### 🏗️ 結構重構腳本
```bash
# 創建標準目錄結構
#!/bin/bash
mkdir -p src/{
  app/{about,articles,contact,projects,yue},
  components/{ui,layout,forms},
  lib/{utils,hooks,constants},
  styles
}

# 移動檔案到新結構 (示例)
git mv src/components/Button.js src/components/ui/
git mv src/utils/* src/lib/utils/
```

## 程式碼品質檢查

### 🔍 品質分析
```bash
# 檢查程式碼複雜度 (如果有 complexity 工具)
npx complexity-report src/

# 檢查重複的程式碼 (如果有 jscpd)
npx jscpd src/

# 檢查循環依賴 (如果有 madge)
npx madge --circular src/

# 生成依賴圖
npx madge --image graph.svg src/
```

### 🧪 測試和驗證
```bash
# 檢查所有檔案是否能正常 parse
find src -name "*.js" -o -name "*.jsx" | xargs node -c

# 檢查 TypeScript 類型 (如果使用 TS)
npx tsc --noEmit

# 執行 linting
npx eslint src/

# 執行 prettier 檢查
npx prettier --check src/

# 測試 build 是否成功
npm run build
```

## 自動化清理腳本

### 🤖 全自動清理腳本
```bash
#!/bin/bash
echo "開始架構清理..."

# 1. 備份當前狀態
git add . && git commit -m "架構清理前備份"

# 2. 依賴清理
echo "檢查未使用依賴..."
npx depcheck

# 3. 檔案清理
echo "尋找未使用檔案..."
find src -name "*.js" -exec grep -l "console\.log" {} \;

# 4. 程式碼清理
echo "清理程式碼..."
npx eslint --fix src/

# 5. 驗證
echo "驗證建置..."
npm run build

echo "清理完成！"
```

### 📊 生成清理報告
```bash
#!/bin/bash
echo "=== 架構清理報告 ==="
echo "檔案數量: $(find src -name "*.js" -o -name "*.jsx" | wc -l)"
echo "程式碼行數: $(find src -name "*.js" -o -name "*.jsx" | xargs cat | grep -v '^[[:space:]]*$' | wc -l)"
echo "依賴數量: $(grep -c '"' package.json)"
echo "Console.log 數量: $(grep -r "console\.log" src/ | wc -l)"
echo "未使用 import: $(npx unimported | wc -l)"
```

## 常用工具安裝

### 🛠️ 推薦清理工具
```bash
# 依賴檢查工具
npm install -g depcheck

# 未使用 import 檢查
npm install -g unimported

# 程式碼重複檢查
npm install -g jscpd

# 依賴圖生成
npm install -g madge

# Bundle 分析
npm install -g webpack-bundle-analyzer

# 複雜度分析
npm install -g complexity-report
```