# SoulScript API Documentation – Quantum Detail

## 1. POST /api/journal/entry
- **Purpose:** Save a journal entry
- **Request Body:**
  ```json
  {
    "entry": "string (required)",
    "mood": "string (emoji/label, required)",
    "date": "ISODate (required)",
    "userId": "string | null (optional)"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "savedEntry": { /* JournalEntry schema */ }
  }
  ```
- **Example:**
  ```bash
  curl -X POST /api/journal/entry -d '{"entry":"Today I felt...","mood":"happy","date":"2024-06-09T12:00:00Z"}'
  ```
- **Performance:** Indexed by userId/date
- **Security:** Input validation, no sensitive data in logs
- **Changelog:**
  - 2024-06-09: Unified mood type to string (emoji/label) across all layers.

## 2. GET /api/journal/entries
- **Purpose:** Fetch all entries for user/session
- **Query Params:**
  - `userId` (optional)
- **Response:**
  ```json
  {
    "entries": [ /* JournalEntry[] */ ]
  }
  ```
- **Example:**
  ```bash
  curl /api/journal/entries?userId=abc123
  ```
- **Performance:** Indexed queries
- **Security:** Only returns entries for user/session

## 3. GET /api/journal/prompt
- **Purpose:** Get daily AI-generated prompt
- **Response:**
  ```json
  {
    "prompt": "string"
  }
  ```
- **Example:**
  ```bash
  curl /api/journal/prompt
  ```
- **Performance:** Fast, AI call
- **Security:** No sensitive data in logs

---

## Cross-References
- See `FEATURES.md` for feature context
- See `README.md` for project overview
- See `ARCHITECTURE.md` for system design 