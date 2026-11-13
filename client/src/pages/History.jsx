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
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900 dark:bg-[#0B0F17] dark:text-slate-100 transition-colors duration-200">
      
      {/* GLOBAL NAVBAR */}
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-24">

        {/* HEADER */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-white/10 pb-4 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Past Examination Archives
            </h1>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              Review your previously synthesized study desks, lecture shelves, and question banks.
            </p>
          </div>

          <button
            onClick={() => navigate("/notes")}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 active:scale-95 transition flex items-center gap-2 cursor-pointer"
          >
            <span>⚡ Generate New Module</span>
          </button>
        </div>

        {/* 2-PANE ARCHIVES WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* LEFT ARCHIVE LIST */}
          <div className="lg:col-span-1 bg-white dark:bg-[#131926] rounded-2xl p-4 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-3 transition-colors max-h-[80vh] overflow-y-auto">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-1 pt-1">
              Your Archives ({topics.length})
            </h3>

            {topics.length === 0 ? (
              <div className="p-6 text-center text-slate-400 space-y-2">
                <p className="text-2xl">📭</p>
                <p className="text-xs font-semibold">No saved notes yet</p>
                <button
                  onClick={() => navigate("/notes")}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 underline cursor-pointer"
                >
                  Create your first module
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
                      className={`w-full text-left p-3.5 rounded-xl border transition cursor-pointer space-y-1 ${
                        isActive
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20"
                          : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-800/80 border-slate-200 dark:border-white/5 text-slate-800 dark:text-slate-200"
                      }`}
                    >
                      <p className={`font-bold text-xs line-clamp-2 leading-snug ${isActive ? "text-white" : "text-slate-900 dark:text-white"}`}>
                        {t.topic}
                      </p>
                      <div className={`flex items-center justify-between text-[10px] font-semibold ${isActive ? "text-indigo-200" : "text-slate-400"}`}>
                        <span>{t.classLevel || t.examType || "General"}</span>
                        <span>{dateStr}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* RIGHT VIEWER */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="bg-white dark:bg-[#131926] rounded-2xl p-16 text-center border border-slate-200/80 dark:border-white/10 shadow-sm">
                <span className="text-2xl animate-spin inline-block">⏳</span>
                <p className="font-bold text-xs uppercase text-slate-600 dark:text-slate-400 mt-2">
                  Loading archive module...
                </p>
              </div>
            ) : selectedNote ? (
              <FinalResult result={selectedNote} />
            ) : (
              <div className="bg-white dark:bg-[#131926] rounded-2xl p-16 text-center border border-dashed border-slate-300 dark:border-white/10 text-slate-400 space-y-2">
                <span className="text-3xl">📂</span>
                <p className="font-bold text-xs">Select a note from the left archive to view the full study desk</p>
              </div>
            )}
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default History
