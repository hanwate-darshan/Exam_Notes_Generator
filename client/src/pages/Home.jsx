import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

/* ─── EXAM BOARDS ─── */
const boards = ['CBSE Board', 'Maharashtra State Board', 'ICSE / ISC', 'JEE Main/Adv', 'NEET Medical', 'University / B.Tech']

function Home() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-[#09090B] dark:text-zinc-100 transition-colors duration-200">

      {/* NAVBAR */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 md:px-8 pt-2 pb-20 space-y-6">

        {/* ═══════════════════════════════════════════
            HERO CARD — BIG, BOLD, SEPARATED
        ═══════════════════════════════════════════ */}
        <section className="bg-white border-2 border-gray-900 rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_#000]
          dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[8px_8px_0px_rgba(255,255,255,0.12)] space-y-7 transition-colors">

          {/* Badges */}
          <div className="flex flex-wrap gap-2.5">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-50 border-2 border-indigo-200 text-indigo-700 dark:bg-indigo-950/70 dark:border-indigo-600 dark:text-indigo-300">
              ⚡ Powered by Gemini AI
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-50 border-2 border-red-200 text-red-700 dark:bg-red-950/70 dark:border-red-600 dark:text-red-300">
              🎥 YouTube Data API v3
            </span>
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 border-2 border-emerald-300 text-emerald-800 dark:bg-emerald-950/70 dark:border-emerald-600 dark:text-emerald-300">
              ✅ Exam Oriented 2026
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight uppercase">
              Master Any Exam with <br className="hidden md:block" />
              <span className="text-indigo-600 dark:text-indigo-400 underline decoration-wavy decoration-2">
                AI-Powered Notes
              </span>{" "}
              & Video Lectures
            </h1>
            <p className="max-w-2xl text-base md:text-lg font-semibold text-gray-600 dark:text-zinc-400 leading-relaxed">
              Transform your syllabus chapters into high-yield exam revision notes, interactive Mermaid flowcharts, weightage charts, and curated top YouTube lectures — in seconds.
            </p>
          </div>

          {/* Board chips */}
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-zinc-500">
              Supported Exams:
            </span>
            <div className="flex flex-wrap gap-2">
              {boards.map((board) => (
                <span key={board} className="px-3 py-1.5 rounded-xl text-xs font-extrabold bg-gray-50 border-2 border-gray-900 shadow-[2px_2px_0px_#000]
                  dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-200 dark:shadow-none">
                  {board}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => navigate("/notes")}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base md:text-lg border-2 border-gray-900 shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition flex items-center justify-center gap-3"
            >
              🚀 Open DarshAI Study Studio
              <span>➔</span>
            </button>
            <button
              onClick={() => navigate("/history")}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-gray-50 border-2 border-gray-900 text-gray-900 font-extrabold text-sm md:text-base shadow-[4px_4px_0px_#000]
                dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100 dark:shadow-none
                active:translate-x-0.5 active:translate-y-0.5 transition flex items-center justify-center gap-2"
            >
              📂 View Past Notes
            </button>
          </div>

        </section>

        {/* ═══════════════════════════════════════════
            SECTION 2: HOW IT WORKS — 3 STEPS
        ═══════════════════════════════════════════ */}
        <section className="space-y-5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight dark:text-white">
              How It Works
            </h2>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              3 Simple Steps
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { num: "01", emoji: "📝", title: "Enter Your Topic", desc: "Pick your class, board, and chapter. Our AI understands Indian exam patterns and syllabus structure." },
              { num: "02", emoji: "🤖", title: "AI Generates Everything", desc: "Gemini AI creates structured notes, flowcharts, questions & fetches matching YouTube lectures." },
              { num: "03", emoji: "⬇️", title: "Study & Download PDF", desc: "Review interactive content, toggle sections, watch video lectures, and export as PDF." }
            ].map((step) => (
              <div key={step.num}
                className="relative bg-white border-2 border-gray-900 rounded-3xl p-6 shadow-[5px_5px_0px_#000] space-y-3
                  dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[5px_5px_0px_rgba(255,255,255,0.1)] transition-colors">
                <span className="absolute top-3 right-5 text-5xl md:text-6xl font-black text-gray-100 dark:text-zinc-800 select-none pointer-events-none">
                  {step.num}
                </span>
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 border-2 border-gray-900 dark:bg-zinc-800 dark:border-zinc-600 flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000] dark:shadow-none">
                    {step.emoji}
                  </div>
                  <h3 className="text-lg font-black mt-3 dark:text-white">{step.title}</h3>
                  <p className="text-sm font-semibold text-gray-600 dark:text-zinc-400 leading-relaxed mt-1">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 3: BENTO FEATURES GRID — 4 BOLD CARDS
        ═══════════════════════════════════════════ */}
        <section className="space-y-5">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight dark:text-white">
              Why DarshAI Outperforms Generic AI
            </h2>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:block">
              Bento Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* CARD 1: EXAM NOTES */}
            <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000]
              dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[6px_6px_0px_rgba(255,255,255,0.1)] space-y-4 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 border-2 border-gray-900 dark:bg-indigo-950 dark:border-zinc-600 flex items-center justify-center text-2xl font-black shadow-[2px_2px_0px_#000] dark:shadow-none">
                📘
              </div>
              <h3 className="text-xl font-black dark:text-white">
                Structured & Board-Specific Exam Notes
              </h3>
              <p className="text-sm font-semibold text-gray-600 dark:text-zinc-400 leading-relaxed">
                Zero storytelling or bloated AI fluff. Notes are strictly divided into definitions, formulas, derivations, and high-yield examination bullet points calibrated for your specific board.
              </p>
              <div className="flex items-center gap-3 text-xs font-black text-indigo-600 dark:text-indigo-400">
                <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-200 rounded-lg dark:bg-indigo-950/60 dark:border-indigo-700">✓ High-Yield Rating</span>
                <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-200 rounded-lg dark:bg-indigo-950/60 dark:border-indigo-700">✓ Key Formulas</span>
              </div>
            </div>

            {/* CARD 2: YOUTUBE VIDEO LECTURES */}
            <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000]
              dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[6px_6px_0px_rgba(255,255,255,0.1)] space-y-4 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-red-100 border-2 border-gray-900 dark:bg-red-950 dark:border-zinc-600 flex items-center justify-center text-2xl font-black shadow-[2px_2px_0px_#000] dark:shadow-none">
                🎥
              </div>
              <h3 className="text-xl font-black dark:text-white">
                Curated YouTube Educational Lectures
              </h3>
              <p className="text-sm font-semibold text-gray-600 dark:text-zinc-400 leading-relaxed">
                Integrated with YouTube Data API v3. Generates matching video recommendations from top Indian and international educators right under your notes for instant concept clarification.
              </p>
              <div className="flex items-center gap-3 text-xs font-black text-red-600 dark:text-red-400">
                <span className="px-2.5 py-1 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/60 dark:border-red-700">✓ One-Shot Lectures</span>
                <span className="px-2.5 py-1 bg-red-50 border border-red-200 rounded-lg dark:bg-red-950/60 dark:border-red-700">✓ Top Educators</span>
              </div>
            </div>

            {/* CARD 3: MERMAID FLOWCHARTS */}
            <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000]
              dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[6px_6px_0px_rgba(255,255,255,0.1)] space-y-4 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 border-2 border-gray-900 dark:bg-emerald-950 dark:border-zinc-600 flex items-center justify-center text-2xl font-black shadow-[2px_2px_0px_#000] dark:shadow-none">
                📊
              </div>
              <h3 className="text-xl font-black dark:text-white">
                Mermaid Flowcharts & Weightage Analytics
              </h3>
              <p className="text-sm font-semibold text-gray-600 dark:text-zinc-400 leading-relaxed">
                Visual thinkers excel with DarshAI. Automatically renders step-by-step visual process maps, concept hierarchies, and chapter weightage distribution graphs.
              </p>
              <div className="flex items-center gap-3 text-xs font-black text-emerald-600 dark:text-emerald-400">
                <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg dark:bg-emerald-950/60 dark:border-emerald-700">✓ Interactive Mermaid</span>
                <span className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-lg dark:bg-emerald-950/60 dark:border-emerald-700">✓ Recharts Analytics</span>
              </div>
            </div>

            {/* CARD 4: CHEAT SHEETS */}
            <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_#000]
              dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[6px_6px_0px_rgba(255,255,255,0.1)] space-y-4 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-gray-900 dark:bg-amber-950 dark:border-zinc-600 flex items-center justify-center text-2xl font-black shadow-[2px_2px_0px_#000] dark:shadow-none">
                ⚡
              </div>
              <h3 className="text-xl font-black dark:text-white">
                5-Minute Active Recall Cheat Sheets
              </h3>
              <p className="text-sm font-semibold text-gray-600 dark:text-zinc-400 leading-relaxed">
                Exam tomorrow morning? Switch to Revision Mode to filter out long paragraphs and get one-line bullet points, laws, and formula sheets for high-speed retention.
              </p>
              <div className="flex items-center gap-3 text-xs font-black text-amber-700 dark:text-amber-400">
                <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg dark:bg-amber-950/60 dark:border-amber-700">✓ Instant PDF Export</span>
                <span className="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg dark:bg-amber-950/60 dark:border-amber-700">✓ Question Banks</span>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════
            SECTION 4: WELCOME BACK CTA
        ═══════════════════════════════════════════ */}
        <section className="bg-indigo-900 text-white border-2 border-gray-900 rounded-3xl p-8 md:p-12 shadow-[6px_6px_0px_#000]
          dark:bg-indigo-950 dark:border-zinc-600 dark:shadow-[6px_6px_0px_rgba(255,255,255,0.1)] space-y-5 text-center transition-colors">
          <p className="text-xs font-black uppercase tracking-widest text-indigo-300 dark:text-indigo-400">
            Welcome back, {userData?.name?.split(" ")[0] || "Student"} 👋
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase">
            Ready to Study Smarter?
          </h2>
          <p className="max-w-md mx-auto text-sm md:text-base font-semibold text-indigo-200 dark:text-indigo-300 leading-relaxed">
            Your AI study studio is waiting. Generate notes, watch curated lectures, and download revision material instantly.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate("/notes")}
              className="px-8 py-3.5 rounded-xl bg-white text-gray-900 hover:bg-gray-100 font-black text-base border-2 border-gray-900 shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition flex items-center gap-2"
            >
              🚀 Open Study Studio
            </button>
            <button
              onClick={() => navigate("/pricing")}
              className="px-6 py-3.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 font-black text-sm border-2 border-gray-900 shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition flex items-center gap-2"
            >
              💳 View Credit Plans
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default Home
