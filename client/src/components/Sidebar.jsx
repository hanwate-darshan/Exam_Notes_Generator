import React from 'react'

function Sidebar({ result }) {
  if (
    !result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long
  ) {
    return null
  }

  return (
    <div className="bg-white dark:bg-[#131926] rounded-2xl p-5 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4 transition-colors">
      
      {/* HEADER */}
      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-white/5 pb-3">
        <span className="text-base">🎯</span>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Topic Importance Matrix
        </h4>
      </div>

      {/* PRIORITY MATRIX */}
      <div className="space-y-2.5">
        {Object.entries(result.subTopics).map(([star, topics]) => {
          let badgeBg = "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200/80 dark:border-indigo-900/50 text-indigo-950 dark:text-indigo-200"
          let headerText = "⭐ 2 MARKS QUESTION"
          let freq = "70% Frequency"

          if (star.includes("3") || star.toLowerCase().includes("high") || star === "⭐⭐⭐") {
            badgeBg = "bg-rose-50 dark:bg-rose-950/40 border-rose-200/80 dark:border-rose-900/50 text-rose-950 dark:text-rose-200"
            headerText = "⭐⭐⭐ 5 MARKS QUESTION"
            freq = "95% Frequency"
          } else if (star.includes("2") || star.toLowerCase().includes("medium") || star === "⭐⭐") {
            badgeBg = "bg-amber-50 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-900/50 text-amber-950 dark:text-amber-200"
            headerText = "⭐⭐ 3 MARKS QUESTION"
            freq = "80% Frequency"
          }

          return (
            <div key={star} className={`p-3.5 border rounded-xl space-y-1.5 ${badgeBg}`}>
              <div className="flex items-center justify-between text-[11px] font-bold">
                <span>{headerText}</span>
                <span className="opacity-80">{freq}</span>
              </div>
              <ul className="text-xs font-medium space-y-1 pl-1">
                {topics.map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* EXAM WEIGHTAGE NOTE */}
      {result.importance && (
        <div className="p-3.5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 rounded-xl space-y-1">
          <p className="text-[11px] font-bold uppercase tracking-wide text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
            <span>🔥</span> Examiner Weightage Note
          </p>
          <p className="text-xs font-semibold text-amber-950 dark:text-amber-200 leading-relaxed">
            {result.importance}
          </p>
        </div>
      )}

    </div>
  )
}

export default Sidebar
