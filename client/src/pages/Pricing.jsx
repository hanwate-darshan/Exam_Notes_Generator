import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function PricingCard({ title, price, amount, credits, description, features, popular, onSelect, paying, payingAmount }) {
  const isCurrentPaying = paying && payingAmount === amount

  return (
    <div className={`relative bg-white dark:bg-[#131926] rounded-2xl p-6 sm:p-8 flex flex-col justify-between border transition-all ${
      popular
        ? "border-indigo-600 dark:border-indigo-500 shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-500/20"
        : "border-slate-200/80 dark:border-white/10 shadow-sm"
    }`}>
      
      {popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-600 text-white shadow-sm">
          Most Popular for Exams
        </span>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{description}</p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-[#111622] rounded-xl border border-slate-200/60 dark:border-white/5 space-y-1">
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{price}</span>
            <span className="text-xs font-semibold text-slate-400">INR</span>
          </div>
          <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <span>⚡</span> {credits}
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Included Features:
          </p>
          <ul className="space-y-2">
            {features.map((feat, i) => (
              <li key={i} className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                  ✓
                </span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={() => onSelect(amount)}
          disabled={paying}
          className={`w-full py-3 px-5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed ${
            popular
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/25 active:scale-95"
              : "bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 shadow-sm active:scale-95"
          }`}
        >
          {isCurrentPaying ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span> Connecting to Stripe...
            </span>
          ) : (
            <span>Activate {credits} →</span>
          )}
        </button>
      </div>

    </div>
  )
}

function Pricing() {
  const [paying, setPaying] = useState(false)
  const [payingAmount, setPayingAmount] = useState(null)

  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount)
      setPaying(true)
      const result = await axios.post(serverUrl + "/api/credit/order", { amount }, { withCredentials: true })

      if (result.data.url) {
        window.location.href = result.data.url
      }
      setPaying(false)
    } catch (error) {
      setPaying(false)
      console.error("Payment error:", error)
      alert("Payment initialization failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-900 dark:bg-[#0B0F17] dark:text-slate-100 transition-colors duration-200">
      
      {/* NAVBAR */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-24">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">
            ⚡ 10 Credits = 1 Complete Multi-Modal Study Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Study Credit Plans
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed font-medium">
            Choose a plan calibrated for your exam timeline. Instant recharge via secure Stripe Checkout.
          </p>
        </div>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

          <PricingCard
            title="Starter Pack"
            price="₹100"
            amount={100}
            credits="50 Credits"
            description="Perfect for mid-term unit tests"
            features={[
              "5 Full Multi-Modal Study Desks",
              "Gemini AI Structured Notes",
              "Curated YouTube Video Shelf",
              "Interactive Mermaid Flowcharts",
              "Print-Ready PDF Downloads"
            ]}
            popular={false}
            onSelect={handlePaying}
            paying={paying}
            payingAmount={payingAmount}
          />

          <PricingCard
            title="Pro Scholar"
            price="₹200"
            amount={200}
            credits="120 Credits"
            description="Calibrated for board & JEE/NEET prep"
            features={[
              "12 Full Multi-Modal Study Desks",
              "Gemini AI Structured Notes",
              "Curated YouTube Video Shelf",
              "Mermaid Flowcharts & Marks Graphs",
              "Rapid 5-Min Recall Sheets",
              "Print-Ready PDF Downloads"
            ]}
            popular={true}
            onSelect={handlePaying}
            paying={paying}
            payingAmount={payingAmount}
          />

          <PricingCard
            title="Topper Pass"
            price="₹500"
            amount={500}
            credits="350 Credits"
            description="Full semester exam revision pass"
            features={[
              "35 Full Multi-Modal Study Desks",
              "Gemini AI Structured Notes",
              "Curated YouTube Video Shelf",
              "Mermaid Flowcharts & Marks Graphs",
              "All Exam Boards Supported",
              "Print-Ready PDF Downloads"
            ]}
            popular={false}
            onSelect={handlePaying}
            paying={paying}
            payingAmount={payingAmount}
          />

        </div>

      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default Pricing
