import React, { useState } from 'react'
import { motion } from "motion/react"
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
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-[#09090B] dark:text-zinc-100 transition-colors duration-200">
      
      {/* GLOBAL BOLD NAVBAR */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-2 pb-20 space-y-6">

        {/* TOPIC FORM CARD */}
        <section>
          <TopicForm 
            loading={loading} 
            setResult={setResult} 
            setLoading={setLoading} 
            setError={setError} 
          />
        </section>

        {/* ERROR MESSAGE CARD */}
        {error && (
          <div className="p-4 bg-red-50 border-2 border-red-500 rounded-2xl text-red-700 font-black text-sm flex items-center gap-3 dark:bg-red-950/50 dark:text-red-300">
            <span className="text-xl">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* EMPTY STATE */}
        {!result && !loading && (
          <div className="bg-white border-2 border-dashed border-gray-400 rounded-3xl p-12 text-center space-y-3 dark:bg-[#141416] dark:border-zinc-700">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border-2 border-gray-900 mx-auto flex items-center justify-center text-3xl shadow-[3px_3px_0px_#000] dark:bg-zinc-800 dark:border-zinc-600 dark:shadow-none">
              📘
            </div>
            <h3 className="text-lg font-black uppercase text-gray-900 dark:text-white">
              No Notes Generated Yet
            </h3>
            <p className="text-xs md:text-sm font-semibold text-gray-500 dark:text-zinc-400 max-w-md mx-auto">
              Enter a chapter or topic above, choose your class and exam board, then click &quot;Generate Notes&quot; to build high-yield revision material.
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

      <Footer />
    </div>
  )
}

export default Notes
