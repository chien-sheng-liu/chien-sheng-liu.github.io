---
title: 深入理解 RAG 系統：原理、最佳實踐與常見陷阱
date: 2025-02-20
tags: [LLM, RAG, 向量資料庫]
---

RAG（Retrieval-Augmented Generation）將外部知識檢索融入到生成流程，常見於 FAQ 機器人、文件問答與企業知識庫。本文整理我在專案中的實務重點：資料準備、向量索引策略、檢索與重排序、提示設計、以及評估方法。

重點包括：

- 資料切塊：按語意完整與檔案結構切分，配合 Overlap 降低語境遺失。
- 多檢索器融合：BM25 + 向量檢索 + 重排序（Cross-Encoder）。
- 評估指標：Context Recall、Faithfulness、Answer Relevance。

