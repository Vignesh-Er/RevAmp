import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

// CORS Configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,https://www.digimationflight.com')
  .split(',')
  .map(origin => origin.trim());

export const corsOptions = cors({
  origin: (origin, callback) => {
    // Allow server-to-server requests or localhost in non-production
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy under DPDPA corporate boundary safety.'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200
});

// Helmet Header Security Configuration
export const helmetConfig = helmet({
  contentSecurityPolicy: false, // Next.js handles CSP headers independently
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin'
  },
  noSniff: true,
  xssFilter: true,
  hidePoweredBy: true
});

// Standard Rate Limiter (100 requests per 15-minute window)
export const standardRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    status: 'error',
    message: 'Too many requests from this IP. Please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Strict Rate Limiter for AI Analyzer & Lead Forms (5 requests per hour)
export const strictRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: {
    status: 'error',
    message: 'AI Analyzer limits exceeded (Max 5 requests per hour). Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});
