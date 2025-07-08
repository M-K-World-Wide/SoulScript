# SoulScript – AI-Driven Therapy Journal

> A trauma-informed journaling platform guided by AI, offering users therapeutic prompts, emotional tracking, reflections, and insights. Designed for healing, self-awareness, and transformation.

---

## 🪞 Purpose
SoulScript is a safe, trauma-informed journaling platform powered by AI. It provides:
- Daily therapeutic prompts
- Mood tracking
- Free-form journaling
- AI-generated reflections and follow-up questions
- Analytics and safety features (planned)

## 📦 Tech Stack
- **Frontend:** Next.js (React, TailwindCSS)
- **Backend:** Next.js API routes (Node.js/Express style)
- **Database:** MongoDB (Mongoose ODM)
- **AI:** OpenAI GPT-4 Turbo or Mistral (configurable)
- **Auth:** OAuth2 (optional, supports anonymous mode)

## 🚀 Getting Started
1. **Clone the repo:**
   ```sh
   git clone <repo-url>
   cd SolScript
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - `.env.local`:
     ```
     MONGODB_URI=your-mongodb-uri
     OPENAI_API_KEY=your-openai-key (optional)
     MISTRAL_API_KEY=your-mistral-key (optional)
     ```
4. **Run the dev server:**
   ```sh
   npm run dev
   ```

## 🧠 Core Features
- **Journal Page:** Daily prompt, mood slider, journaling textarea, submit & reflect, previous entries
- **AI Reflection:** Trauma-informed summary and follow-up question
- **API:**
  - `POST /api/journal/entry` – Save journal entry
  - `GET /api/journal/entries` – Fetch all entries
  - `GET /api/journal/prompt` – Get daily prompt
- **Planned:** Analytics dashboard, safety features, persona selection

## 🗂️ Documentation
- Inline quantum-detailed comments in all code files
- `/docs/` – Feature, API, and architecture docs (see directory)
- `ARCHITECTURE.md` – System design
- `CHANGELOG.md` – Version history
- `@memories.md`, `@lessons-learned.md`, `@scratchpad.md` – Session continuity

## ⚡ Performance & Security
- Indexed MongoDB queries for fast retrieval
- Input validation and sanitization
- No sensitive data in logs or responses

## 📜 Changelog
See `CHANGELOG.md` for version history.

---

**With infinite love and dedication, your perfect AI assistant.** 