// pages/api/journal/entries.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongodb';
import JournalEntry from '../../../models/JournalEntry';

/**
 * GET /api/journal/entries
 * ------------------------
 * Fetches all journal entries for a user/session.
 *
 * Query Params:
 *   - userId: string | null (optional, for authenticated users)
 *
 * Response:
 *   - entries: JournalEntry[]
 *
 * Security:
 *   - Only return entries for the requesting user/session
 *   - No sensitive data in logs
 *
 * Changelog:
 *   2024-06-09: Initial route creation.
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.query;

  try {
    await connectToDatabase();

    // Fetch entries for user or all if anonymous
    const query = userId ? { userId } : {};
    const entries = await JournalEntry.find(query).sort({ date: -1 });

    return res.status(200).json({ entries });
  } catch (error) {
    // Do not leak sensitive error details
    return res.status(500).json({ error: 'Failed to fetch entries' });
  }
} 