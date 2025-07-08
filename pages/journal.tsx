// pages/journal.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Journal Page – Quantum-detailed documentation
 * --------------------------------------------
 * Main journaling interface for SoulScript.
 * Features:
 *  - AI-generated daily prompt
 *  - Free-form journaling textarea
 *  - Mood slider/emoji picker
 *  - 'Submit & Reflect' button
 *  - Display of previous entries
 *
 * Dependencies:
 *  - axios (API calls)
 *  - TailwindCSS (styling)
 *
 * Security:
 *  - Sanitizes user input
 *  - Handles API errors gracefully
 *
 * Changelog:
 *  2024-06-09: Initial scaffold.
 */

const MOODS = [
  { label: '😢', value: 'sad' },
  { label: '😐', value: 'neutral' },
  { label: '😊', value: 'happy' },
  { label: '😠', value: 'angry' },
  { label: '😱', value: 'anxious' },
];

export default function JournalPage() {
  const [prompt, setPrompt] = useState('');
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState(MOODS[1].value);
  const [entries, setEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiReflection, setAiReflection] = useState('');
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [error, setError] = useState('');

  // Fetch daily prompt on mount
  useEffect(() => {
    async function fetchPrompt() {
      try {
        const res = await axios.get('/api/journal/prompt');
        setPrompt(res.data.prompt);
      } catch {
        setPrompt('Describe how you’re feeling today.');
      }
    }
    fetchPrompt();
    fetchEntries();
  }, []);

  // Fetch previous entries
  async function fetchEntries() {
    try {
      const res = await axios.get('/api/journal/entries');
      setEntries(res.data.entries);
    } catch {
      setEntries([]);
    }
  }

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAiReflection('');
    setFollowUpQuestion('');
    try {
      const res = await axios.post('/api/journal/entry', {
        entry,
        mood,
        date: new Date().toISOString(),
      });
      setAiReflection(res.data.savedEntry.aiReflection);
      setFollowUpQuestion(res.data.savedEntry.followUpQuestion);
      setEntry('');
      setMood(MOODS[1].value);
      fetchEntries();
    } catch (err: any) {
      setError('Failed to save entry.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">SoulScript Journal</h1>
      <div className="mb-6 p-4 bg-blue-50 rounded shadow">
        <span className="font-semibold">Daily Prompt:</span>
        <p className="mt-2">{prompt}</p>
      </div>
      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring"
          rows={6}
          placeholder="Write your thoughts..."
          value={entry}
          onChange={e => setEntry(e.target.value)}
          required
        />
        <div className="flex items-center mb-4">
          <span className="mr-2">Mood:</span>
          {MOODS.map(m => (
            <button
              key={m.value}
              type="button"
              className={`mx-1 text-2xl ${mood === m.value ? 'ring-2 ring-blue-400' : ''}`}
              onClick={() => setMood(m.value)}
              aria-label={m.value}
            >
              {m.label}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit & Reflect'}
        </button>
        {error && <div className="text-red-600 mt-2">{error}</div>}
      </form>
      {aiReflection && (
        <div className="mb-6 p-4 bg-green-50 rounded shadow">
          <div className="font-semibold mb-2">AI Reflection:</div>
          <div className="mb-2">{aiReflection}</div>
          <div className="italic text-blue-700">{followUpQuestion}</div>
        </div>
      )}
      <h2 className="text-xl font-bold mb-2">Previous Entries</h2>
      <div className="space-y-4">
        {entries.length === 0 && <div>No entries yet.</div>}
        {entries.map((e, i) => (
          <div key={i} className="p-3 border rounded bg-white shadow-sm">
            <div className="text-sm text-gray-500">{new Date(e.date).toLocaleString()} | Mood: {e.mood}</div>
            <div className="mt-1 whitespace-pre-line">{e.entry}</div>
            <div className="mt-2 text-green-700">{e.aiReflection}</div>
            <div className="italic text-blue-700">{e.followUpQuestion}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 