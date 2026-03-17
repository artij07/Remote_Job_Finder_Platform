import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AppContext = createContext()

// Mock jobs for demo (replace with real API call)
const MOCK_JOBS = [
  // Tech
  { id: 1,  title: 'Frontend Engineer',         company: 'Stripe',       location: 'Remote', type: 'Full-time', salary: '$120k–$160k', tags: ['React', 'TypeScript'],      rating: 4.7, logo: '💳', category: 'Tech' },
  { id: 2,  title: 'Backend Engineer',           company: 'Vercel',       location: 'Remote', type: 'Full-time', salary: '$130k–$170k', tags: ['Node.js', 'Go'],            rating: 4.8, logo: '▲',  category: 'Tech' },
  { id: 3,  title: 'Product Designer',           company: 'Linear',       location: 'Remote', type: 'Full-time', salary: '$100k–$140k', tags: ['Figma', 'UX'],             rating: 4.9, logo: '◆',  category: 'Tech' },
  { id: 4,  title: 'DevOps Engineer',            company: 'Fly.io',       location: 'Remote', type: 'Contract',  salary: '$110k–$150k', tags: ['Kubernetes', 'AWS'],       rating: 4.5, logo: '🚀', category: 'Tech' },
  { id: 5,  title: 'Full Stack Developer',       company: 'Supabase',     location: 'Remote', type: 'Full-time', salary: '$115k–$155k', tags: ['React', 'PostgreSQL'],     rating: 4.8, logo: '⚡', category: 'Tech' },
  { id: 6,  title: 'iOS Developer',              company: 'Notion',       location: 'Remote', type: 'Full-time', salary: '$125k–$165k', tags: ['Swift', 'SwiftUI'],        rating: 4.6, logo: '📝', category: 'Tech' },
  // Cybersecurity
  { id: 7,  title: 'Security Analyst',           company: 'CrowdStrike',  location: 'Remote', type: 'Full-time', salary: '$95k–$130k',  tags: ['SIEM', 'Threat Intel'],    rating: 4.8, logo: '🛡️', category: 'Cybersecurity' },
  { id: 8,  title: 'Penetration Tester',         company: 'Rapid7',       location: 'Remote', type: 'Contract',  salary: '$110k–$150k', tags: ['Kali Linux', 'OWASP'],     rating: 4.7, logo: '🔐', category: 'Cybersecurity' },
  { id: 9,  title: 'Cloud Security Engineer',    company: 'Palo Alto',    location: 'Remote', type: 'Full-time', salary: '$130k–$175k', tags: ['AWS', 'Zero Trust'],       rating: 4.9, logo: '☁️', category: 'Cybersecurity' },
  { id: 10, title: 'SOC Engineer',               company: 'Splunk',       location: 'Remote', type: 'Full-time', salary: '$90k–$120k',  tags: ['Splunk', 'Incident Resp'], rating: 4.6, logo: '🔎', category: 'Cybersecurity' },
  { id: 11, title: 'Malware Analyst',            company: 'Mandiant',     location: 'Remote', type: 'Full-time', salary: '$105k–$145k', tags: ['Reverse Eng', 'YARA'],     rating: 4.7, logo: '🦠', category: 'Cybersecurity' },
  { id: 12, title: 'GRC Analyst',                company: 'Deloitte',     location: 'Remote', type: 'Full-time', salary: '$85k–$115k',  tags: ['ISO 27001', 'NIST'],       rating: 4.5, logo: '📋', category: 'Cybersecurity' },
  { id: 13, title: 'AppSec Engineer',            company: 'GitHub',       location: 'Remote', type: 'Full-time', salary: '$125k–$165k', tags: ['SAST', 'DAST', 'DevSecOps'], rating: 4.8, logo: '🔒', category: 'Cybersecurity' },
  // Marketing
  { id: 14, title: 'Content Strategist',         company: 'HubSpot',      location: 'Remote', type: 'Full-time', salary: '$70k–$95k',   tags: ['SEO', 'Copywriting'],      rating: 4.6, logo: '✍️', category: 'Marketing' },
  { id: 15, title: 'Growth Marketer',            company: 'Mailchimp',    location: 'Remote', type: 'Full-time', salary: '$80k–$110k',  tags: ['Paid Ads', 'Analytics'],   rating: 4.5, logo: '📈', category: 'Marketing' },
  { id: 16, title: 'Social Media Manager',       company: 'Buffer',       location: 'Remote', type: 'Part-time', salary: '$50k–$70k',   tags: ['Instagram', 'TikTok'],     rating: 4.4, logo: '📱', category: 'Marketing' },
  // Finance
  { id: 17, title: 'Financial Analyst',          company: 'Brex',         location: 'Remote', type: 'Full-time', salary: '$90k–$120k',  tags: ['Excel', 'Forecasting'],    rating: 4.6, logo: '💹', category: 'Finance' },
  { id: 18, title: 'Crypto Compliance Officer',  company: 'Coinbase',     location: 'Remote', type: 'Full-time', salary: '$100k–$140k', tags: ['AML', 'KYC', 'DeFi'],      rating: 4.7, logo: '🪙', category: 'Finance' },
  // Customer Support
  { id: 19, title: 'Customer Success Manager',   company: 'Intercom',     location: 'Remote', type: 'Full-time', salary: '$65k–$90k',   tags: ['SaaS', 'Onboarding'],      rating: 4.5, logo: '🤝', category: 'Support' },
  { id: 20, title: 'Technical Support Engineer', company: 'Cloudflare',   location: 'Remote', type: 'Full-time', salary: '$70k–$95k',   tags: ['DNS', 'Networking'],       rating: 4.6, logo: '🌐', category: 'Support' },
  // HR & Operations
  { id: 21, title: 'HR Business Partner',        company: 'Deel',         location: 'Remote', type: 'Full-time', salary: '$75k–$100k',  tags: ['Recruiting', 'Culture'],   rating: 4.7, logo: '👥', category: 'HR & Ops' },
  { id: 22, title: 'Operations Manager',         company: 'Remote.com',   location: 'Remote', type: 'Full-time', salary: '$80k–$110k',  tags: ['Process', 'Automation'],   rating: 4.5, logo: '⚙️', category: 'HR & Ops' },
  // Education
  { id: 23, title: 'Curriculum Developer',       company: 'Coursera',     location: 'Remote', type: 'Contract',  salary: '$60k–$85k',   tags: ['eLearning', 'LMS'],        rating: 4.4, logo: '🎓', category: 'Education' },
  { id: 24, title: 'Online Tutor',               company: 'Preply',       location: 'Remote', type: 'Part-time', salary: '$30k–$60k',   tags: ['Teaching', 'English'],     rating: 4.6, logo: '📚', category: 'Education' },
  // Writing
  { id: 25, title: 'Technical Writer',           company: 'Atlassian',    location: 'Remote', type: 'Full-time', salary: '$80k–$110k',  tags: ['Docs', 'API Writing'],     rating: 4.7, logo: '🖊️', category: 'Writing' },
  { id: 26, title: 'UX Writer',                  company: 'Figma',        location: 'Remote', type: 'Full-time', salary: '$90k–$120k',  tags: ['Microcopy', 'Research'],   rating: 4.8, logo: '💬', category: 'Writing' },
]

