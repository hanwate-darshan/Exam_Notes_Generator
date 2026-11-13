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
        <footer className="mx-4 md:mx-8 mb-8 mt-12 rounded-3xl
            bg-white border-2 border-gray-900 shadow-[6px_6px_0px_#000] text-gray-900
            dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[6px_6px_0px_rgba(255,255,255,0.1)] dark:text-zinc-100
            p-8 md:p-10 transition-colors">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                {/* BRAND */}
                <div className="space-y-3">
                    <div
                        onClick={() => navigate("/")}
                        className="flex items-center gap-3 cursor-pointer"
                    >
                        <div className="w-9 h-9 rounded-xl bg-indigo-600 border-2 border-gray-900 dark:border-zinc-600 flex items-center justify-center text-white font-black text-lg shadow-[2px_2px_0px_#000] dark:shadow-none">
                            📚
                        </div>
                        <span className="text-xl font-black uppercase tracking-tight dark:text-white">
                            Darsh<span className="text-indigo-600 dark:text-indigo-400">AI</span> Studio
                        </span>
                    </div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-zinc-400 leading-relaxed max-w-sm">
                        High-yield AI examination notes generator with curated YouTube video lectures, interactive flowcharts, and instant PDF downloads.
                    </p>
                </div>

                {/* NAVIGATION */}
                <div className="space-y-3 text-center md:text-left">
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                        Quick Navigation
                    </h4>
                    <ul className="space-y-2 text-xs font-bold text-gray-700 dark:text-zinc-300">
                        <li>
                            <button onClick={() => navigate("/notes")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                                📝 Open Study Studio
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigate("/history")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                                📂 Saved Note Archives
                            </button>
                        </li>
                        <li>
                            <button onClick={() => navigate("/pricing")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                                💳 Study Credit Plans
                            </button>
                        </li>
                    </ul>
                </div>

                {/* SESSION */}
                <div className="space-y-3 text-center md:text-left">
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-zinc-500">
                        Session & Support
                    </h4>
                    <ul className="space-y-2 text-xs font-bold text-gray-700 dark:text-zinc-300">
                        <li>
                            <button onClick={handleSignOut} className="text-red-600 hover:text-red-700 dark:text-red-400 transition">
                                🚪 Sign Out of Account
                            </button>
                        </li>
                        <li className="text-gray-500 text-[11px] font-semibold">
                            DarshAI Academic Edition 2026
                        </li>
                    </ul>
                </div>
            </div>

            <div className="my-6 h-0.5 bg-gray-200 dark:bg-zinc-800" />

            <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-gray-500 dark:text-zinc-400 gap-2">
                <p>© {new Date().getFullYear()} DarshAI Exam Notes Generator. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Gemini AI & YouTube API Online
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer
