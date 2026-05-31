'use client';
import React, { useState } from 'react';
import { GlassCard } from './GlassCard';
import { CTAButton } from './CTAButton';
import { Send, CheckCircle2 } from 'lucide-react';

export const B2BInquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collegeName: '',
    buyerRole: 'TPO',
    preferredModel: 'DF-B2B-04',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // 1. Submit lead parameters to Express API
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          interest: 'B2B Partnership',
          message: `College: ${formData.collegeName} | Role: ${formData.buyerRole} | Preferred Model: ${formData.preferredModel} | Notes: ${formData.message}`,
          source: 'b2b_partnership_form'
        })
      });

      if (!response.ok) throw new Error('Submission failed');

      // 2. Synchronize HubSpot tracking context if available
      if (typeof window !== 'undefined' && (window as any)._hsq) {
        (window as any)._hsq.push(['identify', {
          email: formData.email,
          firstname: formData.name,
          company: formData.collegeName,
          hs_lead_status: 'NEW'
        }]);
        (window as any)._hsq.push(['trackPageView']);
      }

      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <GlassCard variant="partnership" className="p-8 md:p-10 w-full max-w-xl mx-auto shadow-lg" id="b2b-form">
      <div className="text-center space-y-2 mb-8">
        <h3 className="font-syne font-bold text-2xl text-[#17171D]">
          Request Partnership Details
        </h3>
        <p className="font-nunito text-[#3D3D45] text-sm">
          Connect with an Academic Integration Dean within 24 hours.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-6 bg-[#1B8A4E]/10 border border-[#1B8A4E]/30 rounded-xl text-center space-y-4">
          <div className="p-3 bg-[#1B8A4E]/20 text-[#1B8A4E] rounded-full w-fit mx-auto">
            <CheckCircle2 size={32} />
          </div>
          <h4 className="font-syne font-bold text-lg text-[#17171D]">
            Inquiry Submitted Successfully
          </h4>
          <p className="font-nunito text-xs text-[#3D3D45] leading-relaxed">
            Thank you for contacting Digimation Flight. An integration advisor will review your institution's profile and reach out via email shortly.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 font-nunito text-sm text-[#17171D]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B6B75] mb-1.5">Institution Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Mathura Tech College"
                className="w-full p-3 rounded-lg border border-[#17171D]/15 focus:outline-none focus:border-[#FCC509] bg-white"
                value={formData.collegeName}
                onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B6B75] mb-1.5">Your Academic Role</label>
              <select
                className="w-full p-3.5 rounded-lg border border-[#17171D]/15 focus:outline-none focus:border-[#FCC509] bg-white text-[#17171D]"
                value={formData.buyerRole}
                onChange={e => setFormData({ ...formData, buyerRole: e.target.value })}
              >
                <option value="TPO">Training & Placement Officer (TPO)</option>
                <option value="Dean">Dean / Curriculum Director</option>
                <option value="ViceChancellor">Vice Chancellor / Academic Council</option>
                <option value="Faculty">Department Head / Faculty Mentor</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B6B75] mb-1.5">Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Jatin"
                className="w-full p-3 rounded-lg border border-[#17171D]/15 focus:outline-none focus:border-[#FCC509] bg-white"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B6B75] mb-1.5">Preferred Partnership Model</label>
              <select
                className="w-full p-3.5 rounded-lg border border-[#17171D]/15 focus:outline-none focus:border-[#FCC509] bg-white text-[#17171D]"
                value={formData.preferredModel}
                onChange={e => setFormData({ ...formData, preferredModel: e.target.value })}
              >
                <option value="DF-B2B-01">Official Enrollment Channel</option>
                <option value="DF-B2B-02">Semester Skill Programs</option>
                <option value="DF-B2B-03">White-Label College-Branded</option>
                <option value="DF-B2B-04">Placement Readiness Service</option>
                <option value="DF-B2B-05">Internship Management</option>
                <option value="DF-B2B-06">Credit-Linked Programs</option>
                <option value="DF-B2B-07">Capstone Programs</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B6B75] mb-1.5">Institutional Email</label>
              <input
                type="email"
                required
                placeholder="dean@university.edu.in"
                className="w-full p-3 rounded-lg border border-[#17171D]/15 focus:outline-none focus:border-[#FCC509] bg-white"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#6B6B75] mb-1.5">Contact Phone Number</label>
              <input
                type="tel"
                required
                placeholder="e.g. +91 9988776655"
                className="w-full p-3 rounded-lg border border-[#17171D]/15 focus:outline-none focus:border-[#FCC509] bg-white"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#6B6B75] mb-1.5">Additional Alignment Requirements</label>
            <textarea
              rows={3}
              placeholder="Detail cohort sizing, timeline matching, credit structures, etc."
              className="w-full p-3 rounded-lg border border-[#17171D]/15 focus:outline-none focus:border-[#FCC509] bg-white resize-none"
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          {status === 'error' && (
            <p className="text-xs text-[#D93025] font-semibold italic text-center">
              An error occurred during submission. Please check your inputs and try again.
            </p>
          )}

          <CTAButton
            variant="primary"
            size="lg"
            loading={status === 'loading'}
            className="w-full flex items-center justify-center gap-2"
          >
            <Send size={16} /> Submit Partnership Inquiry
          </CTAButton>
        </form>
      )}
    </GlassCard>
  );
};

export default B2BInquiryForm;
