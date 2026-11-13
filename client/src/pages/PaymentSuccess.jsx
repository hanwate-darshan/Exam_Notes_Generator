import React, { useEffect } from 'react'
import { motion } from "motion/react"
import { FiCheckCircle } from "react-icons/fi"
import { getCurrentUser } from '../services/api'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PaymentSuccess() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getCurrentUser(dispatch)
    const t = setTimeout(() => {
      navigate("/")
    }, 4000)
    return () => clearTimeout(t)
  }, [dispatch, navigate])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#09090B] flex items-center justify-center p-4">
      <div className="bg-white border-2 border-gray-900 rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_#000] text-center space-y-4 max-w-md w-full dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[8px_8px_0px_rgba(255,255,255,0.1)]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-emerald-500 text-6xl flex justify-center"
        >
          <FiCheckCircle />
        </motion.div>

        <h1 className="text-2xl font-black uppercase text-gray-900 dark:text-white">
          Payment Successful!
        </h1>
        <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
          ⚡ Study Credits have been added to your account
        </p>
        <p className="text-xs font-semibold text-gray-400">
          Redirecting to home in 4 seconds...
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs border-2 border-gray-900 shadow-[2px_2px_0px_#000] transition"
        >
          Go to Home Now ➔
        </button>
      </div>
    </div>
  )
}

export default PaymentSuccess
