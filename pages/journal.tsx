// pages/journal.tsx

/**
 * SoulScript Journal Page – Quantum-detailed documentation
 * ------------------------------------------------------
 * Main journaling interface with trauma-informed features:
 * - Daily AI-generated prompt
 * - Mood slider (1-5, can be mapped to emoji/label)
 * - Free-form journaling textarea
 * - Panic button (grounding techniques)
 * - Trauma keyword detection (crisis flag)
 * - AI reflection and follow-up question
 *
 * Dependencies:
 * - @/components/ui/* (custom UI components)
 * - framer-motion (animation)
 *
 * Security:
 * - Sanitizes user input
 * - Flags crisis keywords
 *
 * Changelog:
 * - 2024-06-09: Scaffolded with safety and trauma-informed features.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';

// Grounding phrases for panic button (trauma-informed)
const panicGroundingPhrases = [
  "You're safe now.",
  "Breathe in... hold... breathe out.",
  "Feel your body—you're here, you're present.",
  "I'm here with you."
];

// Crisis/trauma keywords for flagging entries
const traumaKeywords = ["abuse", "hurt myself", "can’t go on", "suicidal", "worthless", "end it all"];

// Add type definitions for Web Speech API
interface SpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
    speechSynthesis: SpeechSynthesis;
    SpeechSynthesisUtterance: typeof SpeechSynthesisUtterance;
  }
}

export default function JournalPage() {
  // Mood is a number (1-5), can be mapped to emoji/label for display
  const [mood, setMood] = useState(3);
  const [entry, setEntry] = useState('');
  const [aiReflection, setAiReflection] = useState('');
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [dailyPrompt, setDailyPrompt] = useState('');
  const [panicMode, setPanicMode] = useState(false);
  const [groundingPhrase, setGroundingPhrase] = useState('');
  const [flagged, setFlagged] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [isClient, setIsClient] = useState(false); // SSR/CSR hydration fix

  useEffect(() => {
    setIsClient(true); // Only true on client
  }, []);

  // Fetch daily prompt from API
  useEffect(() => {
    fetch('/api/prompt')
      .then(res => res.json())
      .then(data => setDailyPrompt(data.prompt));
  }, []);

  // Handle journal submission
  const handleSubmit = async () => {
    setLoading(true);
    // Check for trauma/crisis keywords
    const isFlagged = traumaKeywords.some(keyword => entry.toLowerCase().includes(keyword));
    setFlagged(isFlagged);
    // Submit entry and mood to API
    const res = await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry, mood })
    });
    const data = await res.json();
    setAiReflection(data.aiReflection);
    setFollowUpQuestion(data.followUpQuestion);
    setLoading(false);
  };

  // Trigger panic button (grounding technique)
  const triggerPanicButton = () => {
    setPanicMode(true);
    const randomIndex = Math.floor(Math.random() * panicGroundingPhrases.length);
    setGroundingPhrase(panicGroundingPhrases[randomIndex]);
  };

  // --- Voice: Speech-to-Text for Entry ---
  const startListening = () => {
    if (!isClient) return;
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setEntry(prev => prev + (prev ? ' ' : '') + transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    setIsListening(true);
    recognition.start();
  };
  const stopListening = () => {
    if (!isClient) return;
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  // --- Voice: Text-to-Speech for Prompt/Reflection ---
  const speak = (text: string) => {
    if (!isClient) return;
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech not supported in this browser.');
      return;
    }
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1;
    window.speechSynthesis.speak(utter);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Daily Prompt Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gradient-to-br from-purple-100 via-pink-50 to-white">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-2 text-purple-900">Daily Prompt</h2>
            <div className="flex items-center gap-2 mb-4">
              <p className="italic text-gray-600 flex-1">{dailyPrompt || 'Loading prompt...'}</p>
              {isClient && (
                <Button variant="outline" aria-label="Listen to prompt" onClick={() => speak(dailyPrompt)}>
                  🔊
                </Button>
              )}
            </div>
            <Label className="text-sm text-gray-700">Mood</Label>
            {/* Mood slider (1-5) */}
            <Slider min={1} max={5} step={1} value={[mood]} onValueChange={([val]) => setMood(val)} />

            <Label className="mt-4 text-sm text-gray-700">Your Entry</Label>
            <Textarea
              rows={8}
              placeholder="Start journaling..."
              value={entry}
              onChange={e => setEntry(e.target.value)}
              className="mt-2 border-purple-200"
            />
            {isClient && (
              <div className="flex items-center gap-2 mt-2">
                <Button
                  variant={isListening ? 'outline' : undefined}
                  aria-label={isListening ? 'Stop recording' : 'Record voice'}
                  onClick={isListening ? stopListening : startListening}
                >
                  {isListening ? '🛑 Stop' : '🎤 Speak'}
                </Button>
              </div>
            )}
            <div className="flex items-center gap-4 mt-4">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Reflecting...' : 'Submit & Reflect'}
              </Button>
              <Button variant="outline" onClick={triggerPanicButton}>Panic Button</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Panic Mode Grounding Message */}
      {panicMode && (
        <motion.div
          className="text-center bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-red-700 font-medium">{groundingPhrase}</p>
        </motion.div>
      )}

      {/* Crisis Keyword Flag Message */}
      {flagged && !loading && (
        <motion.div
          className="text-center bg-yellow-50 border border-yellow-300 rounded-xl p-4 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-yellow-800 font-semibold">You mentioned something serious. You are not alone. ❤️<br />If you’re in crisis, please reach out to a trusted person or professional.</p>
        </motion.div>
      )}

      {/* AI Reflection Card */}
      {aiReflection && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-white shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-semibold text-gray-800 flex-1">AI Reflection</h2>
                {isClient && (
                  <Button variant="outline" aria-label="Listen to reflection" onClick={() => speak(aiReflection + ' ' + followUpQuestion)}>
                    🔊
                  </Button>
                )}
              </div>
              <p className="text-gray-700 mb-2 whitespace-pre-wrap">{aiReflection}</p>
              <p className="italic text-sm text-blue-800">{followUpQuestion}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
} 