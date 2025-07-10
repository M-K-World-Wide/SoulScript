// pages/api/dashboard.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/mongodb';
import JournalEntry from '../../models/JournalEntry';

/**
 * GET /api/dashboard
 * ------------------
 * Returns analytics for the dashboard:
 * - Average mood (array for chart)
 * - Repeated themes (placeholder)
 *
 * Changelog:
 * 2024-06-09: Initial scaffold with placeholders.
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    await connectToDatabase();
    // Fetch all entries
    const entries = await JournalEntry.find({});
    // Calculate average mood per entry (assuming mood is 1-5)
    const moodData = entries.map(e => typeof e.mood === 'number' ? e.mood : parseInt(e.mood, 10)).filter(Number.isFinite);
    // Placeholder for repeated themes (future: AI clustering)
    const themes: string[] = [];
    res.status(200).json({ moodData, themes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard analytics' });
  }
} 