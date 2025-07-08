// utils/ai.ts
import axios from 'axios';
// import { OpenAI } from 'openai'; // Uncomment if using OpenAI

/**
 * AI Utility Functions – Quantum-detailed documentation
 * ----------------------------------------------------
 * Provides functions to generate trauma-informed journaling prompts and reflect on journal entries
 * using either OpenAI GPT-4 Turbo or Mistral API.
 *
 * Dependencies:
 * - axios (for Mistral HTTP requests)
 * - openai (optional, for OpenAI integration)
 *
 * Usage Example:
 *   const prompt = await generatePrompt();
 *   const { aiReflection, followUpQuestion } = await reflectOnEntry(entry);
 *
 * Security:
 *   API keys are loaded from environment variables. Do not log sensitive data.
 *
 * Changelog:
 *   2024-06-09: Initial utility creation with Mistral support.
 */

// --- Mistral API Setup ---
const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
const MISTRAL_BASE_URL = 'https://api.mistral.ai/v1/chat/completions';

export async function generatePrompt(): Promise<string> {
  if (!MISTRAL_API_KEY) {
    throw new Error('MISTRAL_API_KEY is not set in environment variables');
  }
  const response = await axios.post(
    MISTRAL_BASE_URL,
    {
      model: 'mistral-small',
      messages: [
        { role: 'system', content: 'You are a gentle, trauma-informed therapist creating daily journaling prompts.' },
        { role: 'user', content: 'Give me one journaling prompt for emotional healing and self-awareness.' }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data.choices[0].message.content ?? 'Describe how you’re feeling today.';
}

export async function reflectOnEntry(entry: string): Promise<{ aiReflection: string; followUpQuestion: string }> {
  if (!MISTRAL_API_KEY) {
    throw new Error('MISTRAL_API_KEY is not set in environment variables');
  }
  const response = await axios.post(
    MISTRAL_BASE_URL,
    {
      model: 'mistral-small',
      messages: [
        { role: 'system', content: 'You are a compassionate, trauma-informed therapeutic AI giving thoughtful reflections.' },
        { role: 'user', content: `Here is my journal entry: "${entry}". Please reflect on it and offer one follow-up question.` }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${MISTRAL_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );
  const content = response.data.choices[0].message.content ?? '';
  const [aiReflection, followUpQuestion] = content.split('\n').reduce(
    (acc: string[], line: string) => {
      if (line.toLowerCase().includes('question')) acc[1] += line;
      else acc[0] += line;
      return acc;
    },
    ['', '']
  );
  return {
    aiReflection: aiReflection.trim(),
    followUpQuestion: followUpQuestion.trim()
  };
}

// --- OpenAI GPT-4 Turbo Support (Optional) ---
// Uncomment and configure if you want to use OpenAI instead of Mistral
/*
import { OpenAI } from 'openai';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export async function generatePromptOpenAI(): Promise<string> {
  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a gentle, trauma-informed therapist creating daily journaling prompts.' },
      { role: 'user', content: 'Give me one journaling prompt for emotional healing and self-awareness.' }
    ],
    model: 'gpt-4-turbo'
  });
  return response.choices[0].message.content ?? 'Describe how you’re feeling today.';
}
export async function reflectOnEntryOpenAI(entry: string): Promise<{ aiReflection: string, followUpQuestion: string }> {
  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'You are a compassionate, trauma-informed therapeutic AI giving thoughtful reflections.' },
      { role: 'user', content: `Here is my journal entry: "${entry}". Please reflect on it and offer one follow-up question.` }
    ],
    model: 'gpt-4-turbo'
  });
  const content = response.choices[0].message.content ?? '';
  const [aiReflection, followUpQuestion] = content.split('\n').reduce((acc, line) => {
    if (line.toLowerCase().includes('question')) acc[1] += line;
    else acc[0] += line;
    return acc;
  }, ['', '']);
  return { aiReflection: aiReflection.trim(), followUpQuestion: followUpQuestion.trim() };
}
*/ 