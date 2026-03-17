---
title: 認識 RAG 系統：原理、最佳做法同常見陷阱
date: 2025-02-20
tags: [LLM, RAG, 向量庫]
---

RAG（Retrieval-Augmented Generation）將外部知識檢索加入生成流程。呢篇文總結實戰重點：切塊、索引、檢索同重排序、提示設計同評估方法，幫你出到可靠嘅系統。

重點：

- 以語意單位切塊並加 Overlap，保留上下文
- 混合檢索（BM25 + 向量）加重排序
- 用 Context Recall、Faithfulness、Answer Relevance 做評估

