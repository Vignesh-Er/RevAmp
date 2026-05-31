'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CourseCard from './CourseCard';
import { fadeUpReveal, bentoContainer, prefersReducedMotion } from '../animations/variants';

export const CourseSection: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'foundation' | 'advanced-master'>('foundation');

  const domains = [
    {
      id: 'cyber',
      domain: 'Cyber Security',
      foundation: {
        title: "Defend Digital Systems Before They're Breached",
        description: "Learn network security fundamentals, ethical hacking basics, and threat detection. Build the analytical mindset that every IT department needs protecting critical infrastructure.",
        skills: ['Network Security', 'Ethical Hacking', 'Threat Analysis'],
        duration: '3 months',
        ctaText: 'Start Foundation Track',
        ctaUrl: '/courses/cyber-security-foundation'
      },
      advanced: {
        title: "Become the Security Professional Companies Compete For",
        description: "Go deep into penetration testing, SIEM tools, SOC operations, incident response, and compliance frameworks. Graduate with industry certifications and a security portfolio built on real attack simulations.",
        skills: ['Penetration Testing', 'SOC Operations', 'SIEM Tools', 'Incident Response', 'Security Compliance'],
        duration: '6 months',
        ctaText: 'Join Advanced Master',
        ctaUrl: '/courses/cyber-security-advanced'
      }
    },
    {
      id: 'marketing',
      domain: 'Digital Marketing',
      foundation: {
        title: "Learn the Skills Behind Every Campaign You've Ever Clicked",
        description: "Master SEO, social media strategy, paid advertising basics, and content creation. Run real campaigns on real budgets with mentors who work in agencies today.",
        skills: ['SEO', 'Social Media Strategy', 'Content Marketing'],
        duration: '3 months',
        ctaText: 'Start Foundation Track',
        ctaUrl: '/courses/digital-marketing-foundation'
      },
      advanced: {
        title: "Build and Scale Campaigns That Drive Revenue",
        description: "Advanced performance marketing, Google Ads, Meta Ads, analytics attribution modeling, marketing automation, and influencer strategy. Graduate managing real client campaigns with verified ROAS outcomes.",
        skills: ['Performance Marketing', 'Google and Meta Ads', 'Marketing Automation', 'Analytics Attribution', 'Influencer Strategy'],
        duration: '6 months',
        ctaText: 'Join Advanced Master',
        ctaUrl: '/courses/digital-marketing-advanced'
      }
    },
    {
      id: 'design',
      domain: 'Graphic Designing',
      foundation: {
        title: "Design Work You're Actually Proud to Put Your Name On",
        description: "Learn visual design principles, Figma, Adobe tools, and brand identity creation from working designers. Build a portfolio that gets you noticed in a crowded field.",
        skills: ['Figma', 'Brand Identity', 'Visual Hierarchy'],
        duration: '3 months',
        ctaText: 'Start Foundation Track',
        ctaUrl: '/courses/graphic-design-foundation'
      },
      advanced: {
        title: "Design at the Standard That Agencies Pay For",
        description: "Motion graphics, UI/UX design systems, client-facing presentation, and advanced Figma prototyping. Graduate with a portfolio reviewed by senior designers and connections to active hiring studios.",
        skills: ['Motion Graphics', 'UI/UX Systems', 'Figma Prototyping', 'Client Presentation', 'Design Ops'],
        duration: '6 months',
        ctaText: 'Join Advanced Master',
        ctaUrl: '/courses/graphic-design-advanced'
      }
    },
    {
      id: 'data',
      domain: 'Data Science and AI',
      foundation: {
        title: "Understand Data. Make Decisions That Matter.",
        description: "Python fundamentals, data wrangling, visualization, and introductory machine learning. No prior coding required. Build real datasets into real insights over 12 weeks.",
        skills: ['Python', 'Data Visualization', 'Intro ML'],
        duration: '3 months',
        ctaText: 'Start Foundation Track',
        ctaUrl: '/courses/data-science-foundation'
      },
      advanced: {
        title: "Build AI Systems That Solve Real Business Problems",
        description: "Advanced ML algorithms, deep learning, NLP, model deployment on cloud infrastructure, and MLOps practices. Graduate with deployed models, a Kaggle profile, and interviews with AI-first companies.",
        skills: ['Deep Learning', 'NLP', 'MLOps', 'Cloud Deployment', 'Model Optimization'],
        duration: '6 months',
        ctaText: 'Join Advanced Master',
        ctaUrl: '/courses/data-science-advanced'
      }
    },
    {
      id: 'web',
      domain: 'Web Development',
      foundation: {
        title: "Build Your First Real Web Application From Scratch",
        description: "HTML, CSS, JavaScript, and React fundamentals through hands-on project builds. Every concept lands in a real file, in a real browser, solving a real design problem.",
        skills: ['HTML/CSS', 'JavaScript', 'React Basics'],
        duration: '3 months',
        ctaText: 'Start Foundation Track',
        ctaUrl: '/courses/web-development-foundation'
      },
      advanced: {
        title: "Become a Full-Stack Engineer That Product Teams Fight Over",
        description: "MERN stack mastery, system design, API architecture, authentication, deployment pipelines, and real client project experience. Graduate with GitHub activity that speaks for itself.",
        skills: ['MERN Stack', 'System Design', 'API Architecture', 'Auth and Security', 'CI/CD'],
        duration: '6 months',
        ctaText: 'Join Advanced Master',
        ctaUrl: '/courses/web-development-advanced'
      }
    },
    {
      id: 'ml',
      domain: 'Machine Learning',
      foundation: {
        title: "Make Machines Learn From Your Data",
        description: "Supervised and unsupervised learning, scikit-learn, model evaluation, and practical feature engineering. Build your first ML pipeline in week two, not week ten.",
        skills: ['Supervised Learning', 'scikit-learn', 'Feature Engineering'],
        duration: '3 months',
        ctaText: 'Start Foundation Track',
        ctaUrl: '/courses/machine-learning-foundation'
      },
      advanced: {
        title: "Engineer Machine Learning Systems at Production Scale",
        description: "Transformer architectures, reinforcement learning, AutoML, LLMOps, vector databases, and real enterprise ML system design. Graduate ready for ML Engineering roles at product companies.",
        skills: ['Transformers', 'LLMOps', 'Vector Databases', 'AutoML', 'Reinforcement Learning'],
        duration: '6 months',
        ctaText: 'Join Advanced Master',
        ctaUrl: '/courses/machine-learning-advanced'
      }
    }
  ];

  return (
    <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto" id="courses">
      
      {/* Tab Header Section */}
      <motion.div
        variants={fadeUpReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: '-80px' }}
        className="flex flex-col items-center text-center space-y-6 mb-16"
      >
        <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-[#FCC509]/10 text-[#17171D] border border-[#FCC509]/30 uppercase tracking-widest">
          Course Catalog
        </span>
        <h2 className="font-syne font-bold text-3xl md:text-5xl text-[#17171D] max-w-2xl leading-tight">
          Programs Built for the Job Market, Not the Classroom
        </h2>
        
        {/* Tier Switcher Controls */}
        <div className="flex bg-[#FFEEF0] p-1.5 rounded-xl border border-[#17171D]/5">
          <button
            onClick={() => setActiveTier('foundation')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTier === 'foundation'
                ? 'bg-[#17171D] text-white shadow-sm'
                : 'text-[#6B6B75] hover:text-[#17171D]'
            }`}
          >
            Foundation Track (3 Months)
          </button>
          <button
            onClick={() => setActiveTier('advanced-master')}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTier === 'advanced-master'
                ? 'bg-[#17171D] text-white shadow-sm'
                : 'text-[#6B6B75] hover:text-[#17171D]'
            }`}
          >
            Advanced Master Track (6 Months)
          </button>
        </div>
      </motion.div>

      {/* Dynamic Grid using AnimatePresence for Tab Switching Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTier}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={prefersReducedMotion() ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {domains.map((item) => {
            const data = activeTier === 'foundation' ? item.foundation : item.advanced;
            return (
              <CourseCard
                key={item.id}
                domain={item.domain}
                tier={activeTier}
                title={data.title}
                description={data.description}
                skills={data.skills}
                duration={data.duration}
                ctaText={data.ctaText}
                ctaUrl={data.ctaUrl}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>

    </section>
  );
};

export default CourseSection;
