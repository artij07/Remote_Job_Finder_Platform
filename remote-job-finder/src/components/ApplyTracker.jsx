import React from 'react'
import { useApp } from '../context/AppContext'

const STATUSES = ['Applied', 'Interview', 'Offer', 'Rejected']

const STATUS_COLORS = {
  Applied: 'bg-blue-100 text-blue-700',
  Interview: 'bg-yellow-100 text-yellow-700',
  Offer: 'bg-green-100 text-green-700',
  Rejected: 'bg-red-100 text-red-700',
}

export default function ApplyTracker() {
  const { applications, updateStatus } = useApp()

  if (!applications.length) {
    return (
      <div className="text-center py-16 text-indigo-300">
        <div className="text-5xl mb-3">📋</div>
        <p>No applications yet. Hit Apply on a job to track it here.</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left text-indigo-300">
            <th className="pb-3 font-medium">Job</th>
            <th className="pb-3 font-medium">Company</th>
            <th className="pb-3 font-medium">Date</th>
            <th className="pb-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {applications.map(app => (
            <tr key={app.jobId} className="hover:bg-white/5">
              <td className="py-3 font-medium text-white">{app.title}</td>
              <td className="py-3 text-indigo-300">{app.company}</td>
              <td className="py-3 text-indigo-400">{app.date}</td>
              <td className="py-3">
                <select
                  value={app.status}
                  onChange={e => updateStatus(app.jobId, e.target.value)}
                  className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand ${STATUS_COLORS[app.status]}`}
                >
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
