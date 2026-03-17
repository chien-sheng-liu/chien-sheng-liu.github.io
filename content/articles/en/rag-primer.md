---
title: A Practical Guide to RAG: Principles, Best Practices, and Pitfalls
date: 2025-02-20
tags: [LLM, RAG, Vector DB]
---

Retrieval-Augmented Generation (RAG) blends external knowledge retrieval into the generation flow. This post distills field notes on chunking, indexing, retrieval, reranking, prompting, and evaluation so you can ship reliable systems.

Highlights:

- Chunking by semantic units with overlaps to preserve context
- Hybrid retrieval (BM25 + vectors) with rerankers
- Evaluate with Context Recall, Faithfulness, and Answer Relevance

