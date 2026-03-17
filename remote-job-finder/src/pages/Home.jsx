import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import JobSearch from '../components/JobSearch'
import JobCard from '../components/JobCard'

const CATEGORIES = ['All', 'Tech', 'Cybersecurity', 'Marketing', 'Finance', 'Support', 'HR & Ops', 'Education', 'Writing']

const CAT_ICONS = {
  All: '🌍', Tech: '💻', Cybersecurity: '🛡️', Marketing: '📈',
  Finance: '💹', Support: '🤝', 'HR & Ops': '👥', Education: '🎓', Writing: '✍️'
}

export default function Home() {
  const { jobs } = useApp()
  const [filters, setFilters] = useState({ query: '', type: '' })
  const [category, setCategory] = useState('All')

  const filtered = jobs.filter(job => {
    const q = filters.query.toLowerCase()
    const matchQuery = !q || job.title.toLowerCase().includes(q) || job.company.toLowerCase().includes(q) || job.tags.some(t => t.toLowerCase().includes(q))
    const matchType = !filters.type || job.type === filters.type
    const matchCat = category === 'All' || job.category === category
    return matchQuery && matchType && matchCat
  })

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-white mb-3 tracking-tight">
          Find Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Remote Job</span>
        </h1>
        <p className="text-indigo-200 text-lg">{jobs.length} remote opportunities across {CATEGORIES.length - 1} categories</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <JobSearch onSearch={setFilters} />
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              category === cat
                ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-105'
                : 'glass text-indigo-200 hover:bg-white/10'
            }`}
          >
            <span>{CAT_ICONS[cat]}</span> {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-indigo-300">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-lg">No jobs match your search. Try different keywords.</p>
        </div>
      ) : (
        <>
          <p className="text-indigo-300 text-sm mb-4">{filtered.length} job{filtered.length !== 1 ? 's' : ''} found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        </>
      )}
    </div>
  )
}
