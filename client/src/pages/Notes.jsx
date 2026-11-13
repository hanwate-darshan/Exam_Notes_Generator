import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import TopicForm from '../components/TopicForm'
import Sidebar from '../components/Sidebar'
import FinalResult from '../components/FinalResult'

function Notes() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState("")

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900 dark:bg-[#0B0F17] dark:text-slate-100 transition-colors duration-200">
      
      {/* GLOBAL NAVBAR */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24">

        {/* TOP COMMAND STUDIO FORM */}
        <section>
          <TopicForm 
            loading={loading} 
            setResult={setResult} 
            setLoading={setLoading} 
            setError={setError} 
          />
        </section>

        {/* ERROR CARD */}
        {error && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 rounded-2xl text-rose-700 dark:text-rose-300 font-semibold text-xs sm:text-sm flex items-center gap-3">
            <span className="text-lg">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* EMPTY STATE */}
        {!result && !loading && (
          <div className="bg-white dark:bg-[#131926] border border-dashed border-slate-300 dark:border-white/10 rounded-3xl p-12 text-center space-y-3 transition-colors">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 mx-auto flex items-center justify-center text-2xl font-bold shadow-sm">
              📘
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Your Study Desk is Ready
            </h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Enter any syllabus chapter above, select your exam board, and generate structured notes, YouTube video lectures, and question banks.
            </p>
          </div>
        )}

        {/* RESULT WORKSPACE */}
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            <div className="lg:col-span-1">
              <Sidebar result={result} />
            </div>
            <div className="lg:col-span-3">
              <FinalResult result={result} />
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default Notes
