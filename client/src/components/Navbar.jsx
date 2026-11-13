import React, { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const credits = userData?.credits ?? 0
    const [showCredits, setShowCredits] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const navigate = useNavigate()
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

    return (
        <header className="sticky top-4 z-40 mx-4 md:mx-8 mb-6
            bg-white border-2 border-gray-900 rounded-2xl p-4 md:px-6 shadow-[4px_4px_0px_#000]
            dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[4px_4px_0px_rgba(255,255,255,0.15)]
            flex flex-wrap items-center justify-between gap-4 transition-colors">

            {/* BRAND */}
            <div
                onClick={() => navigate("/")}
                className="flex items-center gap-3 cursor-pointer group"
            >
                <div className="w-11 h-11 rounded-xl bg-indigo-600 dark:bg-indigo-500 border-2 border-gray-900 dark:border-zinc-600 flex items-center justify-center text-white text-2xl font-black shadow-[2px_2px_0px_#000] dark:shadow-none group-hover:scale-105 transition-transform">
                    📚
                </div>
                <div>
                    <h1 className="text-lg md:text-xl font-black tracking-tight text-gray-900 dark:text-white uppercase">
                        Darsh<span className="text-indigo-600 dark:text-indigo-400">AI</span>
                    </h1>
                    <p className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400 hidden sm:block">
                        Exam Notes Generator
                    </p>
                </div>
            </div>

            {/* CONTROLS */}
            <div className="flex items-center gap-3">

                {/* THEME TOGGLE */}
                <button
                    onClick={toggleTheme}
                    title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    className="px-3 py-2 rounded-xl text-sm font-bold
                        bg-gray-100 hover:bg-gray-200 border-2 border-gray-900 text-gray-900 shadow-[2px_2px_0px_#000]
                        dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border-zinc-600 dark:text-white dark:shadow-none
                        active:translate-x-0.5 active:translate-y-0.5 transition"
                >
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>

                {/* CREDITS */}
                <div className="relative" ref={creditsRef}>
                    <button
                        onClick={() => { setShowCredits(!showCredits); setShowProfile(false) }}
                        className="px-4 py-2 rounded-xl bg-amber-100 border-2 border-amber-400 text-amber-950 font-bold text-sm flex items-center gap-2
                            dark:bg-amber-950/60 dark:border-amber-600 dark:text-amber-200
                            active:translate-x-0.5 active:translate-y-0.5 transition"
                    >
                        <span>⚡</span>
                        <span>{credits} Credits</span>
                    </button>

                    <AnimatePresence>
                        {showCredits && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 8, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 mt-2 w-72 p-5 rounded-2xl
                                    bg-white border-2 border-gray-900 shadow-[6px_6px_0px_#000] text-gray-900
                                    dark:bg-[#18181B] dark:border-zinc-600 dark:shadow-[6px_6px_0px_rgba(255,255,255,0.1)] dark:text-zinc-100"
                            >
                                <h4 className="font-black text-sm mb-1 uppercase tracking-wider">Study Credits</h4>
                                <p className="text-xs text-gray-600 dark:text-zinc-400 mb-4 font-medium">
                                    Each note generation costs 10 credits. Includes notes, YouTube lectures, flowcharts & question banks.
                                </p>
                                <button
                                    onClick={() => { setShowCredits(false); navigate("/pricing") }}
                                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs border-2 border-gray-900 shadow-[2px_2px_0px_#000] transition active:translate-x-0.5 active:translate-y-0.5"
                                >
                                    Get More Credits 💳
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* HISTORY */}
                <button
                    onClick={() => navigate("/history")}
                    className="hidden md:flex px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-gray-900 text-sm font-bold shadow-[2px_2px_0px_#000]
                        dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:border-zinc-600 dark:text-white dark:shadow-none
                        active:translate-x-0.5 active:translate-y-0.5 transition"
                >
                    📂 History
                </button>

                {/* BUY CREDITS */}
                <button
                    onClick={() => navigate("/pricing")}
                    className="hidden md:flex px-4 py-2 rounded-xl bg-gray-900 hover:bg-black text-white text-sm font-bold shadow-sm
                        dark:bg-white dark:hover:bg-zinc-100 dark:text-gray-900
                        active:translate-x-0.5 active:translate-y-0.5 transition"
                >
                    💳 Buy Credits
                </button>

                {/* PROFILE */}
                <div className="relative" ref={profileRef}>
                    <button
                        onClick={() => { setShowProfile(!showProfile); setShowCredits(false) }}
                        className="w-10 h-10 rounded-xl bg-gray-900 text-white border-2 border-gray-900 font-black text-sm shadow-[2px_2px_0px_#000]
                            dark:bg-white dark:text-gray-900 dark:border-zinc-600 dark:shadow-none
                            hover:scale-105 active:scale-95 transition flex items-center justify-center"
                    >
                        {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                    </button>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 8, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 mt-2 w-56 p-2 rounded-2xl
                                    bg-white border-2 border-gray-900 shadow-[6px_6px_0px_#000] text-gray-900
                                    dark:bg-[#18181B] dark:border-zinc-600 dark:shadow-[6px_6px_0px_rgba(255,255,255,0.1)] dark:text-zinc-100"
                            >
                                <div className="px-3 py-2 border-b-2 border-gray-100 dark:border-zinc-800 mb-1">
                                    <p className="text-xs font-black truncate">{userData?.name || "Student"}</p>
                                    <p className="text-[11px] text-gray-500 dark:text-zinc-400 truncate">{userData?.email}</p>
                                </div>

                                <button onClick={() => { setShowProfile(false); navigate("/notes") }}
                                    className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition flex items-center gap-2">
                                    📝 Study Studio
                                </button>
                                <button onClick={() => { setShowProfile(false); navigate("/history") }}
                                    className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition flex items-center gap-2">
                                    📂 Note Archives
                                </button>
                                <button onClick={() => { setShowProfile(false); navigate("/pricing") }}
                                    className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition flex items-center gap-2">
                                    💳 Buy Credits
                                </button>

                                <div className="h-px bg-gray-200 dark:bg-zinc-800 my-1" />

                                <button onClick={handleSignOut}
                                    className="w-full text-left px-3 py-2 text-xs font-bold rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition flex items-center gap-2">
                                    🚪 Sign Out
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    )
}

export default Navbar
