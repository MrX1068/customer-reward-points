import log from 'loglevel';

// --- LOGGER SETUP FOR VITE PROJECTS ---
// Vite exposes environment variables via import.meta.env
// import.meta.env.MODE will be 'development', 'production', or 'test'
// This is the Vite equivalent of process.env.NODE_ENV in other build tools
// See: https://vitejs.dev/guide/env-and-mode.html

// Set log level based on environment:
// - 'debug' for development: show all logs (debug, info, warn, error)
// - 'warn' for production: only show warnings and errors
log.setLevel(process.env.NODE_ENV === 'production' ? 'warn' : 'debug');

// Export the logger instance for use throughout the app
export default log; 