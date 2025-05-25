# 🧩 Project Checklist: Cluely + LockedIn + FinalRound AI (Custom SaaS)

## 🚀 Goal
Create a SaaS product that combines the functionality of:
- **Cluely AI** (stealth screen sharing, live AI help, audio monitoring)
- **LockedIn AI** (resume tailoring, job prep)
- **Final Round AI** (mock interviews, real-time feedback)

Fully custom. Fully yours.

---

## ✅ 1. Core Feature Checklist

### 🖥️ Screen Share w/ Hidden Overlay
- [ ] Capture full screen with system-level permission
- [ ] Ensure AI overlay UI does **not** appear in the shared/recorded feed
- [ ] Toggle AI assistant visibility (keyboard shortcut, mouse hover)
- [ ] Optional live stream vs. local session buffer

### 💬 AI Chat Assistant
- [ ] Embedded chat interface with GPT-4-level responses
- [ ] Persistent session memory per user
- [ ] Accepts job posts, resumes, and command-style prompts
- [ ] Optional voice-to-text interaction

### 🎙️ Audio & Microphone Recording
- [ ] Capture system audio and user mic simultaneously
- [ ] Auto-transcribe via Whisper or Deepgram
- [ ] Tag timestamps + speakers
- [ ] Save recordings securely and accessibly

### 📄 Resume Tools
- [ ] Resume parser (DOCX, PDF)
- [ ] Job description matcher
- [ ] ATS optimization suggestions
- [ ] Rewrite resumes based on job description

### 🧠 Interview Simulation
- [ ] Role-specific interview questions
- [ ] Simulated interviewer (AI)
- [ ] Capture and transcribe user responses
- [ ] Scoring + structured feedback (clarity, depth, confidence, etc.)

---

## ⚙️ 2. Supporting Features

- [ ] Secure authentication (e.g., Supabase, Firebase Auth)
- [ ] Cloud file storage (S3, Firebase, Supabase)
- [ ] Local mode fallback (offline functionality)
- [ ] API endpoints for future integrations
- [ ] Payment support (Stripe subscription model)

---

## 🧱 3. Backend Infrastructure

- [ ] FastAPI or Node.js (Express) backend
- [ ] PostgreSQL for user/session/task data
- [ ] WebSocket/Socket.IO for real-time chat
- [ ] Whisper / OpenAI / local LLM model integration
- [ ] CDN/media storage bucket (e.g., S3, Supabase)

---

## 🖼️ 4. Frontend (Hybrid)

- [ ] React + Tailwind (Web)
- [ ] Electron shell for Desktop app
- [ ] Native overlay and screen/audio permission access
- [ ] Custom draggable/resizable overlay panel
- [ ] AI chat dock (toggleable)

---

## 🚢 5. Deployment

- [ ] GitHub Actions CI/CD
- [ ] Electron auto-updater + installer generator
- [ ] Web deployment (Vercel/Render/Fly.io)
- [ ] Notarization for macOS, signing for Windows
- [ ] Usage tracking + error reporting

---

## 🧠 6. AI Behavior and Prompt Memory

- [ ] Custom prompt system (user role, tone, format)
- [ ] Predefined contexts for resume, job, interview
- [ ] Memory slots per session
- [ ] Adaptive feedback prompts (e.g., STAR technique)
