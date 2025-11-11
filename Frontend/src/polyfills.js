import { Buffer } from 'buffer'

// Polyfill Buffer for browser
window.Buffer = Buffer
globalThis.Buffer = Buffer
globalThis.global = globalThis