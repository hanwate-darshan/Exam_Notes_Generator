import React from 'react'
import { motion } from "motion/react"
import { FiXCircle } from "react-icons/fi"
import { useNavigate } from 'react-router-dom'

function PaymentFailed() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#09090B] flex items-center justify-center p-4">
      <div className="bg-white border-2 border-gray-900 rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_#000] text-center space-y-4 max-w-md w-full dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[8px_8px_0px_rgba(255,255,255,0.1)]">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-red-500 text-6xl flex justify-center"
        >
          <FiXCircle />
        </motion.div>

        <h1 className="text-2xl font-black uppercase text-gray-900 dark:text-white">
          Payment Cancelled
        </h1>
        <p className="text-sm font-semibold text-gray-600 dark:text-zinc-400">
          Your transaction was not completed. No charges were made.
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate("/pricing")}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs border-2 border-gray-900 shadow-[2px_2px_0px_#000] transition"
          >
            Try Again 💳
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-gray-900 text-gray-900 font-bold text-xs shadow-[2px_2px_0px_#000] transition"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailed
