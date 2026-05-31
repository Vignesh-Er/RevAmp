import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  interest: 'AI Services' | 'Web Development' | 'Data Science and AI' | 'Cybersecurity' | 'Digital Marketing' | 'Graphic Design' | 'Machine Learning' | 'B2B Partnership' | 'General Inquiry';
  message?: string;
  source: string;
  createdAt: Date;
  ipHash: string;
  processed: boolean;
}

const ContactSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  phone: { type: String, required: true },
  interest: { 
    type: String, 
    enum: ['AI Services', 'Web Development', 'Data Science and AI', 'Cybersecurity', 'Digital Marketing', 'Graphic Design', 'Machine Learning', 'B2B Partnership', 'General Inquiry'],
    required: true 
  },
  message: { type: String },
  source: { type: String, default: 'website_contact_form' },
  createdAt: { type: Date, default: Date.now },
  ipHash: { type: String, required: true },
  processed: { type: Boolean, default: false }
});

// Zod Validation Schema for incoming request validation
export const ZodContactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(10, { message: 'Phone must be at least 10 digits long' }),
  interest: z.enum(['AI Services', 'Web Development', 'Data Science and AI', 'Cybersecurity', 'Digital Marketing', 'Graphic Design', 'Machine Learning', 'B2B Partnership', 'General Inquiry']),
  message: z.string().optional(),
  source: z.string().default('website_contact_form')
});

export const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
export default Contact;
