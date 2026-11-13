import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { generateNotes } from '../services/api'
import { useDispatch } from 'react-redux'
import { updateCredits } from '../redux/userSlice'

function TopicForm({ setResult, setLoading, loading, setError }) {
  const [topic, setTopic] = useState("")
  const [classLevel, setClassLevel] = useState("")
  const [examType, setExamType] = useState("")
  const [revisionMode, setRevisionMode] = useState(false)
  const [includeDiagram, setIncludeDiagram] = useState(true)
  const [includeChart, setIncludeChart] = useState(true)
  const [progress, setProgress] = useState(0)
  const [progressText, setProgressText] = useState("")
  const dispatch = useDispatch()

  const quickClasses = ["Class 10", "Class 11", "Class 12", "B.Tech/Engg", "NEET/JEE"]
  const quickExams = ["CBSE", "State Board", "ICSE", "JEE Main", "NEET"]

  const handleSubmit = async () => {
    if (!topic.trim()) {
      setError("Please enter the topic or chapter name")
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
        setProgressText("Finalizing high-yield exam material…")
        clearInterval(interval)
      } else if (value > 70) {
        setProgressText("Formatting diagrams, formulas & YouTube lectures…")
      } else if (value > 40) {
        setProgressText("Calibrating questions for target board…")
      } else {
        setProgressText("Analyzing syllabus with Gemini AI…")
      }

      setProgress(Math.floor(value))
    }, 600)

    return () => clearInterval(interval)
  }, [loading])

  return (
    <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000] space-y-6
      dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[6px_6px_0px_rgba(255,255,255,0.12)] transition-colors">
      
      {/* HEADER ROW */}
      <div className="flex flex-wrap items-center justify-between border-b-2 border-gray-100 dark:border-zinc-800 pb-4 gap-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 border-2 border-indigo-200 px-3 py-1 rounded-full dark:bg-indigo-950/70 dark:border-indigo-600 dark:text-indigo-300">
            Step 1: Input Details
          </span>
          <h2 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            Generate New Exam Notes
          </h2>
        </div>
        <span className="text-xs font-extrabold text-gray-500 dark:text-zinc-400 bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 px-3 py-1 rounded-lg">
          ⚡ 10 Credits / generation
        </span>
      </div>

      {/* INPUTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* TOPIC INPUT (FULL WIDTH) */}
        <div className="md:col-span-3 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-black uppercase tracking-wider text-gray-700 dark:text-zinc-300">
              Enter Topic or Chapter Name <span className="text-red-500">*</span>
            </label>
            <span className="text-[11px] font-bold text-gray-400">e.g. Newton Laws, Photosynthesis, Thermodynamics</span>
          </div>
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !loading) handleSubmit() }}
            placeholder="e.g. Newton's Laws of Motion & Friction"
            disabled={loading}
            className="w-full text-base md:text-lg font-bold p-4 bg-gray-50 border-2 border-gray-900 rounded-xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-100 text-gray-900 placeholder-gray-400 dark:bg-zinc-800/80 dark:border-zinc-600 dark:text-white dark:placeholder-zinc-500 dark:focus:ring-indigo-900 transition"
          />
        </div>

        {/* CLASS LEVEL */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-gray-700 dark:text-zinc-300">
            Class / Education Level
          </label>
          <input 
            type="text" 
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            placeholder="e.g. Class 11 Science"
            disabled={loading}
            className="w-full font-bold p-3.5 bg-gray-50 border-2 border-gray-900 rounded-xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-100 text-gray-900 placeholder-gray-400 dark:bg-zinc-800/80 dark:border-zinc-600 dark:text-white dark:placeholder-zinc-500 transition"
          />
          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickClasses.map((cls) => (
              <button
                key={cls}
                type="button"
                onClick={() => setClassLevel(cls)}
                className="px-2 py-0.5 text-[10px] font-black uppercase rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 transition"
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* TARGET EXAM / BOARD */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-wider text-gray-700 dark:text-zinc-300">
            Target Exam / Board
          </label>
          <input 
            type="text" 
            value={examType}
            onChange={(e) => setExamType(e.target.value)}
            placeholder="e.g. CBSE & JEE Main"
            disabled={loading}
            className="w-full font-bold p-3.5 bg-gray-50 border-2 border-gray-900 rounded-xl focus:outline-none focus:bg-white focus:ring-4 focus:ring-indigo-100 text-gray-900 placeholder-gray-400 dark:bg-zinc-800/80 dark:border-zinc-600 dark:text-white dark:placeholder-zinc-500 transition"
          />
          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickExams.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setExamType(ex)}
                className="px-2 py-0.5 text-[10px] font-black uppercase rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 transition"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="space-y-2 flex flex-col justify-end">
          <button 
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-black text-base border-2 border-gray-900 shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span> Generating...
              </span>
            ) : (
              <span>🚀 Generate Notes</span>
            )}
          </button>
        </div>

      </div>

      {/* SEPARATE CHUNKY TOGGLE BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        
        {/* REVISION MODE TOGGLE */}
        <label className={`flex items-center justify-between p-4 border-2 border-gray-900 rounded-2xl cursor-pointer transition select-none dark:border-zinc-600 ${
          revisionMode 
            ? "bg-amber-50 dark:bg-amber-950/40" 
            : "bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800/60 dark:hover:bg-zinc-800"
        }`}>
          <div>
            <p className="font-black text-sm text-gray-900 dark:text-white">⚡ Exam Revision Mode</p>
            <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Concise 5-min bullet points</p>
          </div>
          <input 
            type="checkbox" 
            checked={revisionMode} 
            onChange={(e) => setRevisionMode(e.target.checked)}
            disabled={loading}
            className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" 
          />
        </label>

        {/* MERMAID DIAGRAM TOGGLE */}
        <label className={`flex items-center justify-between p-4 border-2 border-gray-900 rounded-2xl cursor-pointer transition select-none dark:border-zinc-600 ${
          includeDiagram 
            ? "bg-indigo-50 dark:bg-indigo-950/40" 
            : "bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800/60 dark:hover:bg-zinc-800"
        }`}>
          <div>
            <p className="font-black text-sm text-gray-900 dark:text-white">📊 Include Mermaid Diagram</p>
            <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Flowchart & visual concept map</p>
          </div>
          <input 
            type="checkbox" 
            checked={includeDiagram} 
            onChange={(e) => setIncludeDiagram(e.target.checked)}
            disabled={loading}
            className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" 
          />
        </label>

        {/* WEIGHTAGE CHART TOGGLE */}
        <label className={`flex items-center justify-between p-4 border-2 border-gray-900 rounded-2xl cursor-pointer transition select-none dark:border-zinc-600 ${
          includeChart 
            ? "bg-emerald-50 dark:bg-emerald-950/40" 
            : "bg-gray-50 hover:bg-gray-100 dark:bg-zinc-800/60 dark:hover:bg-zinc-800"
        }`}>
          <div>
            <p className="font-black text-sm text-gray-900 dark:text-white">📈 Include Weightage Chart</p>
            <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400">Topic distribution graph</p>
          </div>
          <input 
            type="checkbox" 
            checked={includeChart} 
            onChange={(e) => setIncludeChart(e.target.checked)}
            disabled={loading}
            className="w-5 h-5 accent-indigo-600 rounded cursor-pointer" 
          />
        </label>

      </div>

      {/* PROGRESS BAR */}
      {loading && (
        <div className="space-y-2 pt-2 border-t-2 border-gray-100 dark:border-zinc-800">
          <div className="flex items-center justify-between text-xs font-black text-gray-700 dark:text-zinc-300">
            <span>{progressText}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 dark:bg-zinc-800 rounded-full border-2 border-gray-900 dark:border-zinc-600 overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default TopicForm
