import express, { Request, Response } from 'express';
import crypto from 'crypto';
import { Consent, ZodConsentSchema } from '../../../packages/db-schemas/schemas/consent.schema';
import { standardRateLimiter } from '../middleware/security';

const router = express.Router();

router.post('/', standardRateLimiter, async (req: Request, res: Response) => {
  try {
    // 1. Zod Schema Verification
    const validatedData = ZodConsentSchema.parse(req.body);

    // 2. Hash IP Address for DPDP Act data minimization
    const rawIp = req.ip || req.headers['x-forwarded-for']?.toString() || '127.0.0.1';
    const ipHash = crypto.createHash('sha256').update(rawIp).digest('hex');

    // 3. Persist Consent Audit Trail
    const newConsent = new Consent({
      anonymousId: validatedData.anonymousId,
      essential: validatedData.essential,
      analytics: validatedData.analytics,
      marketing: validatedData.marketing,
      userAgent: validatedData.userAgent,
      ipHash,
      consentVersion: '1.0-DPDP-2025'
    });

    await newConsent.save();

    return res.status(201).json({
      status: 'success',
      message: 'DPDP-compliant consent logged successfully.'
    });

  } catch (error: any) {
    console.error('DPDP Consent Route Error:', error);
    if (error.name === 'ZodError') {
      return res.status(400).json({ status: 'error', errors: error.errors });
    }
    return res.status(500).json({ status: 'error', message: 'Internal Server Error.' });
  }
});

export default router;
