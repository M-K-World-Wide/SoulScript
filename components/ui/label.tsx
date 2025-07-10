// components/ui/label.tsx
import React from 'react';

/**
 * Accessible Label Component – Quantum-detailed documentation
 * ---------------------------------------------------------
 * A styled label for form fields.
 *
 * Props:
 * - className: string
 * - children: React.ReactNode
 *
 * Usage:
 * <Label>Label text</Label>
 *
 * Changelog:
 * 2024-06-09: Initial creation.
 */

export const Label: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <label className={`block font-medium mb-1 ${className}`}>{children}</label>
); 