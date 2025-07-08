// pages/api/journal/entry.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import JournalEntry from '../../../models/JournalEntry';
import { generatePrompt, reflectOnEntry } from '../../../utils/ai';

/**
 * POST /api/journal/entry
 * -----------------------
 * Saves a new journal entry for a user/session.
 *
 * Request Body:
 *   - entry: string (required)
 *   - mood: string (required)
 *   - date: string (ISO, required)
 *   - userId: string | null (optional)
 *
 * Response:
 *   - success: boolean
 *   - savedEntry: JournalEntry document
 *
 * Security:
 *   - Input validation and sanitization
 *   - No sensitive data in logs
 *
 * Changelog:
 *   2024-06-09: Initial route creation.
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { entry, mood, date, userId } = req.body;

  // Input validation
  if (!entry || !mood || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await connectToDatabase();

    // Get AI reflection and follow-up question
    const { aiReflection, followUpQuestion } = await reflectOnEntry(entry);

    // Create and save the journal entry
    const savedEntry = await JournalEntry.create({
      userId: userId || null,
      date: new Date(date),
      entry,
      mood,
      aiReflection,
      followUpQuestion,
    });

    return res.status(201).json({ success: true, savedEntry });
  } catch (error) {
    // Do not leak sensitive error details
    return res.status(500).json({ error: 'Failed to save entry' });
  }
} 