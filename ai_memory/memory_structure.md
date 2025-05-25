# 🧠 AI Memory Structure

This document outlines how different modules and AI tasks in your app will remember and operate based on contextual inputs.

---

## 📄 Context Templates

### 🎯 Resume Analysis
- **Purpose**: Improve resume to match job description
- **Prompt Template**:
  > "You are a career coach. Analyze this resume and suggest improvements to better match the following job description."
- **Memory Used**:
  - `uploaded_resume`
  - `target_job_description`

---

### 🧪 Job Matching
- **Purpose**: Compare resume and job description for ATS compatibility
- **Prompt Template**:
  > "Match this resume to the job post and highlight missing skills, buzzwords, and optimization strategies."
- **Memory Used**:
  - `user_resume`
  - `job_description`

---

### 🎤 Interview Simulation
- **Purpose**: Conduct mock interviews with realistic pacing and feedback
- **Prompt Template**:
  > "You are a hiring manager conducting a mock interview for a {role} position. Ask one question at a time and wait for the user to respond before proceeding."
- **Memory Used**:
  - `role`
  - `user_past_answers`
  - `scoring_criteria`

---

### 💬 AI Chat General Use
- **Purpose**: Support real-time user Q&A, context-based help
- **Prompt Template**:
  > "You are an AI assistant embedded into a productivity tool. Help the user answer questions, summarize data, and give career advice contextually."
- **Memory Used**:
  - `current_screen_context`
  - `user_conversation_history`

---

## ✅ Feedback Criteria
Used to analyze interview responses and give structured coaching:
- `clarity`
- `confidence`
- `relevance`
- `tone`
- `structure`

---

## 🔌 System Integrations

| Component         | Tool/Model Suggestion                 |
|------------------|----------------------------------------|
| LLM              | `gpt-4-turbo` or `gpt-4-vision`        |
| Transcription    | `OpenAI Whisper`                       |
| File Parsing     | `unstructured.io` / `pdf-to-text`      |
| Screen Capture   | `Electron desktopCapturer` or `OBS`    |
| Backend API      | `FastAPI` or `Node.js` (Express)       |
| Database         | `PostgreSQL`                           |
| Storage          | `S3` or `Supabase`                     |

---

## 🗂 Memory Slots (Per Session/User)
- `resume_current`
- `job_target`
- `interview_role`
- `chat_history`
- `screen_context`
- `audio_transcript`
- `feedback_scores`

---

> ✅ Tip: You can load this file as part of Cursor's memory, or programmatically use it to feed into your AI prompts per feature module.
