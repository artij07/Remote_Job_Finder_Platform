import React from 'react'
import { useApp } from '../context/AppContext'

const STATUS_COLORS = {
  Applied: 'bg-blue-100 text-blue-700',
  Interview: 'bg-yellow-100 text-yellow-700',
  Offer: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
}

export default function JobCard({ job }) {
  const { savedJobs, applications, toggleSave, addApplication } = useApp()
  const isSaved = savedJobs.find(j => j.id === job.id)
  const application = applications.find(a => a.jobId === job.id)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">
            {job.logo}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.company}</p>
          </div>
        </div>
        <button
          onClick={() => toggleSave(job)}
          aria-label={isSaved ? 'Unsave job' : 'Save job'}
          className={`text-xl transition-transform hover:scale-110 ${isSaved ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </button>
      </div>

      <div className="flex flex-wrap gap-2 text-xs">
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">📍 {job.location}</span>
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">⏱ {job.type}</span>
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">💰 {job.salary}</span>
      </div>

      <div className="flex flex-wrap gap-1">
        {job.tags.map(tag => (
          <span key={tag} className="bg-indigo-50 text-indigo-600 text-xs px-2 py-0.5 rounded-full">{tag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-1 text-sm text-amber-500">
          {'★'.repeat(Math.round(job.rating))}
          <span className="text-gray-500 ml-1">{job.rating}</span>
        </div>
        {application ? (
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${STATUS_COLORS[application.status]}`}>
            {application.status}
          </span>
        ) : (
          <button
            onClick={() => addApplication(job)}
            className="bg-brand text-white text-sm px-4 py-1.5 rounded-lg hover:bg-brand-dark transition-colors"
          >
            Apply
          </button>
        )}
      </div>
    </div>
  )
}
