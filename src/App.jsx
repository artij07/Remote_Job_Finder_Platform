import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import SavedJobs from './pages/SavedJobs'
import Tracker from './pages/Tracker'
import Profile from './pages/Profile'

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Animated background orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </AppProvider>
  )
}
