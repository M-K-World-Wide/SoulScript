// @ts-ignore // Suppress linter error if mongoose types are missing. Ensure 'mongoose' and '@types/mongoose' are installed.
// If you see errors for 'process' or 'global', install '@types/node' for Node.js type support.
// TypeScript declaration for global (for hot-reload safe connection caching)
declare global {
  // eslint-disable-next-line no-var
  var mongoose: any;
}
import mongoose from 'mongoose';

/**
 * MongoDB Connection Utility – Quantum-detailed documentation
 * ----------------------------------------------------------
 * Handles connection pooling and hot-reload safety for Next.js API routes.
 *
 * Dependencies:
 * - Mongoose ODM
 * - MongoDB Atlas or local instance
 *
 * Usage Example:
 *   await connectToDatabase();
 *
 * Performance:
 *   Prevents multiple connections in dev mode (hot-reload safe).
 *
 * Security:
 *   Uses environment variable for MongoDB URI.
 *
 * Changelog:
 *   2024-06-09: Initial utility creation.
 */

// Use globalThis for type safety in modern Node.js/TypeScript
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
} 