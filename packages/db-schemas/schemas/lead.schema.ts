import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  resumeScore?: number;
  grade?: string;
  primarySkillGap: string[];
  recommendedCourse?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  hubspotContactId?: string;
  claritySessionUrl?: string;
  leadStage: 'new' | 'contacted' | 'qualified' | 'enrolled' | 'disqualified';
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String },
  resumeScore: { type: Number },
  grade: { type: String },
  primarySkillGap: [{ type: String }],
  recommendedCourse: { type: String },
  utmSource: { type: String },
  utmMedium: { type: String },
  utmCampaign: { type: String },
  hubspotContactId: { type: String },
  claritySessionUrl: { type: String },
  leadStage: { 
    type: String, 
    enum: ['new', 'contacted', 'qualified', 'enrolled', 'disqualified'],
    default: 'new' 
  },
  createdAt: { type: Date, default: Date.now }
});

// Zod Input Validation Schema
export const ZodLeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  resumeScore: z.number().optional(),
  grade: z.string().optional(),
  primarySkillGap: z.array(z.string()).default([]),
  recommendedCourse: z.string().optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  hubspotContactId: z.string().optional(),
  claritySessionUrl: z.string().optional()
});

export const Lead = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
export default Lead;
