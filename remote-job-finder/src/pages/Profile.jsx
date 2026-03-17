import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import ResumeUpload from '../components/ResumeUpload'
import { supabase } from '../lib/supabase'

export default function Profile() {
  const { user, savedJobs, applications } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = user
      ? await supabase.auth.signOut()
      : await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    setLoading(false)
  }

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-white mb-1">Profile</h1>
      <p className="text-indigo-300 mb-8">Manage your account and resume</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Stats */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-4">Your Activity</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-500/20 border border-indigo-500/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-indigo-300">{savedJobs.length}</div>
                <div className="text-sm text-indigo-400">Saved Jobs</div>
              </div>
              <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                <div className="text-2xl font-bold text-green-300">{applications.length}</div>
                <div className="text-sm text-green-400">Applications</div>
              </div>
            </div>
          </div>

          {/* Auth */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-4">
              {user ? `Signed in as ${user.email}` : 'Sign In'}
            </h2>
            {!user && (
              <form onSubmit={handleAuth} className="space-y-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-indigo-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/10 border border-white/20 text-white placeholder-indigo-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                {message && <p className="text-red-400 text-sm">{message}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Sign In'}
                </button>
              </form>
            )}
            {user && (
              <button
                onClick={handleAuth}
                className="bg-red-500/20 text-red-300 border border-red-500/30 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-500/30 transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>

        <div>
          <ResumeUpload />
        </div>
      </div>
    </div>
  )
}
