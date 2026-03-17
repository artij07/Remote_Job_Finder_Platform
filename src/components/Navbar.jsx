import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const links = [
  { to: '/', label: 'Search' },
  { to: '/saved', label: 'Saved' },
  { to: '/tracker', label: 'Tracker' },
  { to: '/profile', label: 'Profile' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { savedJobs, applications } = useApp()

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white">
          <span>🌍</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">RemoteFind</span>
        </Link>
        <div className="flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === to
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-indigo-200 hover:bg-white/10'
              }`}
            >
              {label}
              {label === 'Saved' && savedJobs.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {savedJobs.length}
                </span>
              )}
              {label === 'Tracker' && applications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {applications.length}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
