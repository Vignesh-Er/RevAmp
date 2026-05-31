import express, { Request, Response } from 'express';
import crypto from 'crypto';
import axios from 'axios';
import { Contact, ZodContactSchema } from '../../../packages/db-schemas/schemas/contact.schema';
import { standardRateLimiter } from '../middleware/security';

const router = express.Router();

router.post('/', standardRateLimiter, async (req: Request, res: Response) => {
  try {
    // 1. Zod Input Validation
    const validatedData = ZodContactSchema.parse(req.body);

    // 2. Hash IP Address for DPDP act data minimization compliance
    const rawIp = req.ip || req.headers['x-forwarded-for']?.toString() || '127.0.0.1';
    const ipHash = crypto.createHash('sha256').update(rawIp).digest('hex');

    // 3. Database Persistence
    const newContact = new Contact({
      ...validatedData,
      ipHash,
      processed: false
    });

    await newContact.save();

    // 4. HubSpot CRM Contact Synchronization Pipeline
    if (process.env.HUBSPOT_API_KEY) {
      try {
        await axios.post(
          'https://api.hubapi.com/crm/v3/contacts',
          {
            properties: {
              email: validatedData.email,
              firstname: validatedData.name.split(' ')[0] || validatedData.name,
              lastname: validatedData.name.split(' ').slice(1).join(' ') || '',
              phone: validatedData.phone,
              message: validatedData.message || '',
              hs_lead_status: 'NEW',
              lead_source: validatedData.source
            }
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );
      } catch (crmError: any) {
        // Log CRM failures internally, but don't crash user response
        console.error('HubSpot Contact Creation Failure:', crmError.response?.data || crmError.message);
      }
    }

    return res.status(201).json({
      status: 'success',
      message: 'Inquiry received successfully.'
    });

  } catch (error: any) {
    console.error('Contact Form Route Error:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ status: 'error', errors: error.errors });
    }
    return res.status(500).json({ status: 'error', message: 'Internal Server Error.' });
  }
});

export default router;
