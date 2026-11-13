import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'

function Footer() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignOut = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      dispatch(setUserData(null))
      navigate("/auth")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <footer className="border-t border-slate-200/80 dark:border-white/10 bg-white/60 dark:bg-[#0B0F17]/60 backdrop-blur-md transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* BRAND */}
          <div className="md:col-span-2 space-y-3">
            <div 
              onClick={() => navigate("/")}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-indigo-500/20">
                D
              </div>
              <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                Darsh<span className="text-indigo-600 dark:text-indigo-400">AI</span> Focus Studio
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm font-medium">
              Academic precision AI examination notes generator with curated YouTube video shelves, interactive flowcharts, and instant PDF downloads.
            </p>
          </div>

          {/* NAVIGATION */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Workspace
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <li>
                <button onClick={() => navigate("/notes")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">
                  📘 Study Desk
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/history")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">
                  📂 Past Archives
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/pricing")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">
                  💳 Study Credit Plans
                </button>
              </li>
            </ul>
          </div>

          {/* SESSION & SUPPORT */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Session
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <li>
                <button onClick={handleSignOut} className="text-rose-600 hover:text-rose-700 dark:text-rose-400 transition cursor-pointer">
                  🚪 Sign Out of Account
                </button>
              </li>
              <li className="text-[11px] text-slate-400 font-medium">
                Academic Edition 2026
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium gap-3">
          <p>© {new Date().getFullYear()} DarshAI Exam Notes Generator. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Gemini AI & YouTube API Online</span>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
