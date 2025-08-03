// @ts-ignore // Suppress linter error if mongoose types are missing. Ensure 'mongoose' and '@types/mongoose' are installed.
import mongoose, { Schema, Document, models, model, Model } from 'mongoose';

/**
 * JournalEntry Schema – Quantum-detailed documentation
 * ---------------------------------------------------
 * Represents a single journal entry for a user/session.
 *
 * Fields:
 * - userId: string | null – User or session identifier (null for anonymous)
 * - date: Date – ISO date of the entry
 * - entry: string – The user's journal text
 * - mood: string – Mood or emoji string (e.g., 'happy', 'sad', '😊')
 * - aiReflection: string – AI-generated summary/insight
 * - followUpQuestion: string – AI-generated follow-up question
 *
 * Dependencies:
 * - Mongoose ODM
 * - MongoDB
 *
 * Usage Example:
 *   const entry = await JournalEntry.create({ ... });
 *
 * Performance:
 *   Indexed by userId and date for fast retrieval.
 *
 * Security:
 *   Do not expose sensitive user data. Sanitize input.
 *
 * Changelog:
 *   2024-06-09: Initial schema creation.
 *   2024-06-09: Unified mood type to string (emoji/label).
 */

export interface IJournalEntry extends Document {
  userId: string | null;
  date: Date;
  entry: string;
  mood: string; // Unified as string (emoji/label)
  aiReflection: string;
  followUpQuestion: string;
}

const JournalEntrySchema = new Schema<IJournalEntry>({
  userId: { type: String, required: false, index: true, default: null },
  date: { type: Date, required: true, index: true },
  entry: { type: String, required: true },
  mood: { type: String, required: true }, // Unified as string
  aiReflection: { type: String, required: true },
  followUpQuestion: { type: String, required: true },
});

// Prevent model overwrite in dev. Cast to Model to avoid union call signature issues.
const JournalEntry: Model<IJournalEntry> =
  (models.JournalEntry as Model<IJournalEntry>) ||
  model<IJournalEntry>('JournalEntry', JournalEntrySchema);

export default JournalEntry;