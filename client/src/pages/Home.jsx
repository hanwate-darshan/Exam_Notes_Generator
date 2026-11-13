import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const boards = [
  'CBSE Board', 
  'Maharashtra State Board', 
  'ICSE / ISC', 
  'JEE Main & Adv', 
  'NEET Medical', 
  'University Engineering'
]

function Home() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900 dark:bg-[#0B0F17] dark:text-slate-100 transition-colors duration-200">
      
      {/* FLOATING NAVBAR */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24">

        {/* ═══════════════════════════════════════════
            HERO CARD: FOCUS STUDIO ACADEMIC WORKSPACE
        ═══════════════════════════════════════════ */}
        <section className="bg-white dark:bg-[#131926] rounded-3xl p-8 sm:p-14 shadow-[0_4px_30px_-5px_rgba(0,0,0,0.06)] border border-slate-200/80 dark:border-white/10 space-y-8 relative overflow-hidden transition-colors">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 relative z-10">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
              ⚡ Powered by Gemini AI & YouTube Data API
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
              Exam Oriented 2026 Edition
            </span>
          </div>

          {/* Headline & Subtitle */}
          <div className="space-y-4 max-w-3xl relative z-10">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.12] text-slate-900 dark:text-white">
              Master Any Exam with <br />
              <span className="text-indigo-600 dark:text-indigo-400">Precision AI Notes</span> & Curated Lectures
            </h1>
            <p className="text-base sm:text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              Transform syllabus chapters into structured high-yield revision notes, interactive Mermaid flowcharts, chapter marks weightage analytics, and top YouTube lectures in seconds.
            </p>
          </div>

          {/* Supported Exam Chips */}
          <div className="space-y-2.5 relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Supported Examination Boards:
            </span>
            <div className="flex flex-wrap gap-2">
              {boards.map((b) => (
                <span
                  key={b}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 shadow-sm"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 pt-2 relative z-10">
            <button
              onClick={() => navigate("/notes")}
              className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-lg shadow-indigo-600/25 active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🚀 Open DarshAI Study Desk</span>
              <span>➔</span>
            </button>
            <button
              onClick={() => navigate("/history")}
              className="px-6 py-4 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 font-bold text-sm shadow-sm active:scale-[0.98] transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>📂 View Past Archives</span>
            </button>
          </div>

        </section>

        {/* ═══════════════════════════════════════════
            HOW IT WORKS: 3 FOCUSED STEPS
        ═══════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
              How DarshAI Accelerates Your Revision
            </h2>
            <span className="text-xs font-semibold text-slate-400">
              3-Step Workflow
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                icon: "📝",
                title: "Enter Topic & Board",
                desc: "Type any syllabus chapter (e.g. Thermodynamics, Coordinate Geometry) and select your target class and exam pattern."
              },
              {
                step: "02",
                icon: "⚡",
                title: "AI & Video Synthesis",
                desc: "Gemini AI synthesizes high-yield notes, derivations, and questions, while YouTube Data API finds matching one-shot lectures."
              },
              {
                step: "03",
                icon: "⬇️",
                title: "Study, Recall & PDF",
                desc: "Review interactive Mermaid flowcharts, test yourself with question banks, watch curated videos, and export print-ready PDF."
              }
            ].map((s) => (
              <div
                key={s.step}
                className="bg-white dark:bg-[#131926] rounded-2xl p-6 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3 relative overflow-hidden"
              >
                <span className="text-3xl font-extrabold text-slate-200 dark:text-slate-800 absolute top-4 right-5 select-none pointer-events-none">
                  {s.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-lg font-bold">
                  {s.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{s.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            4 BENTO MODULE PREVIEWS
        ═══════════════════════════════════════════ */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 dark:text-white">
              The Study Suite Architecture
            </h2>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              All Included in 1 Generation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* CARD 1: STRUCTURED NOTES */}
            <div className="bg-white dark:bg-[#131926] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-lg">
                📘
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Board-Calibrated Structured Notes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Zero storytelling or bloated AI fluff. Divided into core definitions, mathematical derivations, formula vaults, and examiner-highlighted bullet points.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                <span>✓ High-Yield Rating</span>
                <span>•</span>
                <span>✓ Formula Vault</span>
              </div>
            </div>

            {/* CARD 2: YOUTUBE VIDEO LECTURES */}
            <div className="bg-white dark:bg-[#131926] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200/60 dark:border-red-800 text-red-600 dark:text-red-400 flex items-center justify-center text-lg">
                🎥
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Curated YouTube Video Shelf
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Integrated directly with YouTube Data API v3. Delivers 3 matching one-shot lectures from top educators with video duration and direct access right inside your desk.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-red-600 dark:text-red-400">
                <span>✓ Top Indian Educators</span>
                <span>•</span>
                <span>✓ 1-Click Access</span>
              </div>
            </div>

            {/* CARD 3: MERMAID FLOWCHARTS */}
            <div className="bg-white dark:bg-[#131926] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-lg">
                📊
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Mermaid Flowcharts & Weightage Analytics
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Visual thinkers excel with DarshAI. Automatically renders concept hierarchy process maps and Recharts marks weightage distribution graphs.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <span>✓ Interactive Mermaid Map</span>
                <span>•</span>
                <span>✓ Chapter Marks Graph</span>
              </div>
            </div>

            {/* CARD 4: RAPID RECALL CHEAT SHEET */}
            <div className="bg-white dark:bg-[#131926] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-800 text-amber-700 dark:text-amber-400 flex items-center justify-center text-lg">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                5-Minute Active Recall Cheat Sheets
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                Exam tomorrow morning? Switch to Rapid Recall mode to filter out lengthy explanations and review key laws, formulas, and common exam traps.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                <span>✓ Rapid Morning Recall</span>
                <span>•</span>
                <span>✓ Instant PDF Export</span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default Home
