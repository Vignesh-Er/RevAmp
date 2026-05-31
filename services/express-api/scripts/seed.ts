import mongoose from 'mongoose';
import { SkillsReference } from '../../packages/db-schemas/schemas/skillsReference.schema';
import { Contact } from '../../packages/db-schemas/schemas/contact.schema';
import { Lead } from '../../packages/db-schemas/schemas/lead.schema';
import { Consent } from '../../packages/db-schemas/schemas/consent.schema';

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/digimation_flight_db';

const rolesData = [
  {
    jobRole: 'Full-Stack Web Developer MERN',
    requiredSkills: [
      'React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 
      'TypeScript', 'HTML/CSS', 'Git', 'RESTful APIs', 'Next.js'
    ],
    niceToHaveSkills: ['Docker', 'AWS', 'Tailwind CSS', 'Redux Toolkit', 'GraphQL'],
    recommendedCourseId: 'DF-WEB-02',
    recommendedCourseTier: 'advanced-master' as const
  },
  {
    jobRole: 'Data Scientist',
    requiredSkills: [
      'Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'SQL', 
      'Matplotlib', 'Statistics', 'Jupyter Notebooks', 'Git', 'Data Wrangling'
    ],
    niceToHaveSkills: ['Tableau', 'AWS', 'PowerBI', 'Deep Learning', 'PyTorch'],
    recommendedCourseId: 'DF-DS-02',
    recommendedCourseTier: 'advanced-master' as const
  },
  {
    jobRole: 'Machine Learning Engineer',
    requiredSkills: [
      'Python', 'TensorFlow', 'PyTorch', 'Scikit-Learn', 'SQL', 
      'Docker', 'Kubernetes', 'MLOps', 'Transformers', 'Git'
    ],
    niceToHaveSkills: ['MLflow', 'FastAPI', 'Vector Databases', 'AWS SageMaker', 'AutoML'],
    recommendedCourseId: 'DF-ML-02',
    recommendedCourseTier: 'advanced-master' as const
  },
  {
    jobRole: 'Cybersecurity Analyst',
    requiredSkills: [
      'Network Security', 'Wireshark', 'Kali Linux', 'Nmap', 'SIEM Tools', 
      'Ethical Hacking', 'SOC Operations', 'Incident Response', 'OWASP Top 10', 'Linux'
    ],
    niceToHaveSkills: ['Splunk', 'Metasploit', 'CISSP prep', 'CompTIA Security+', 'Burp Suite'],
    recommendedCourseId: 'DF-CYB-02',
    recommendedCourseTier: 'advanced-master' as const
  },
  {
    jobRole: 'Digital Marketing Specialist',
    requiredSkills: [
      'SEO', 'Google Analytics 4', 'Meta Ads Manager', 'Content Marketing', 'Google Ads', 
      'Social Media Strategy', 'Email Marketing', 'Copywriting', 'HubSpot CRM', 'PPC Campaigns'
    ],
    niceToHaveSkills: ['Brevo', 'Canva', 'A/B Testing', 'Growth Hacking', 'Semrush'],
    recommendedCourseId: 'DF-DM-02',
    recommendedCourseTier: 'advanced-master' as const
  },
  {
    jobRole: 'UI/UX Designer',
    requiredSkills: [
      'Figma', 'Wireframing', 'Prototyping', 'User Research', 'Visual Hierarchy', 
      'Adobe Photoshop', 'Adobe Illustrator', 'Information Architecture', 'Design Systems', 'Typography'
    ],
    niceToHaveSkills: ['Framer', 'Webflow', 'HTML/CSS', 'Usability Testing', 'Design Ops'],
    recommendedCourseId: 'DF-GD-02',
    recommendedCourseTier: 'advanced-master' as const
  },
  {
    jobRole: 'DevOps Engineer',
    requiredSkills: [
      'Docker', 'Kubernetes', 'AWS', 'CI/CD Pipelines', 'Linux Administration', 
      'Bash Scripting', 'Terraform', 'Nginx', 'Git', 'Monitoring & Logging'
    ],
    niceToHaveSkills: ['Ansible', 'Prometheus', 'Grafana', 'Google Cloud', 'Jenkins'],
    recommendedCourseId: 'DF-WEB-02',
    recommendedCourseTier: 'advanced-master' as const
  },
  {
    jobRole: 'AI/ML Product Manager',
    requiredSkills: [
      'Product Roadmap', 'Agile/Scrum', 'Market Research', 'Data Analysis', 'User Stories', 
      'AI Ethics', 'Intro to ML Pipelines', 'Product Analytics', 'SQL', 'UX Design Fundamentals'
    ],
    niceToHaveSkills: ['Jira', 'Confluence', 'A/B Testing', 'Design Thinking', 'Python Basics'],
    recommendedCourseId: 'DF-ML-01',
    recommendedCourseTier: 'foundation' as const
  }
];

const seedDatabase = async () => {
  try {
    console.log(`Connecting to database: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // 1. Wipe collections
    console.log('Wiping existing skills_reference records...');
    await SkillsReference.deleteMany({});
    
    // 2. Insert skills reference data
    console.log('Seeding skills_reference collection...');
    await SkillsReference.insertMany(rolesData);
    console.log(`Successfully seeded ${rolesData.length} job profiles.`);

    // 3. Create structural indexes
    console.log('Creating database indexes...');
    await SkillsReference.collection.createIndex({ jobRole: 1 }, { unique: true });
    await Contact.collection.createIndex({ createdAt: -1 });
    await Lead.collection.createIndex({ email: 1 });
    await Consent.collection.createIndex({ consentTimestamp: -1 });
    
    console.log('Indexes created successfully.');
    
    await mongoose.disconnect();
    console.log('Database seeding process completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error during database seeding process:', error);
    process.exit(1);
  }
};

seedDatabase();
