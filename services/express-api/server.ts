import express from 'express';
import mongoose from 'mongoose';
import { helmetConfig, corsOptions, standardRateLimiter } from './middleware/security';
import analyzeRoute from './routes/analyze.route';
import contactRoute from './routes/contact.route';
import leadRoute from './routes/lead.route';
import consentRoute from './routes/consent.route';

const app = express();
const port = process.env.PORT || 5000;

// Apply Secure Helmet Headers and CORS Origins
app.use(helmetConfig);
app.use(corsOptions);

// Standard JSON request body parser with safety limit to block DDoS/overload
app.use(express.json({ limit: '50kb' }));

// Apply standard rate limit to all server-facing routes
app.use(standardRateLimiter);

// Database Connection to MongoDB Atlas
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.warn('WARNING: MONGODB_URI environment variable is missing. Running in disconnected mode.');
} else {
  mongoose.connect(mongoUri)
    .then(() => console.log('Successfully connected to MongoDB Atlas.'))
    .catch((err) => console.error('MongoDB Atlas Connection Error:', err));
}

// -------------------------------------------------------------------------
// ROUTE REGISTRATIONS
// -------------------------------------------------------------------------
app.use('/api/analyze', analyzeRoute);
app.use('/api/contact', contactRoute);
app.use('/api/lead', leadRoute);
app.use('/api/consent', consentRoute);

// Live API Health Check endpoint
app.get('/api/health', (req, res) => {
  return res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Startup Listener
app.listen(port, () => {
  console.log(`Digimation Flight 2.0 Backend listening on port ${port} in ${process.env.NODE_ENV || 'development'} mode.`);
});
