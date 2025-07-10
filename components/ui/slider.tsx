// components/ui/slider.tsx
import React from 'react';

/**
 * Accessible Slider Component – Quantum-detailed documentation
 * ----------------------------------------------------------
 * A styled slider for mood selection (1-5).
 *
 * Props:
 * - min: number
 * - max: number
 * - step: number
 * - value: [number]
 * - onValueChange: (value: [number]) => void
 *
 * Usage:
 * <Slider min={1} max={5} step={1} value={[3]} onValueChange={...} />
 *
 * Changelog:
 * 2024-06-09: Initial creation.
 */

export const Slider: React.FC<{
  min: number;
  max: number;
  step: number;
  value: [number];
  onValueChange: (value: [number]) => void;
}> = ({ min, max, step, value, onValueChange }) => (
  <input
    type="range"
    min={min}
    max={max}
    step={step}
    value={value[0]}
    onChange={e => onValueChange([Number(e.target.value)])}
    className="w-full mt-2 mb-2 accent-blue-500"
    aria-valuenow={value[0]}
    aria-valuemin={min}
    aria-valuemax={max}
  />
); 