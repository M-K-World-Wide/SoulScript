// components/ui/button.tsx
import React from 'react';

/**
 * Accessible Button Component – Quantum-detailed documentation
 * ----------------------------------------------------------
 * A styled button for forms and actions.
 *
 * Props:
 * - variant: 'outline' | undefined
 * - All standard <button> props
 *
 * Usage:
 * <Button onClick={...}>Label</Button>
 * <Button variant="outline">Outline</Button>
 *
 * Changelog:
 * 2024-06-09: Initial creation.
 */

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'outline' }>(
  ({ className = '', variant, ...props }, ref) => (
    <button
      ref={ref}
      className={`px-4 py-2 rounded font-medium transition focus:outline-none focus:ring ${
        variant === 'outline'
          ? 'border border-blue-400 text-blue-700 bg-white hover:bg-blue-50'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      } ${className}`}
      {...props}
    />
  )
);
Button.displayName = 'Button'; 