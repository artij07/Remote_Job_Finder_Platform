import React from 'react'
import { useApp } from '../context/AppContext'
import ApplyTracker from '../components/ApplyTracker'

const STATUS_COUNTS = (apps) => ({
  Applied: apps.filter(a => a.status === 'Applied').length,
  Interview: apps.filter(a => a.status === 'Interview').length,
  Offer: apps.filter(a => a.status === 'Offer').length,
  Rejected: apps.filter(a => a.status === 'Rejected').length,
})

export default function Tracker() {
  const { applications } = useApp()
  const counts = STATUS_COUNTS(applications)

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-white mb-1">Application Tracker</h1>
      <p className="text-indigo-300 mb-8">Track your job application pipeline</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Applied',   count: counts.Applied,   color: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',     icon: '📨' },
          { label: 'Interview', count: counts.Interview, color: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30', icon: '🗣️' },
          { label: 'Offer',     count: counts.Offer,     color: 'bg-green-500/20 text-green-300 border border-green-500/30',   icon: '🎉' },
          { label: 'Rejected',  count: counts.Rejected,  color: 'bg-red-500/20 text-red-300 border border-red-500/30',         icon: '❌' },
        ].map(({ label, count, color, icon }) => (
          <div key={label} className={`rounded-2xl p-5 ${color}`}>
            <div className="text-2xl mb-2">{icon}</div>
            <div className="text-3xl font-bold">{count}</div>
            <div className="text-sm font-medium mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <ApplyTracker />
      </div>
    </div>
  )
}
