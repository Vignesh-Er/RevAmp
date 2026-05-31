'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { CTAButton } from './CTAButton';
import { UploadCloud, CheckCircle2, XCircle, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import { prefersReducedMotion } from '../animations/variants';

type State = 'IDLE' | 'LOADING' | 'RESULTS' | 'ERROR';

interface AnalysisResult {
  status: string;
  data: {
    candidate: string;
    resumeScore: number;
    grade: string;
    summary: string;
    analysis: {
      checksPassed: number;
      checksFailed: number;
      failedFeedback: string[];
    };
    skillsGap: string[];
    recommendedAction: {
      courseId: string;
      courseTitle: string;
      matchRelevance: string;
      reason: string;
      ctaUrl: string;
    };
  };
}

export const ResumeAnalyzer: React.FC = () => {
  const [state, setState] = useState<State>('IDLE');
  const [targetRole, setTargetRole] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [results, setResults] = useState<AnalysisResult | null>(null);
  
  // Loading checkmarks simulation
  const [checkCount, setCheckCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const checks = [
    'Verifying Contact Completeness...',
    'Evaluating Quantified Achievements...',
    'Analyzing Action Verb Opening Density...',
    'Auditing Section Structure Layout...',
    'Checking Skills Keyword Density...',
    'Scanning ATS-Hostile Formatting Signals...',
    'Evaluating Resume Length Appropriateness...',
    'Checking Date Format Consistency...',
    'Scanning Employment and Education Gaps...',
    'Analyzing Technical Skills Depth vs Breadth...',
    'Checking Professional Portfolio Presence...',
    'Reviewing Grammar & Tense Quality...',
    'Scanning Upskilling & Certification Signals...',
    'Analyzing Professional Objective Quality...'
  ];

  useEffect(() => {
    if (state !== 'LOADING') return;
    setCheckCount(0);
    
    const interval = setInterval(() => {
      setCheckCount((prev) => {
        if (prev >= 13) {
          clearInterval(interval);
          return 13;
        }
        return prev + 1;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [state]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        alert('Please upload a PDF file only.');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const executeAnalysis = async () => {
    if (!selectedFile && !pastedText.trim()) {
      alert('Please upload a PDF resume or paste your resume text.');
      return;
    }

    setState('LOADING');

    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append('resume', selectedFile);
      } else {
        formData.append('resumeText', pastedText);
      }
      formData.append('targetProfile', targetRole || 'web_development');

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Analysis failed. Please try again.');
      }

      const resultData = await response.json();
      setResults(resultData);
      
      // Ensure checks animation completes before showing results
      setTimeout(() => {
        setState('RESULTS');
      }, 500);

    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'An error occurred during parsing.');
      setState('ERROR');
    }
  };

  const resetAnalyzer = () => {
    setSelectedFile(null);
    setPastedText('');
    setTargetRole('');
    setErrorMessage('');
    setResults(null);
    setState('IDLE');
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A': return 'bg-[#1B8A4E]';
      case 'B': return 'bg-blue-600';
      case 'C': return 'bg-amber-600';
      case 'D': return 'bg-red-600';
      case 'F':
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <GlassCard variant="partnership" className="p-8 md:p-12 w-full shadow-lg">
      <AnimatePresence mode="wait">
        
        {/* State 1: IDLE */}
        {state === 'IDLE' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col space-y-8"
          >
            <div className="text-center space-y-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#FCC509]/10 text-[#17171D] border border-[#FCC509]/30 uppercase tracking-widest">
                AI Career Tools
              </span>
              <h2 className="font-syne font-bold text-2xl md:text-4xl text-[#17171D]">
                Get Your Free Resume Score
              </h2>
              <p className="font-nunito text-[#3D3D45] text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                Our AI analyzes your resume against 14 hiring criteria used by Indian tech recruiters in 2026. Upload yours and see where you stand.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Side: Upload zone */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#17171D]/15 hover:border-[#FCC509] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 bg-white/50 h-[220px]"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <UploadCloud size={48} className="text-[#6B6B75] mb-4" />
                {selectedFile ? (
                  <div className="text-center flex flex-col items-center">
                    <FileText size={24} className="text-[#1B8A4E] mb-2" />
                    <span className="text-sm font-semibold font-nunito truncate max-w-[200px]">
                      {selectedFile.name}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Click to Change
                    </span>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm font-semibold font-nunito text-[#17171D]">
                      Drag & Drop your PDF resume here
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PDF formats only (max 5MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Right Side: Plain Text Area Paste */}
              <div className="flex flex-col space-y-2 h-[220px]">
                <label className="text-xs font-bold uppercase tracking-wider text-[#6B6B75]">
                  Or Paste Resume Text
                </label>
                <textarea
                  className="w-full h-full p-4 rounded-2xl border border-[#17171D]/15 focus:outline-none focus:border-[#FCC509] bg-white/50 text-sm font-nunito leading-relaxed resize-none"
                  placeholder="Paste the plain text of your resume here..."
                  value={pastedText}
                  onChange={(e) => setPastedText(e.target.value)}
                  disabled={!!selectedFile}
                />
              </div>

            </div>

            {/* Target Role & Action buttons */}
            <div className="pt-6 border-t border-[#17171D]/5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
              <div className="flex-1 max-w-sm flex flex-col space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#6B6B75]">
                  Target Profile (Optional)
                </label>
                <select
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="p-3.5 rounded-xl border border-[#17171D]/15 focus:outline-none focus:border-[#FCC509] bg-white font-nunito text-sm text-[#17171D]"
                >
                  <option value="web_development">Web Development</option>
                  <option value="data_science">Data Science and AI</option>
                  <option value="cyber_security">Cyber Security</option>
                  <option value="machine_learning">Machine Learning</option>
                  <option value="graphic_design">Graphic Designing</option>
                  <option value="digital_marketing">Digital Marketing</option>
                </select>
              </div>
              <CTAButton
                variant="primary"
                size="lg"
                onClick={executeAnalysis}
                className="w-full md:w-auto self-end"
              >
                Analyze My Resume
              </CTAButton>
            </div>

          </motion.div>
        )}

        {/* State 2: LOADING */}
        {state === 'LOADING' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 space-y-8"
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-[#FCC509]/20 border-t-[#FCC509] rounded-full animate-spin"></div>
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="font-syne font-bold text-xl text-[#17171D]">
                Analyzing against 14 hiring criteria...
              </h3>
              <p className="font-nunito text-sm text-[#6B6B75]">
                Evaluating formatting, semantic density, date structures, and alignment scores.
              </p>
            </div>

            {/* Simulated Checks Progress display */}
            <div className="w-full max-w-md bg-white/40 p-6 rounded-2xl border border-gray-100 flex flex-col space-y-3 font-nunito text-xs text-[#3D3D45]">
              {checks.map((check, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  {idx < checkCount ? (
                    <CheckCircle2 size={14} className="text-[#1B8A4E] shrink-0" />
                  ) : idx === checkCount ? (
                    <RefreshCw size={14} className="text-[#FCC509] shrink-0 animate-spin" />
                  ) : (
                    <div className="w-3.5 h-3.5 border border-gray-300 rounded-full shrink-0"></div>
                  )}
                  <span className={`${idx <= checkCount ? 'text-[#17171D] font-semibold' : 'text-gray-400'}`}>
                    {check}
                  </span>
                </div>
              ))}
            </div>

          </motion.div>
        )}

        {/* State 3: RESULTS */}
        {state === 'RESULTS' && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col space-y-10"
          >
            {/* Top Score Banner block */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#17171D]/10">
              <div className="flex flex-col space-y-1 text-center md:text-left">
                <span className="text-xs font-nunito font-bold text-[#6B6B75] uppercase tracking-wider">
                  Analysis Complete for
                </span>
                <h3 className="font-syne font-bold text-2xl md:text-3xl text-[#17171D]">
                  {results.data.candidate}
                </h3>
              </div>
              {/* Large Score Indicator */}
              <div className="flex items-center space-x-6 bg-white/80 p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-syne font-bold text-3xl shadow-md ${getGradeColor(results.data.grade)}`}>
                  {results.data.grade}
                </div>
                <div className="flex flex-col">
                  <span className="font-syne font-bold text-3xl text-[#17171D]">
                    {results.data.resumeScore}<span className="text-sm font-semibold text-[#6B6B75]">/100</span>
                  </span>
                  <span className="text-[10px] font-nunito font-bold text-[#6B6B75] uppercase tracking-wider mt-0.5">
                    ATS Employability Index
                  </span>
                </div>
              </div>
            </div>

            {/* Text Summary Paragraph */}
            <div className="bg-[#FFEEF0] p-6 rounded-2xl border border-[#FCC509]/10">
              <p className="font-nunito text-[#17171D] text-sm md:text-base leading-relaxed italic">
                "{results.data.summary}"
              </p>
            </div>

            {/* Structural Audit Results Column (Checks passed / failed) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-4">
                <h4 className="font-syne font-bold text-base text-[#1B8A4E] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 size={18} /> Programmatic Checks Passed
                </h4>
                <div className="p-4 rounded-2xl bg-white/40 border border-gray-100 font-nunito text-xs text-[#3D3D45] flex items-center h-16">
                  Verify that structural blocks (Education, Experience, Technical Skills) are complete, parsed cleanly, and dates follow consistent formats.
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-syne font-bold text-base text-[#D93025] uppercase tracking-wider flex items-center gap-2">
                  <XCircle size={18} /> Identified Gaps
                </h4>
                <div className="p-4 rounded-2xl bg-white/40 border border-gray-100 flex flex-col space-y-2.5">
                  {results.data.analysis.failedFeedback.length > 0 ? (
                    results.data.analysis.failedFeedback.map((feedback, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-[#3D3D45] font-nunito">
                        <AlertCircle size={14} className="text-[#D93025] shrink-0 mt-0.5" />
                        <span>{feedback}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-[#1B8A4E] font-nunito font-semibold flex items-center gap-1.5 h-16">
                      <CheckCircle2 size={16} /> Spectacular. No major programmatic gaps detected in formatting, structure, or vocabulary!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Skills Gap tags */}
            <div className="pt-4 space-y-4">
              <h4 className="font-syne font-bold text-base text-[#17171D] uppercase tracking-wider">
                Extracted Skills Deficiencies
              </h4>
              <div className="flex flex-wrap gap-2">
                {results.data.skillsGap.length > 0 ? (
                  results.data.skillsGap.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-[#17171D] text-[#FFF9FA] text-xs font-nunito font-semibold rounded-lg shadow-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-500 italic">No missing core technical skills identified in reference to this target profile.</span>
                )}
              </div>
            </div>

            {/* Recommended Course dynamic card */}
            <div className="pt-8 border-t border-[#17171D]/10">
              <h4 className="font-syne font-bold text-base text-[#6B6B75] uppercase tracking-wider mb-6">
                Recommended Transformation Course
              </h4>
              <div className="p-8 bg-[#17171D] text-white rounded-glass-24 border border-gray-800 shadow-xl flex flex-col justify-between gap-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 bg-[#FCC509]/20 text-[#FCC509] border border-[#FCC509]/40 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
                      Relevance: {results.data.recommendedAction.matchRelevance} Match
                    </span>
                    <h3 className="font-syne font-bold text-xl md:text-2xl text-white">
                      {results.data.recommendedAction.courseTitle}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-400 font-nunito font-semibold">
                    Code: {results.data.recommendedAction.courseId}
                  </span>
                </div>

                <p className="font-nunito text-gray-300 text-sm leading-relaxed max-w-2xl">
                  {results.data.recommendedAction.reason}
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-gray-800">
                  <CTAButton
                    variant="primary"
                    size="md"
                    href={results.data.recommendedAction.ctaUrl}
                    className="w-full sm:w-auto"
                  >
                    View Curriculum & Register
                  </CTAButton>
                  <button
                    onClick={resetAnalyzer}
                    className="text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1.5 font-nunito py-2.5"
                  >
                    <RefreshCw size={12} /> Test Another Profile
                  </button>
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {/* State 4: ERROR */}
        {state === 'ERROR' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 space-y-6 text-center"
          >
            <div className="p-4 bg-red-50 text-[#D93025] rounded-full border border-red-200">
              <AlertCircle size={36} />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-syne font-bold text-xl text-[#17171D]">
                Analysis Encountered an Error
              </h3>
              <p className="font-nunito text-sm text-[#D93025] max-w-md mx-auto">
                {errorMessage}
              </p>
            </div>

            <CTAButton
              variant="secondary"
              size="md"
              onClick={resetAnalyzer}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} /> Try Again
            </CTAButton>

          </motion.div>
        )}

      </AnimatePresence>
    </GlassCard>
  );
};

export default ResumeAnalyzer;
