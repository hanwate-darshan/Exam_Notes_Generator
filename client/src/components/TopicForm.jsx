import React, { useEffect, useState } from 'react'
import { generateNotes } from '../services/api'
import { useDispatch } from 'react-redux'
import { updateCredits } from '../redux/userSlice'

function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState("")
  const [classLevel, setClassLevel] = useState("Class 11 Science")
  const [examType, setExamType] = useState("CBSE Board")
  const [revisionMode, setRevisionMode] = useState(false)
  const [includeDiagram, setIncludeDiagram] = useState(true)
  const [includeChart, setIncludeChart] = useState(true)
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState("")
  const dispatch = useDispatch()

  const quickTopics = [
    "Newton's Laws of Motion & Friction",
    "Photosynthesis Light Reactions",
    "Thermodynamics & Heat Engines",
    "Aldehydes, Ketones & Carboxylic Acids",
    "Calculus Definite Integration",
    "B.Tech Data Structures & Trees"
  ]

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic or chapter name to begin.")
      return
    }
    setError("")
    setLoading(true)
    setResult(null)
    try {
      const result = await generateNotes({
        topic,
        classLevel,
        examType,
        revisionMode,
        includeDiagram,
        includeChart
      })
      setResult(result.data)
      setLoading(false)

      if (typeof result.creditsLeft === "number") {
        dispatch(updateCredits(result.creditsLeft))
      }
    } catch (error) {
      console.error(error)
      setError(error.message || "Failed to fetch notes from server")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loading) {
      setProgress(0)
      setProgressText("")
      return
    }
    let value = 0

    const interval = setInterval(() => {
      value += Math.random() * 8

      if (value >= 95) {
        value = 95
        setProgressText("Finalizing high-yield study material…")
        clearInterval(interval)
      } else if (value > 70) {
        setProgressText("Curating YouTube video lectures & diagrams…")
      } else if (value > 40) {
        setProgressText("Calibrating question bank for target board…")
      } else {
        setProgressText("Synthesizing syllabus with Gemini AI…")
      }

      setProgress(Math.floor(value))
    }, 600)

    return () => clearInterval(interval)
  }, [loading])

  return (
    <div className="bg-white dark:bg-[#131926] rounded-2xl p-6 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] border border-slate-200/80 dark:border-white/10 space-y-4 transition-colors">
      
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Generate New Exam Revision Module
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span>Cost: <strong className="text-indigo-600 dark:text-indigo-400 font-bold">10 Credits</strong></span>
          <span>•</span>
          <span>Notes + Video Lectures + Flowcharts</span>
        </div>
      </div>

      {/* COMMAND SEARCH BAR + SELECTORS */}
      <div className="flex flex-col md:flex-row gap-3">
        
        {/* INPUT */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 text-base">
            🔍
          </div>
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !loading) handleSubmit() }}
            placeholder="Type any topic, chapter, or syllabus question (e.g. Newton Laws, Photosynthesis)..."
            disabled={loading}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white font-semibold text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-[#111622] transition placeholder-slate-400"
          />
        </div>

        {/* SELECTORS & CTA */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          
          <select 
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            disabled={loading}
            className="px-3.5 py-3.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="Class 10">Class 10</option>
            <option value="Class 11 Science">Class 11 Science</option>
            <option value="Class 12 Science">Class 12 Science</option>
            <option value="B.Tech Engineering">B.Tech Engineering</option>
            <option value="NEET Medical">NEET Medical</option>
            <option value="JEE Main & Adv">JEE Main & Adv</option>
          </select>

          <select 
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            disabled={loading}
            className="px-3.5 py-3.5 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="CBSE Board">CBSE Board</option>
            <option value="Maharashtra State Board">State Board</option>
            <option value="ICSE / ISC">ICSE / ISC</option>
            <option value="Competitive Exam">Competitive Exam</option>
            <option value="University Semester">University Semester</option>
          </select>

          <button 
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25 active:scale-95 transition cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> Processing...
              </span>
            ) : (
              <span>⚡ Generate Studio</span>
            )}
          </button>

        </div>

      </div>

      {/* QUICK SUGGESTIONS PILLS */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-slate-400 font-semibold mr-1">Quick Select:</span>
        {quickTopics.slice(0, 4).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTopic(t)}
            disabled={loading}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold transition cursor-pointer"
          >
            {t.split(" ")[0]} {t.split(" ")[1]}
          </button>
        ))}
      </div>

      {/* SMART FEATURE TOGGLES */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100 dark:border-white/5 text-xs font-semibold text-slate-600 dark:text-slate-400">
        <span className="text-slate-400">Features included:</span>
        
        <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 dark:hover:text-white select-none">
          <input 
            type="checkbox" 
            checked={includeDiagram}
            onChange={(e) => setIncludeDiagram(e.target.checked)}
            disabled={loading}
            className="rounded text-indigo-600 accent-indigo-600" 
          />
          <span>Mermaid Flowcharts</span>
        </label>
        
        <span>•</span>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 dark:hover:text-white select-none">
          <input 
            type="checkbox" 
            checked={includeChart}
            onChange={(e) => setIncludeChart(e.target.checked)}
            disabled={loading}
            className="rounded text-indigo-600 accent-indigo-600" 
          />
          <span>Weightage Analytics</span>
        </label>

        <span>•</span>

        <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900 dark:hover:text-white select-none">
          <input 
            type="checkbox" 
            checked={revisionMode}
            onChange={(e) => setRevisionMode(e.target.checked)}
            disabled={loading}
            className="rounded text-indigo-600 accent-indigo-600" 
          />
          <span>5-Min Cheat Sheet</span>
        </label>
      </div>

      {/* PROGRESS BAR */}
      {loading && (
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>{progressText}</span>
            <span className="mono text-indigo-600 dark:text-indigo-400">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default TopicForm
