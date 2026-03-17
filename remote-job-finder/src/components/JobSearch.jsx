import React, { useState } from 'react'

export default function JobSearch({ onSearch }) {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ query, type })
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-4 flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        placeholder="Job title, skill, or company..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="flex-1 bg-white/10 border border-white/20 text-white placeholder-indigo-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <select
        value={type}
        onChange={e => setType(e.target.value)}
        className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="" className="bg-gray-800">All Types</option>
        <option value="Full-time" className="bg-gray-800">Full-time</option>
        <option value="Contract" className="bg-gray-800">Contract</option>
        <option value="Part-time" className="bg-gray-800">Part-time</option>
      </select>
      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors shadow-lg shadow-indigo-500/30"
      >
        Search
      </button>
    </form>
  )
}
