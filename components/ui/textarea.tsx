// components/ui/textarea.tsx
import React from 'react';

/**
 * Accessible Textarea Component – Quantum-detailed documentation
 * ------------------------------------------------------------
 * A styled textarea for journaling and form input.
 *
 * Props:
 * - All standard <textarea> props
 *
 * Usage:
 * <Textarea value={...} onChange={...} />
 *
 * Changelog:
 * 2024-06-09: Initial creation.
 */

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={`block w-full rounded border border-gray-300 p-2 focus:outline-none focus:ring focus:border-blue-400 transition ${className}`}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea'; 