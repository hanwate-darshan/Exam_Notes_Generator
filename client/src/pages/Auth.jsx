import React from 'react'
import { motion } from "motion/react"
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
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-[#09090B] dark:text-zinc-100 px-4 md:px-8 py-6 transition-colors duration-200 flex flex-col justify-between">
      
      {/* TOP HEADER */}
      <header className="max-w-5xl w-full mx-auto bg-white border-2 border-gray-900 rounded-2xl p-4 md:px-6 shadow-[4px_4px_0px_#000] dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[4px_4px_0px_rgba(255,255,255,0.12)] flex items-center justify-between transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 border-2 border-gray-900 flex items-center justify-center text-white text-xl font-black shadow-[2px_2px_0px_#000] dark:border-zinc-600 dark:shadow-none">
            📚
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black tracking-tight uppercase">
              Darsh<span className="text-indigo-600 dark:text-indigo-400">AI</span>
            </h1>
            <p className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400 hidden sm:block">
              Exam Notes Generator
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="px-3 py-1.5 rounded-xl text-sm font-bold bg-gray-100 hover:bg-gray-200 border-2 border-gray-900 text-gray-900 shadow-[2px_2px_0px_#000] dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border-zinc-600 dark:text-white dark:shadow-none transition"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl w-full mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        
        {/* LEFT BRAND VALUE */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 border-2 border-emerald-300 text-emerald-800 dark:bg-emerald-950/70 dark:border-emerald-600 dark:text-emerald-300">
              ⚡ 50 Free Credits on Sign Up
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-tight">
            Crack Exams with <br />
            <span className="text-indigo-600 dark:text-indigo-400 underline decoration-wavy decoration-2">
              Precision AI
            </span>
          </h1>

          <p className="text-base font-semibold text-gray-600 dark:text-zinc-400 leading-relaxed max-w-md">
            The all-in-one exam revision suite for CBSE, State Boards, JEE, NEET, and University exams. Notes, YouTube lectures, flowcharts, and cheat sheets in seconds.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              "📘 Board-Calibrated Notes",
              "🎥 Curated YouTube Lectures",
              "📊 Mermaid Concept Maps",
              "⬇️ 1-Click PDF Downloads"
            ].map((item) => (
              <div key={item} className="p-3 bg-white border-2 border-gray-900 rounded-xl font-bold text-xs shadow-[2px_2px_0px_#000] dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:shadow-none">
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIGN IN CARD */}
        <div className="bg-white border-2 border-gray-900 rounded-3xl p-8 md:p-10 shadow-[8px_8px_0px_#000] space-y-6 text-center dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[8px_8px_0px_rgba(255,255,255,0.12)] transition-colors">
          
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 border-2 border-gray-900 mx-auto flex items-center justify-center text-3xl shadow-[3px_3px_0px_#000] dark:bg-zinc-800 dark:border-zinc-600 dark:shadow-none">
            🎓
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
              Get Started with DarshAI
            </h2>
            <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400 mt-1">
              Sign in with your Google account to access your study studio
            </p>
          </div>

          <button
            onClick={handleGoogleAuth}
            className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-gray-50 border-2 border-gray-900 shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition flex items-center justify-center gap-3 font-black text-sm md:text-base text-gray-900 cursor-pointer dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border-zinc-600 dark:text-white dark:shadow-none"
          >
            <FcGoogle className="text-2xl" />
            <span>Continue with Google</span>
          </button>

          <div className="p-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-xs font-bold text-gray-600 dark:bg-zinc-800/60 dark:border-zinc-700 dark:text-zinc-400">
            🔒 Safe & Secure Authentication via Firebase & Google OAuth
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs font-bold text-gray-400 dark:text-zinc-500 py-4">
        © {new Date().getFullYear()} DarshAI Exam Notes Generator • Academic Edition 2026
      </footer>

    </div>
  )
}

export default Auth