export function AppProvider({ children }) {
  const [jobs] = useState(MOCK_JOBS)
  const [savedJobs, setSavedJobs] = useState(() => JSON.parse(localStorage.getItem('savedJobs') || '[]'))
  const [applications, setApplications] = useState(() => JSON.parse(localStorage.getItem('applications') || '[]'))
  const [resume, setResume] = useState(() => localStorage.getItem('resumeName') || null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null))
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => { localStorage.setItem('savedJobs', JSON.stringify(savedJobs)) }, [savedJobs])
  useEffect(() => { localStorage.setItem('applications', JSON.stringify(applications)) }, [applications])

  const toggleSave = (job) => {
    setSavedJobs(prev =>
      prev.find(j => j.id === job.id) ? prev.filter(j => j.id !== job.id) : [...prev, job]
    )
  }

  const addApplication = (job, status = 'Applied') => {
    setApplications(prev => {
      if (prev.find(a => a.jobId === job.id)) return prev
      return [...prev, { jobId: job.id, title: job.title, company: job.company, status, date: new Date().toLocaleDateString() }]
    })
  }

  const updateStatus = (jobId, status) => {
    setApplications(prev => prev.map(a => a.jobId === jobId ? { ...a, status } : a))
  }

  const uploadResume = (file) => {
    setResume(file.name)
    localStorage.setItem('resumeName', file.name)
  }

  return (
    <AppContext.Provider value={{ jobs, savedJobs, applications, resume, user, toggleSave, addApplication, updateStatus, uploadResume }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
