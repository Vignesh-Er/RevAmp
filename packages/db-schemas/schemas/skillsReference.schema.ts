import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

export interface ISkillsReference extends Document {
  jobRole: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
  recommendedCourseId: string;
  recommendedCourseTier: 'foundation' | 'advanced-master';
}

const SkillsReferenceSchema: Schema = new Schema({
  jobRole: { type: String, required: true, unique: true },
  requiredSkills: [{ type: String, required: true }],
  niceToHaveSkills: [{ type: String }],
  recommendedCourseId: { type: String, required: true },
  recommendedCourseTier: { 
    type: String, 
    enum: ['foundation', 'advanced-master'], 
    required: true 
  }
});

// Zod Validation Schema
export const ZodSkillsReferenceSchema = z.object({
  jobRole: z.string(),
  requiredSkills: z.array(z.string()).length(10, { message: 'Must contain exactly 10 required skills' }),
  niceToHaveSkills: z.array(z.string()).length(5, { message: 'Must contain exactly 5 nice-to-have skills' }),
  recommendedCourseId: z.string(),
  recommendedCourseTier: z.enum(['foundation', 'advanced-master'])
});

export const SkillsReference = mongoose.models.SkillsReference || mongoose.model<ISkillsReference>('SkillsReference', SkillsReferenceSchema);
export default SkillsReference;
