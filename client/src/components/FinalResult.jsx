import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MermaidSetup from './MermaidSetup'
import RechartSetUp from './RechartSetUp'
import { downloadPdf } from '../services/api'

const markDownComponent = {
  h1: ({ children }) => (
    <h1 className="text-xl md:text-2xl font-black text-indigo-700 dark:text-indigo-400 mt-6 mb-3 border-b-2 border-gray-200 dark:border-zinc-700 pb-2 uppercase tracking-tight">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg md:text-xl font-black text-gray-900 dark:text-white mt-5 mb-2.5">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-extrabold text-gray-800 dark:text-zinc-200 mt-4 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-sm font-semibold text-gray-700 dark:text-zinc-300 leading-relaxed mb-3">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc ml-5 space-y-1.5 text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-3">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal ml-5 space-y-1.5 text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-3">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="marker:text-indigo-600 dark:marker:text-indigo-400">{children}</li>
  ),
  code: ({ children }) => (
    <code className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-zinc-800 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold border border-gray-300 dark:border-zinc-700">
      {children}
    </code>
  ),
  blockquote: ({ children }) => (
    <blockquote className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 border-l-4 border-indigo-600 rounded-r-xl text-sm font-semibold text-gray-800 dark:text-zinc-200 my-3">
      {children}
    </blockquote>
  )
}

function FinalResult({ result }) {
  const [quickRevision, setQuickRevision] = useState(false)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

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

  const youtubeVideos = result.youtubeVideos || []

  return (
    <div className="space-y-6">

      {/* ═══════════════════════════════════════════
          ACTION BAR: BOLD, SEPARATE & STRAIGHTFORWARD
      ═══════════════════════════════════════════ */}
      <div className="bg-indigo-900 text-white border-2 border-gray-900 rounded-3xl p-5 md:p-6 shadow-[5px_5px_0px_#000]
        dark:bg-indigo-950 dark:border-zinc-600 dark:shadow-[5px_5px_0px_rgba(255,255,255,0.12)]
        flex flex-wrap items-center justify-between gap-4 transition-colors">
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white text-indigo-900 border-2 border-gray-900 flex items-center justify-center text-2xl font-black shadow-[2px_2px_0px_#000]">
            📘
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">
              {result.topic || "Examination Notes"}
            </h3>
            <p className="text-xs font-semibold text-indigo-200 dark:text-indigo-300">
              {result.classLevel ? `${result.classLevel} • ` : ""}{result.examType || "Comprehensive Revision"} • ⏱️ Exam Ready
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Revision Switch */}
          <button
            onClick={() => setQuickRevision(!quickRevision)}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs md:text-sm border-2 border-gray-900 shadow-[2px_2px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5 ${
              quickRevision
                ? "bg-amber-400 text-black hover:bg-amber-300"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {quickRevision ? "📖 Exit 5-Min Mode" : "⚡ 5-Min Cheat Sheet"}
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-white text-gray-900 hover:bg-gray-100 font-extrabold text-xs md:text-sm border-2 border-gray-900 shadow-[2px_2px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5"
          >
            <span>{copied ? "✓" : "📋"}</span>
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>

          {/* Download PDF Button */}
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 disabled:bg-gray-400 font-extrabold text-xs md:text-sm border-2 border-gray-900 shadow-[2px_2px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
          >
            <span>{downloading ? "⏳" : "⬇️"}</span>
            <span>{downloading ? "Exporting..." : "Download PDF"}</span>
          </button>
        </div>

      </div>

      {/* ═══════════════════════════════════════════
          QUICK REVISION MODE (5-MIN CHEAT SHEET)
      ═══════════════════════════════════════════ */}
      {quickRevision && (
        <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 md:p-8 shadow-[5px_5px_0px_#000] space-y-4
          dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[5px_5px_0px_rgba(255,255,255,0.1)] transition-colors">
          <div className="flex items-center gap-2.5 border-b-2 border-gray-100 dark:border-zinc-800 pb-3">
            <span className="text-2xl">⚡</span>
            <div>
              <h4 className="text-lg font-black uppercase text-gray-900 dark:text-white">
                5-Minute Active Recall Cheat Sheet
              </h4>
              <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400">
                Core definitions, high-yield laws & must-know points for morning revision
              </p>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            {result.revisionPoints.map((point, index) => (
              <div 
                key={index}
                className="p-3.5 bg-gray-50 border-2 border-gray-200 rounded-2xl flex items-start gap-3
                  dark:bg-zinc-800/60 dark:border-zinc-700"
              >
                <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-sm font-bold text-gray-800 dark:text-zinc-200 leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          FEATURE 3: CURATED YOUTUBE VIDEO LECTURES CARD ⭐
      ═══════════════════════════════════════════ */}
      {!quickRevision && youtubeVideos.length > 0 && (
        <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 md:p-8 shadow-[5px_5px_0px_#000] space-y-5
          dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[5px_5px_0px_rgba(255,255,255,0.1)] transition-colors">
          
          <div className="flex flex-wrap items-center justify-between border-b-2 border-gray-100 dark:border-zinc-800 pb-3 gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-red-100 border-2 border-gray-900 flex items-center justify-center text-xl shadow-[2px_2px_0px_#000] dark:bg-red-950 dark:border-zinc-600 dark:shadow-none">
                🎥
              </div>
              <div>
                <h4 className="text-lg font-black uppercase text-gray-900 dark:text-white">
                  Curated YouTube Video Lectures
                </h4>
                <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400">
                  Recommended one-shot lectures & concept masterclasses from top educators
                </p>
              </div>
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-red-700 bg-red-50 border-2 border-red-200 px-3 py-1 rounded-full dark:bg-red-950/70 dark:border-red-700 dark:text-red-300">
              YouTube Data API v3
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {youtubeVideos.map((video, idx) => (
              <a
                key={idx}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-gray-50 border-2 border-gray-900 rounded-2xl overflow-hidden shadow-[3px_3px_0px_#000] hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5 transition duration-150
                  dark:bg-zinc-800/80 dark:border-zinc-600 dark:shadow-[3px_3px_0px_rgba(255,255,255,0.1)]"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full bg-zinc-900 overflow-hidden border-b-2 border-gray-900 dark:border-zinc-600">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-red-600 border-2 border-white flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      ▶
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <h5 className="font-black text-xs md:text-sm text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {video.title}
                  </h5>
                  <p className="text-[11px] font-bold text-gray-500 dark:text-zinc-400 truncate">
                    📺 {video.channelTitle}
                  </p>
                  <div className="pt-1 flex items-center justify-between text-[11px] font-black text-indigo-600 dark:text-indigo-400">
                    <span>Watch on YouTube</span>
                    <span>➔</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════
          STRUCTURED REVISION NOTES CARD
      ═══════════════════════════════════════════ */}
      {!quickRevision && (
        <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 md:p-8 shadow-[5px_5px_0px_#000] space-y-5
          dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[5px_5px_0px_rgba(255,255,255,0.1)] transition-colors">
          
          <div className="flex items-center justify-between border-b-2 border-gray-100 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">📝</span>
              <h4 className="text-lg font-black uppercase text-gray-900 dark:text-white">
                Structured Examination Notes
              </h4>
            </div>
            <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 border-2 border-indigo-200 px-3 py-1 rounded-full dark:bg-indigo-950/70 dark:border-indigo-600 dark:text-indigo-300">
              Gemini AI
            </span>
          </div>

          <div className="text-gray-800 dark:text-zinc-200 space-y-2">
            <ReactMarkdown components={markDownComponent}>
              {typeof result.notes === "string" ? result.notes : JSON.stringify(result.notes)}
            </ReactMarkdown>
          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════
          MERMAID FLOWCHART DIAGRAM CARD
      ═══════════════════════════════════════════ */}
      {!quickRevision && result.diagram && (
        <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 shadow-[5px_5px_0px_#000] space-y-4
          dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[5px_5px_0px_rgba(255,255,255,0.1)] transition-colors">
          
          <div className="flex items-center justify-between border-b-2 border-gray-100 dark:border-zinc-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <h4 className="text-base font-black uppercase text-gray-900 dark:text-white">
                Concept Hierarchy Flowchart (Mermaid)
              </h4>
            </div>
            <span className="text-xs font-bold text-gray-400">Interactive Map</span>
          </div>

          <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl overflow-x-auto dark:bg-zinc-900/60 dark:border-zinc-700 flex justify-center">
            <MermaidSetup diagram={result.diagram} />
          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════
          WEIGHTAGE CHARTS (RECHARTS)
      ═══════════════════════════════════════════ */}
      {!quickRevision && result.charts && result.charts.length > 0 && (
        <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 shadow-[5px_5px_0px_#000] space-y-4
          dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[5px_5px_0px_rgba(255,255,255,0.1)] transition-colors">
          
          <div className="flex items-center justify-between border-b-2 border-gray-100 dark:border-zinc-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">📈</span>
              <h4 className="text-base font-black uppercase text-gray-900 dark:text-white">
                Chapter Marks & Weightage Distribution
              </h4>
            </div>
            <span className="text-xs font-bold text-gray-400">Analytics</span>
          </div>

          <RechartSetUp charts={result.charts} />

        </div>
      )}

      {/* ═══════════════════════════════════════════
          HIGH YIELD EXAM QUESTIONS CARD
      ═══════════════════════════════════════════ */}
      {!quickRevision && (
        <div className="bg-white border-2 border-gray-900 rounded-3xl p-6 md:p-8 shadow-[5px_5px_0px_#000] space-y-6
          dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[5px_5px_0px_rgba(255,255,255,0.1)] transition-colors">
          
          <div className="flex items-center justify-between border-b-2 border-gray-100 dark:border-zinc-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">❓</span>
              <h4 className="text-lg font-black uppercase text-gray-900 dark:text-white">
                High-Yield Examination Questions
              </h4>
            </div>
            <span className="text-xs font-black uppercase text-indigo-700 bg-indigo-50 border-2 border-indigo-200 px-3 py-1 rounded-full dark:bg-indigo-950/70 dark:border-indigo-600 dark:text-indigo-300">
              Exam Oriented
            </span>
          </div>

          {/* 2 MARKS SHORT QUESTIONS */}
          <div className="space-y-3">
            <h5 className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-zinc-400">
              Part A: 2 Marks Short Questions
            </h5>
            <div className="space-y-3">
              {result.questions.short.map((q, i) => (
                <div 
                  key={i}
                  className="p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl space-y-1.5 dark:bg-zinc-800/60 dark:border-zinc-700"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 bg-indigo-600 text-white rounded-md text-[10px] font-black shrink-0 mt-0.5">
                      2 MARKS
                    </span>
                    <p className="text-xs md:text-sm font-black text-gray-900 dark:text-white">
                      {q.question}
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-zinc-400 pl-11">
                    👉 {q.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5 MARKS LONG QUESTIONS */}
          <div className="space-y-3 pt-2">
            <h5 className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-zinc-400">
              Part B: 5 Marks Long / Derivation Questions
            </h5>
            <div className="space-y-3">
              {result.questions.long.map((q, i) => (
                <div 
                  key={i}
                  className="p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl space-y-1.5 dark:bg-zinc-800/60 dark:border-zinc-700"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-0.5 bg-amber-500 text-white rounded-md text-[10px] font-black shrink-0 mt-0.5">
                      5 MARKS
                    </span>
                    <p className="text-xs md:text-sm font-black text-gray-900 dark:text-white">
                      {q.question}
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-gray-600 dark:text-zinc-400 pl-11">
                    👉 {q.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  )
}

export default FinalResult
