# EAA Recruit: Unified AI Agent Instructions

## 1. Project Context & Objectives

**Target:** AI-powered recruitment automation for Ethiopian Airlines and the Ethiopian Aviation Academy.

**Primary Goal:** Transition from a manual 4–6 month hiring process to a <4 week, AI-driven pipeline.

**Data Sovereignty:** 100% local deployment on Ubuntu Linux. All processing must happen on-premises to comply with Ethiopian Data Protection Proclamation No. 1329/2023.

**Unified Architecture:** The system uses a single PostgreSQL 15+ instance. This replaces the previous hybrid model (MongoDB/Chroma) by utilizing `pgvector` and `JSONB`.

---

## 2. Technical Stack

### Database: PostgreSQL 15+

- **pgvector Extension:** Stores and queries semantic embeddings.
  - `cv_vector` and `job_vector` are `VECTOR(384)` (using `all-MiniLM-L6-v2`)
  - Query logic: use `<=>` (Cosine Distance) for ranking
- **JSONB Storage:** Used for unstructured data in the `ParsedCV` table (`extracted_data`)
- **Relational Schema:** Standard tables for `Users`, `Jobs`, and `Applications` with UUID primary keys
- **Indexing:** HNSW index on vector columns is mandatory for <3s performance

### Backend & AI: FastAPI (Python 3.10+)

- **Text Extraction:** Tesseract OCR (v5.3) for scanned images, `pdfminer` for native text
- **Vectorization:** Sentence-Transformers for generating semantic embeddings
- **Async Tasks:** Redis + Celery/RQ for background CV processing
- **Security:** AES-256 encryption-at-rest for PII

---

## 3. UI/UX Requirements (next js)
## done 
### Portal Structure

#### Admin Portal (`/admin`)
- System health monitoring (Postgres connection, vector index status)
- User Management (RBAC for Recruiters/Admins)
- Audit Logs view (required for compliance)

#### Recruiter Portal (`/dashboard/recruiter`)
- Job Management with weighting sliders (CV Match vs. Exam vs. Experience)
- Kanban Pipeline board with color-coded AI similarity scores
- XAI Decision Report Modal (natural-language justification for AI rankings)

#### Candidate Portal (`/dashboard/candidate`)
- Job Browser with bilingual (English/Amharic) support
- "Smart" Uploader with real-time feedback
- Timed Examination Interface with vector-based grading for descriptive answers

---

## 4. Development Roadmap

### Phase 1: Infrastructure & DB
- [ ] Initialize neon db with `pgvector` and create relational/vector tables
- [ ] Configure Docker Compose for local deployment with Redis and Celery
- [ ] Implement HNSW indexing and verify <3s retrieval for 1,000+ vectors

### Phase 2: AI Services Integration
- [ ] Implement multi-format text extraction (OCR fallback is critical for Ethiopian CVs)
- [ ] Build the NLP Preprocessor with aviation-specific stopword filtering
- [ ] Connect the Vectorization Engine to save embeddings directly into Postgres
- [ ] Implement XAI logic using TF-IDF term extraction to explain the "Match Score"

### Phase 3: Portal & Logic Execution
- [ ] Connect React Frontend to FastAPI endpoints for all three portals
- [ ] Implement the Exam Grading Service (cosine similarity check between candidate vector and key)
- [ ] Finalize the "Final Score" aggregation logic based on recruiter-defined weights

---

## 5. Non-Functional Requirements

| Requirement   | Target                                                                 |
|---------------|------------------------------------------------------------------------|
| Latency       | Total CV processing (Extract → Clean → Vectorize → Store) must be <3s |
| Accuracy      | >90% precision for technical skill extraction                          |
| Accessibility | Support for Ge'ez script and mobile-responsive layouts                 |
| Fairness      | Anonymize protected characteristics during AI similarity calculation   |
