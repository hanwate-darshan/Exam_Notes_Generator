import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FinalResult from '../components/FinalResult'

function History() {
  const [topics, setTopics] = useState([])
  const [activeNoteId, setActiveNoteId] = useState(null)
  const [selectedNote, setSelectedNote] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get(serverUrl + "/api/notes/getnotes", { withCredentials: true })
        const notesList = Array.isArray(res.data) ? res.data : []
        setTopics(notesList)
        if (notesList.length > 0) {
          openNotes(notesList[0]._id)
        }
      } catch (error) {
        console.error("Error fetching notes history:", error)
      }
    }
    fetchNotes()
  }, [])

  const openNotes = async (noteId) => {
    setLoading(true)
    setActiveNoteId(noteId)
    try {
      const res = await axios.get(serverUrl + `/api/notes/${noteId}`, { withCredentials: true })
      const noteContent = res.data.content || {}
      if (!noteContent.topic) noteContent.topic = res.data.topic
      if (!noteContent.classLevel) noteContent.classLevel = res.data.classLevel
      if (!noteContent.examType) noteContent.examType = res.data.examType
      setSelectedNote(noteContent)
    } catch (error) {
      console.error("Error fetching single note:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-[#09090B] dark:text-zinc-100 transition-colors duration-200">
      
      {/* GLOBAL BOLD NAVBAR */}
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-2 pb-20 space-y-6">

        {/* PAGE HEADER */}
        <div className="flex flex-wrap items-center justify-between border-b-2 border-gray-200 dark:border-zinc-800 pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 border-2 border-gray-900 flex items-center justify-center text-white text-xl font-black shadow-[2px_2px_0px_#000] dark:border-zinc-600 dark:shadow-none">
              📂
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
                Saved Examination Notes
              </h2>
              <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400">
                Your past generated study material, flowcharts, questions & lectures
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/notes")}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs md:text-sm border-2 border-gray-900 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition flex items-center gap-2 cursor-pointer"
          >
            <span>➕</span> Generate New Notes
          </button>
        </div>

        {/* MAIN HISTORY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* LEFT COLUMN: LIST OF PAST NOTES */}
          <div className="lg:col-span-1 bg-white border-2 border-gray-900 rounded-3xl p-4 shadow-[5px_5px_0px_#000] space-y-3 dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[5px_5px_0px_rgba(255,255,255,0.1)] transition-colors max-h-[80vh] overflow-y-auto">
            
            <h3 className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-zinc-500 px-2 pt-1">
              Your Archives ({topics.length})
            </h3>

            {topics.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-zinc-400 space-y-2">
                <p className="text-2xl">📭</p>
                <p className="text-xs font-bold">No saved notes yet</p>
                <button
                  onClick={() => navigate("/notes")}
                  className="text-xs font-black text-indigo-600 underline"
                >
                  Create your first notes
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {topics.map((t) => {
                  const isActive = activeNoteId === t._id
                  const dateStr = t.createdAt ? new Date(t.createdAt).toLocaleDateString() : ""

                  return (
                    <button
                      key={t._id}
                      onClick={() => openNotes(t._id)}
                      className={`w-full text-left p-3.5 rounded-2xl border-2 transition active:translate-x-0.5 active:translate-y-0.5 cursor-pointer space-y-1 ${
                        isActive
                          ? "bg-indigo-600 text-white border-gray-900 shadow-[3px_3px_0px_#000] dark:bg-indigo-600 dark:border-white"
                          : "bg-gray-50 hover:bg-gray-100 border-gray-900 text-gray-900 dark:bg-zinc-800/80 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <p className={`font-black text-xs md:text-sm line-clamp-2 leading-tight ${isActive ? "text-white" : "text-gray-900 dark:text-white"}`}>
                        {t.topic}
                      </p>
                      <div className={`flex items-center justify-between text-[10px] font-bold ${isActive ? "text-indigo-200" : "text-gray-500 dark:text-zinc-400"}`}>
                        <span>{t.classLevel || t.examType || "General"}</span>
                        <span>{dateStr}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: NOTE CONTENT VIEWER */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="bg-white border-2 border-gray-900 rounded-3xl p-16 text-center shadow-[5px_5px_0px_#000] dark:bg-[#141416] dark:border-zinc-600">
                <span className="text-3xl animate-spin inline-block">⏳</span>
                <p className="font-black text-sm uppercase text-gray-700 dark:text-zinc-300 mt-3">
                  Loading saved notes...
                </p>
              </div>
            ) : selectedNote ? (
              <FinalResult result={selectedNote} />
            ) : (
              <div className="bg-white border-2 border-dashed border-gray-400 rounded-3xl p-16 text-center space-y-3 dark:bg-[#141416] dark:border-zinc-700">
                <span className="text-4xl">📂</span>
                <p className="font-black text-sm text-gray-500 dark:text-zinc-400">
                  Select a note from the left to view the complete revision material
                </p>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  )
}

export default History
