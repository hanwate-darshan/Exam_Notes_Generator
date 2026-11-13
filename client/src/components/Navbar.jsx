import React, { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
  const { userData } = useSelector((state) => state.user)
  const credits = userData?.credits ?? 0
  const [showCredits, setShowCredits] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { theme, toggleTheme } = useTheme()

  const profileRef = useRef(null)
  const creditsRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false)
      if (creditsRef.current && !creditsRef.current.contains(e.target)) setShowCredits(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const handleSignOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      navigate("/auth")
    } catch (error) {
      console.log(error)
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-[#0B0F17]/85 border-b border-slate-200/80 dark:border-white/10 px-4 sm:px-8 py-3 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* BRAND LOGO */}
        <div 
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            D
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                Darsh<span className="text-indigo-600 dark:text-indigo-400">AI</span>
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800">
                Focus Studio
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 -mt-0.5 hidden sm:block">
              Precision Exam Revision & Lecture Suite
            </p>
          </div>
        </div>

        {/* CENTER NAVIGATION PILLS */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200/60 dark:border-white/5 text-xs font-semibold">
          <button
            onClick={() => navigate("/notes")}
            className={`px-3.5 py-1.5 rounded-lg transition ${
              isActive("/notes")
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Study Desk
          </button>
          <button
            onClick={() => navigate("/history")}
            className={`px-3.5 py-1.5 rounded-lg transition ${
              isActive("/history")
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Past Archives
          </button>
          <button
            onClick={() => navigate("/pricing")}
            className={`px-3.5 py-1.5 rounded-lg transition ${
              isActive("/pricing")
                ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Plans & Credits
          </button>
        </div>

        {/* RIGHT CONTROLS */}
        <div className="flex items-center gap-2.5 sm:gap-3">

          {/* THEME TOGGLE BUTTON */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 transition cursor-pointer"
          >
            <span className="text-sm">{theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>

          {/* CREDITS PILL WITH DROPDOWN */}
          <div className="relative" ref={creditsRef}>
            <button
              onClick={() => { setShowCredits(!showCredits); setShowProfile(false) }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 text-xs font-bold shadow-sm hover:bg-amber-100 dark:hover:bg-amber-950/70 transition cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>{credits} Credits</span>
            </button>

            <AnimatePresence>
              {showCredits && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-72 p-5 rounded-2xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-white/10 shadow-xl text-slate-900 dark:text-white z-50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Study Credits
                    </h4>
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {credits} Remaining
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    10 credits per generation. Includes complete notes, YouTube video lectures, Mermaid flowcharts, and question banks.
                  </p>
                  <button
                    onClick={() => { setShowCredits(false); navigate("/pricing") }}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition cursor-pointer"
                  >
                    Get More Credits 💳
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* USER AVATAR & DROPDOWN */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setShowProfile(!showProfile); setShowCredits(false) }}
              className="w-9 h-9 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-extrabold text-sm flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 p-2 rounded-2xl bg-white dark:bg-[#131926] border border-slate-200 dark:border-white/10 shadow-xl text-slate-900 dark:text-white z-50 overflow-hidden"
                >
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-white/5 mb-1">
                    <p className="text-xs font-bold truncate">{userData?.name || "Student"}</p>
                    <p className="text-[11px] text-slate-400 truncate">{userData?.email}</p>
                  </div>

                  <button
                    onClick={() => { setShowProfile(false); navigate("/notes") }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
                  >
                    <span>📘</span> Study Desk
                  </button>
                  <button
                    onClick={() => { setShowProfile(false); navigate("/history") }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
                  >
                    <span>📂</span> Past Archives
                  </button>
                  <button
                    onClick={() => { setShowProfile(false); navigate("/pricing") }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center gap-2"
                  >
                    <span>💳</span> Add Credits
                  </button>

                  <div className="h-px bg-slate-100 dark:bg-white/5 my-1" />

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-3 py-2 text-xs font-semibold rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition flex items-center gap-2"
                  >
                    <span>🚪</span> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </nav>
  )
}

export default Navbar
