// pages/dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import Line chart for client-side only rendering
const Line = dynamic(() => import('react-chartjs-2').then(mod => mod.Line), { ssr: false });
// Dynamic import placeholder for jsPDF constructor; typed as any to simplify runtime checks.
let jsPDF: any = null;

/**
 * SoulScript Dashboard – Quantum-detailed documentation
 * ----------------------------------------------------
 * Analytics and insights for journaling:
 * - Mood analytics (line chart)
 * - Repeated themes (topic clustering, AI-powered)
 * - Export as PDF
 *
 * SSR/CSR Safety:
 * - Chart.js and jsPDF are only used on the client to prevent hydration mismatch.
 *
 * Changelog:
 * 2024-06-09: Integrated chart and PDF export with SSR/CSR safety.
 */

export default function Dashboard() {
  const [moodData, setMoodData] = useState<number[]>([]);
  const [themes, setThemes] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Fetch analytics from API
    fetch('/api/dashboard')
      .then(res => res.json())
      .then(data => {
        setMoodData(data.moodData || []);
        setThemes(data.themes || []);
      });
    // Dynamically import jsPDF only on client
    import('jspdf').then(mod => {
      // Store constructor for later instantiation
      jsPDF = mod.default;
    });
  }, []);

  // Chart.js data config
  const chartData = {
    labels: moodData.map((_, i) => `Entry ${i + 1}`),
    datasets: [
      {
        label: 'Mood (1-5)',
        data: moodData,
        fill: false,
        borderColor: '#6366f1',
        backgroundColor: '#6366f1',
        tension: 0.3,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { min: 1, max: 5, stepSize: 1 },
    },
  };

  // PDF export logic (client only)
  const exportPDF = () => {
    if (!isClient || !jsPDF) return;
    const doc = new jsPDF();
    doc.text('SoulScript Dashboard Analytics', 10, 10);
    doc.text('Mood Data:', 10, 20);
    doc.text(moodData.join(', '), 10, 30);
    doc.text('Repeated Themes:', 10, 40);
    themes.forEach((theme, i) => doc.text(`- ${theme}`, 10, 50 + i * 10));
    doc.save('soulscript-dashboard.pdf');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Mood Analytics</h2>
            <div className="h-64 flex items-center justify-center bg-blue-50 rounded mb-4">
              {isClient && moodData.length > 0 ? (
                <Line data={chartData} options={chartOptions} />
              ) : (
                <span className="text-blue-400">No mood data yet.</span>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2">Repeated Themes</h3>
            <ul className="list-disc pl-6 mb-4">
              {themes.length === 0 ? <li>No themes detected yet.</li> : themes.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
            {isClient && <Button onClick={exportPDF}>Export as PDF</Button>}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 