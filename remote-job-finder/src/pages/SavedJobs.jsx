import React from 'react'
import { useApp } from '../context/AppContext'
import JobCard from '../components/JobCard'

export default function SavedJobs() {
  const { savedJobs } = useApp()

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-white mb-1">Saved Jobs</h1>
      <p className="text-indigo-300 mb-8">{savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved</p>
      {savedJobs.length === 0 ? (
        <div className="text-center py-20 text-indigo-300">
          <div className="text-6xl mb-4">★</div>
          <p className="text-lg">No saved jobs yet. Star a job to save it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedJobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  )
}
