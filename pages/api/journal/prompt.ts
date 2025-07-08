// pages/api/journal/prompt.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { generatePrompt } from '../../../utils/ai';

/**
 * GET /api/journal/prompt
 * -----------------------
 * Returns a daily AI-generated journaling prompt.
 *
 * Response:
 *   - prompt: string
 *
 * Security:
 *   - No sensitive data in logs
 *
 * Changelog:
 *   2024-06-09: Initial route creation.
 */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const prompt = await generatePrompt();
    return res.status(200).json({ prompt });
  } catch (error) {
    return res.status(500).json({ prompt: 'Describe how you’re feeling today.' });
  }
} 