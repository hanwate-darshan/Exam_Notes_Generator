import React from 'react'
import { FcGoogle } from "react-icons/fc"
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import axios from "axios"
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import { useTheme } from '../context/ThemeContext'

function Auth() {
  const dispatch = useDispatch()
  const { theme, toggleTheme } = useTheme()

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const User = response.user
      const name = User.displayName
      const email = User.email
      const result = await axios.post(serverUrl + "/api/auth/google", { name, email }, {
        withCredentials: true
      })
      dispatch(setUserData(result.data))
    } catch (error) {
      console.error("Google Auth error:", error)
      alert("Sign in failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900 dark:bg-[#0B0F17] dark:text-slate-100 px-4 sm:px-8 py-6 transition-colors duration-200 flex flex-col justify-between">
      
      {/* TOP HEADER */}
      <header className="max-w-6xl w-full mx-auto bg-white/80 dark:bg-[#131926]/80 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 rounded-2xl p-4 sm:px-6 shadow-sm flex items-center justify-between transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-indigo-500/20">
            D
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight">
              Darsh<span className="text-indigo-600 dark:text-indigo-400">AI</span> Focus Studio
            </h1>
            <p className="text-[11px] font-medium text-slate-400 hidden sm:block">
              Exam Notes & Video Lecture Platform
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-white/10 transition cursor-pointer"
        >
          <span className="text-sm">{theme === 'dark' ? '☀️' : '🌙'}</span>
        </button>
      </header>

      {/* MAIN AUTH SECTION */}
      <main className="max-w-5xl w-full mx-auto py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT BRAND PROPOSITION */}
        <div className="space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <span>⚡</span> 50 Free Study Credits on Sign Up
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
            Supercharge Your Exam Prep with <span className="text-indigo-600 dark:text-indigo-400">Precision AI</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            The all-in-one academic revision platform for CBSE, State Boards, JEE, NEET, and University engineering students.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-semibold">
            {[
              "📘 Board-Calibrated Notes",
              "🎥 Curated YouTube Lectures",
              "📊 Mermaid Process Maps",
              "⬇️ Print-Ready PDF Downloads"
            ].map((item) => (
              <div key={item} className="p-3 bg-white dark:bg-[#131926] border border-slate-200/80 dark:border-white/10 rounded-xl shadow-sm text-slate-800 dark:text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT GOOGLE SIGN IN CARD */}
        <div className="bg-white dark:bg-[#131926] rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-xl space-y-6 text-center transition-colors">
          
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 mx-auto flex items-center justify-center text-2xl font-bold shadow-sm">
            🎓
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Sign In to DarshAI
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Continue with your Google account to access your personal study desk
            </p>
          </div>

          <button
            onClick={handleGoogleAuth}
            className="w-full py-3.5 px-6 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 shadow-sm transition flex items-center justify-center gap-3 font-bold text-sm text-slate-800 dark:text-white cursor-pointer active:scale-95"
          >
            <FcGoogle className="text-xl" />
            <span>Continue with Google</span>
          </button>

          <p className="text-[11px] text-slate-400 font-medium">
            🔒 Protected by Google OAuth & Firebase Authentication
          </p>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs font-medium text-slate-400 py-4">
        © {new Date().getFullYear()} DarshAI Exam Notes Generator • Academic Edition 2026
      </footer>

    </div>
  )
}

export default Auth
