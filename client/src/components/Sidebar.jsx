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
    <div className="bg-white border-2 border-gray-900 rounded-3xl p-5 shadow-[5px_5px_0px_#000] space-y-5
      dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[5px_5px_0px_rgba(255,255,255,0.1)] transition-colors">
      
      {/* HEADER */}
      <div className="flex items-center gap-2.5 border-b-2 border-gray-100 dark:border-zinc-800 pb-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-100 border-2 border-gray-900 flex items-center justify-center text-sm dark:bg-indigo-950 dark:border-zinc-600">
          🎯
        </div>
        <h3 className="text-base font-black uppercase tracking-tight text-gray-900 dark:text-white">
          Topic Importance
        </h3>
      </div>

      {/* SUB-TOPICS BY PRIORITY */}
      <div className="space-y-3">
        {Object.entries(result.subTopics).map(([star, topics]) => {
          let badgeColor = "bg-blue-50 border-blue-300 text-blue-900 dark:bg-blue-950/40 dark:border-blue-700 dark:text-blue-300"
          let title = "⭐ Very Important (2 Marks)"

          if (star.includes("3") || star.toLowerCase().includes("high") || star === "⭐⭐⭐") {
            badgeColor = "bg-red-50 border-red-300 text-red-950 dark:bg-red-950/40 dark:border-red-700 dark:text-red-300"
            title = "⭐⭐⭐ Frequently Asked (5 Marks)"
          } else if (star.includes("2") || star.toLowerCase().includes("medium") || star === "⭐⭐") {
            badgeColor = "bg-amber-50 border-amber-300 text-amber-950 dark:bg-amber-950/40 dark:border-amber-700 dark:text-amber-300"
            title = "⭐⭐ Important (3 Marks)"
          }

          return (
            <div key={star} className={`p-3.5 border-2 rounded-2xl space-y-1.5 ${badgeColor}`}>
              <span className="text-xs font-black uppercase tracking-wide block">
                {title}
              </span>
              <ul className="text-xs font-bold space-y-1 pl-1">
                {topics.map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-indigo-600 dark:text-indigo-400 font-black">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* EXAM IMPORTANCE SUMMARY */}
      {result.importance && (
        <div className="p-3.5 bg-yellow-50 border-2 border-yellow-300 rounded-2xl dark:bg-yellow-950/30 dark:border-yellow-700">
          <p className="text-xs font-black uppercase text-yellow-900 dark:text-yellow-300 mb-1 flex items-center gap-1.5">
            <span>🔥</span> Exam Weightage Note
          </p>
          <p className="text-xs font-bold text-yellow-950 dark:text-yellow-200 leading-relaxed">
            {result.importance}
          </p>
        </div>
      )}

    </div>
  )
}

export default Sidebar
