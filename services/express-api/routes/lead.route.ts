import express, { Request, Response } from 'express';
import { Lead, ZodLeadSchema } from '../../../packages/db-schemas/schemas/lead.schema';
import { standardRateLimiter } from '../middleware/security';

const router = express.Router();

// Fetch all leads
router.get('/', standardRateLimiter, async (req: Request, res: Response) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    return res.status(200).json({ status: 'success', data: leads });
  } catch (error) {
    console.error('Fetch Leads Route Error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal Server Error.' });
  }
});

// Update specific lead stage
router.put('/:id', standardRateLimiter, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { leadStage } = req.body;

    if (!['new', 'contacted', 'qualified', 'enrolled', 'disqualified'].includes(leadStage)) {
      return res.status(400).json({ status: 'error', message: 'Invalid lead stage specified.' });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { leadStage },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ status: 'error', message: 'Lead not found.' });
    }

    return res.status(200).json({ status: 'success', data: updatedLead });

  } catch (error) {
    console.error('Update Lead Route Error:', error);
    return res.status(500).json({ status: 'error', message: 'Internal Server Error.' });
  }
});

export default router;
