import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MermaidSetup from './MermaidSetup'
import RechartSetUp from './RechartSetUp'
import { downloadPdf } from '../services/api'

const markDownComponent = {
  h1: ({ children }) => (
    <h1 className="text-xl md:text-2xl font-bold text-indigo-700 dark:text-indigo-400 mt-6 mb-3 border-b border-slate-200 dark:border-white/10 pb-2 tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mt-5 mb-2.5">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mt-4 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3 font-normal">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc ml-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-3">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal ml-5 space-y-1.5 text-sm text-slate-700 dark:text-slate-300 mb-3">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="marker:text-indigo-600 dark:marker:text-indigo-400">{children}</li>
  ),
  code: ({ children }) => (
    <code className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800/80 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-semibold border border-slate-200/60 dark:border-white/10">
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="p-3.5 bg-indigo-50/60 dark:bg-indigo-950/30 border-l-3 border-indigo-600 rounded-r-xl text-sm text-slate-800 dark:text-slate-200 my-3">
      {children}
    </blockquote>
  )
}

function FinalResult({ result }) {
  const [activeTab, setActiveTab] = useState("notes")
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [revealedAnswers, setRevealedAnswers] = useState({})

  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long ||
    !result.revisionPoints
  ) {
    return null
  }

  const handleCopy = () => {
    const textToCopy = typeof result.notes === "string" ? result.notes : JSON.stringify(result.notes)
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = async () => {
    try {
      setDownloading(true)
      await downloadPdf(result)
    } catch (err) {
      alert("Failed to download PDF. Please try again.")
    } finally {
      setDownloading(false)
    }
  }

  const toggleAnswer = (key) => {
    setRevealedAnswers(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const youtubeVideos = result.youtubeVideos || []

  return (
    <div className="space-y-6">

      {/* ═══════════════════════════════════════════
          ACTIVE CHAPTER BANNER (GRADIENT HIGH-YIELD)
      ═══════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                {result.classLevel || "Class 11/12"} • {result.examType || "Comprehensive"}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-200 border border-rose-400/30">
                High-Yield Examination Module
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {result.topic || "Examination Revision Notes"}
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 max-w-2xl leading-relaxed">
              Complete academic study desk. Structured notes, curated video shelf, interactive flowchart, and marking scheme question bank.
            </p>
          </div>

          <!-- ACTIONS -->
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>{copied ? "✓" : "📋"}</span>
              <span>{copied ? "Copied!" : "Copy Notes"}</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-500 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/30 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>{downloading ? "⏳" : "⬇️"}</span>
              <span>{downloading ? "Exporting..." : "Download PDF"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STUDY DOCK: SEGMENTED VIEW SWITCHER TABS
      ═══════════════════════════════════════════ */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2 gap-4">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "notes"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-[#131926] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            📘 Structured Notes
          </button>

          {youtubeVideos.length > 0 && (
            <button
              onClick={() => setActiveTab("videos")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "videos"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-[#131926] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              <span>🎥</span>
              <span>YouTube Lectures ({youtubeVideos.length})</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab("recall")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "recall"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-[#131926] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            ⚡ 5-Min Cheat Sheet
          </button>

          {result.diagram && (
            <button
              onClick={() => setActiveTab("flowchart")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "flowchart"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-[#131926] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              📊 Visual Concept Map
            </button>
          )}

          <button
            onClick={() => setActiveTab("questions")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === "questions"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-[#131926] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            ❓ Solved Exam Bank
          </button>

          {result.charts && result.charts.length > 0 && (
            <button
              onClick={() => setActiveTab("charts")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === "charts"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-[#131926] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              }`}
            >
              📈 Marks Weightage
            </button>
          )}
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Ready for Exam Prep
        </div>
      </div>

      {/* ============================================================ */}
      <!-- TAB 1: STRUCTURED NOTES CONTENT                              -->
      {/* ============================================================ */}
      {activeTab === "notes" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#131926] rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-white/10 space-y-5 transition-colors">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Detailed Examination Material
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
                Gemini AI 3.5
              </span>
            </div>

            <div className="text-slate-800 dark:text-slate-200">
              <ReactMarkdown components={markDownComponent}>
                {typeof result.notes === "string" ? result.notes : JSON.stringify(result.notes)}
              </ReactMarkdown>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================ */}
      <!-- TAB 2: YOUTUBE VIDEO LECTURES SHELF                          -->
      {/* ============================================================ */}
      {activeTab === "videos" && youtubeVideos.length > 0 && (
        <div className="space-y-6">
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Curated Educational Video Shelf</h3>
              <p className="text-xs text-slate-500">Top-rated Indian and international lecture series matching this syllabus chapter</p>
            </div>
            <span className="px-3 py-1 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 text-xs font-bold rounded-lg">
              YouTube Data API Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {youtubeVideos.map((video, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#131926] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3 p-4 flex flex-col justify-between transition-colors"
              >
                <div className="space-y-3">
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center text-sm pl-0.5 shadow-lg">
                        ▶
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                      {video.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      📺 {video.channelTitle}
                    </p>
                  </div>
                </div>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1.5 shadow-sm shadow-red-600/30 cursor-pointer"
                >
                  <span>Watch on YouTube</span>
                  <span>➔</span>
                </a>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ============================================================ */}
      <!-- TAB 3: 5-MIN CHEAT SHEET                                     -->
      {/* ============================================================ */}
      {activeTab === "recall" && (
        <div className="bg-white dark:bg-[#131926] rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-white/10 space-y-4 transition-colors">
          <div>
            <span className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded-lg text-xs font-bold">
              ⚡ 5-Minute Rapid Recall
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">Exam Morning Cheat Sheet</h3>
            <p className="text-xs text-slate-500">Filter out long explanations — focus exclusively on core laws, definitions, and rules.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {result.revisionPoints.map((point, index) => (
              <div
                key={index}
                className="p-4 bg-slate-50 dark:bg-[#111622] rounded-xl border border-slate-200/60 dark:border-white/5 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400">Key Takeaway</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed pl-7">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      <!-- TAB 4: VISUAL CONCEPT MAP (MERMAID)                          -->
      {/* ============================================================ */}
      {activeTab === "flowchart" && result.diagram && (
        <div className="bg-white dark:bg-[#131926] rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-white/10 space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Interactive Concept Hierarchy</h3>
              <p className="text-xs text-slate-500">Auto-generated visual map rendered with Mermaid JS</p>
            </div>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">Mermaid Engine</span>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-[#111622] rounded-xl border border-slate-200/60 dark:border-white/5 overflow-x-auto flex justify-center">
            <MermaidSetup diagram={result.diagram} />
          </div>
        </div>
      )}

      {/* ============================================================ */}
      <!-- TAB 5: SOLVED EXAM BANK WITH INTERACTIVE REVEAL              -->
      {/* ============================================================ */}
      {activeTab === "questions" && (
        <div className="space-y-4">
          
          {/* 2 MARKS QUESTIONS */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Part A: 2 Marks Short Conceptual Questions
            </h4>
            <div className="space-y-3">
              {result.questions.short.map((q, i) => {
                const isRevealed = revealedAnswers[`short-${i}`]
                return (
                  <div
                    key={i}
                    className="bg-white dark:bg-[#131926] rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded text-xs font-bold">
                        2 MARKS
                      </span>
                      <span className="text-xs text-slate-400">Conceptual Reasoning</span>
                    </div>

                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      Q{i + 1}: {q.question}
                    </h5>

                    <div>
                      <button
                        onClick={() => toggleAnswer(`short-${i}`)}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition cursor-pointer"
                      >
                        {isRevealed ? "Hide Marking Scheme 👁️" : "Reveal Board Marking Scheme 👁️"}
                      </button>

                      {isRevealed && (
                        <div className="mt-3 p-3.5 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/40 rounded-xl text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
                          <strong>Examiner Solution:</strong> {q.answer}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 5 MARKS QUESTIONS */}
          <div className="space-y-3 pt-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Part B: 5 Marks Long Derivations & Numericals
            </h4>
            <div className="space-y-3">
              {result.questions.long.map((q, i) => {
                const isRevealed = revealedAnswers[`long-${i}`]
                return (
                  <div
                    key={i}
                    className="bg-white dark:bg-[#131926] rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded text-xs font-bold">
                        5 MARKS DERIVATION
                      </span>
                      <span className="text-xs text-slate-400">Expected Long Question</span>
                    </div>

                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      Q{i + 1}: {q.question}
                    </h5>

                    <div>
                      <button
                        onClick={() => toggleAnswer(`long-${i}`)}
                        className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition cursor-pointer"
                      >
                        {isRevealed ? "Hide Solution 👁️" : "Reveal Step-by-Step Derivation 👁️"}
                      </button>

                      {isRevealed && (
                        <div className="mt-3 p-3.5 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/40 rounded-xl text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
                          <strong>Step-by-Step Proof:</strong> {q.answer}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      )}

      {/* ============================================================ */}
      <!-- TAB 6: WEIGHTAGE CHARTS                                       -->
      {/* ============================================================ */}
      {activeTab === "charts" && result.charts && result.charts.length > 0 && (
        <div className="bg-white dark:bg-[#131926] rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-white/10 space-y-4 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Marks Weightage & Topic Distribution</h3>
              <p className="text-xs text-slate-500">Visual analytical breakdown of high-scoring areas</p>
            </div>
            <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400">Recharts Analytics</span>
          </div>

          <RechartSetUp charts={result.charts} />
        </div>
      )}

    </div>
  )
}

export default FinalResult
