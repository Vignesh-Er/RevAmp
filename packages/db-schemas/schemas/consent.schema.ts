import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

export interface IConsent extends Document {
  anonymousId: string;
  consentTimestamp: Date;
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  userAgent: string;
  ipHash: string;
  consentVersion: string;
}

const ConsentSchema: Schema = new Schema({
  anonymousId: { type: String, required: true },
  consentTimestamp: { type: Date, required: true, default: Date.now },
  essential: { type: Boolean, default: true },
  analytics: { type: Boolean, default: false },
  marketing: { type: Boolean, default: false },
  userAgent: { type: String, required: true },
  ipHash: { type: String, required: true },
  consentVersion: { type: String, default: '1.0-DPDP-2025' }
});

// Zod Input Validation for Consent Route
export const ZodConsentSchema = z.object({
  anonymousId: z.string(),
  essential: z.boolean().default(true),
  analytics: z.boolean(),
  marketing: z.boolean(),
  userAgent: z.string()
});

export const Consent = mongoose.models.Consent || mongoose.model<IConsent>('Consent', ConsentSchema);
export default Consent;
