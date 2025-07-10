// components/ui/card.tsx
import React from 'react';

/**
 * Card & CardContent Components – Quantum-detailed documentation
 * -------------------------------------------------------------
 * Simple card layout for grouping content.
 *
 * Usage:
 * <Card><CardContent>...</CardContent></Card>
 *
 * Changelog:
 * 2024-06-09: Initial creation.
 */

export const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`rounded-xl shadow bg-white ${className}`}>{children}</div>
);

export const CardContent: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
); 