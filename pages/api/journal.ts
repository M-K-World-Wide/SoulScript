// pages/api/journal.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { reflectOnEntry } from '@/utils/ai';
import dbConnect from '@/utils/dbConnect';
import JournalEntry from '@/models/JournalEntry';

/**
 * POST /api/journal
 * -----------------
 * Handles journal entry submission and AI reflection.
 *
 * Request Body:
 *   - entry: string (required)
 *   - mood: string (emoji/label, required)
 *
 * Response:
 *   - id: string (MongoDB ObjectId)
 *   - aiReflection: string
 *   - followUpQuestion: string
 *
 * Security:
 *   - Input validation and sanitization
 *   - No sensitive data in logs
 *
 * Changelog:
 *   2024-06-09: Unified mood type to string (emoji/label).
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    const { entry, mood } = req.body;

    // Input validation
    if (!entry || typeof entry !== 'string' || !mood || typeof mood !== 'string') {
      return res.status(400).json({ message: 'Invalid entry or mood' });
    }

    const { aiReflection, followUpQuestion } = await reflectOnEntry(entry);

    const savedEntry = await JournalEntry.create({
      entry,
      mood, // Now a string (emoji/label)
      aiReflection,
      followUpQuestion,
      date: new Date()
    });

    res.status(200).json({
      id: savedEntry._id,
      aiReflection,
      followUpQuestion
    });
  } catch (error) {
    console.error('Journal submission error:', error);
    res.status(500).json({ message: 'Failed to process journal entry' });
  }
} 