import React, { useRef } from 'react'
import { useApp } from '../context/AppContext'

export default function ResumeUpload() {
  const { resume, uploadResume } = useApp()
  const inputRef = useRef()

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) uploadResume(file)
  }

  return (
    <div className="glass rounded-2xl p-6 flex flex-col items-center gap-4">
      <div className="w-16 h-16 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center text-3xl">📄</div>
      <div className="text-center">
        <h3 className="font-semibold text-white">Resume</h3>
        {resume
          ? <p className="text-sm text-green-400 mt-1">✓ {resume}</p>
          : <p className="text-sm text-indigo-300 mt-1">Upload your resume to apply faster</p>
        }
      </div>
      <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleChange} />
      <button
        onClick={() => inputRef.current.click()}
        className="w-full border-2 border-dashed border-indigo-400/50 text-indigo-300 rounded-xl py-2.5 text-sm font-medium hover:bg-indigo-500/10 transition-colors"
      >
        {resume ? 'Replace Resume' : 'Upload Resume'}
      </button>
    </div>
  )
}
