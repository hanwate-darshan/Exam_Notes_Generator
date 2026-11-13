import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function PricingCard({ title, price, amount, credits, description, features, popular, onSelect, paying, payingAmount }) {
  const isCurrentPaying = paying && payingAmount === amount

  return (
    <div className={`relative bg-white border-2 border-gray-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-colors ${
      popular
        ? "shadow-[8px_8px_0px_#4f46e5] border-indigo-600 dark:border-indigo-400"
        : "shadow-[6px_6px_0px_#000]"
    } dark:bg-[#141416] dark:border-zinc-600 dark:shadow-[6px_6px_0px_rgba(255,255,255,0.1)]`}>
      
      {popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-600 text-white border-2 border-gray-900 shadow-[2px_2px_0px_#000]">
          ⭐ Most Popular
        </span>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-black uppercase text-gray-900 dark:text-white">{title}</h3>
          <p className="text-xs font-semibold text-gray-500 dark:text-zinc-400 mt-1">{description}</p>
        </div>

        <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl dark:bg-zinc-800/60 dark:border-zinc-700">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">{price}</span>
            <span className="text-xs font-bold text-gray-500 dark:text-zinc-400">INR</span>
          </div>
          <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 mt-1 flex items-center gap-1.5">
            <span>⚡</span> {credits}
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <p className="text-xs font-black uppercase tracking-wider text-gray-400 dark:text-zinc-500">
            Included Features:
          </p>
          <ul className="space-y-2">
            {features.map((feat, i) => (
              <li key={i} className="text-xs font-bold text-gray-700 dark:text-zinc-300 flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black shrink-0 dark:bg-emerald-950 dark:text-emerald-300">
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
          className={`w-full py-3.5 px-6 rounded-xl font-black text-sm border-2 border-gray-900 shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed ${
            popular
              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
              : "bg-gray-900 hover:bg-black text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-gray-900"
          }`}
        >
          {isCurrentPaying ? (
            <span className="flex items-center gap-2">
              <span className="animate-spin">⏳</span> Connecting to Stripe...
            </span>
          ) : (
            <span>Buy {credits} →</span>
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
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-[#09090B] dark:text-zinc-100 transition-colors duration-200">
      
      {/* NAVBAR */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 md:px-8 pt-2 pb-20 space-y-8">

        {/* HEADER */}
        <div className="text-center space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-50 border-2 border-amber-300 text-amber-800 dark:bg-amber-950/70 dark:border-amber-700 dark:text-amber-300">
            ⚡ 10 Credits = 1 Full Chapter Revision Studio
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
            Study Credit Plans
          </h1>
          <p className="text-sm font-semibold text-gray-600 dark:text-zinc-400 max-w-md mx-auto">
            Choose a plan that fits your examination preparation timeline. Instant activation via Stripe.
          </p>
        </div>

        {/* PRICING CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">

          <PricingCard
            title="Starter"
            price="₹100"
            amount={100}
            credits="50 Credits"
            description="Perfect for mid-term unit tests"
            features={[
              "5 Full Multi-Modal Generations",
              "Gemini AI Exam Notes",
              "Curated YouTube Video Lectures",
              "Mermaid Flowcharts",
              "Instant PDF Export"
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
            description="Best for final boards & JEE/NEET"
            features={[
              "12 Full Multi-Modal Generations",
              "Gemini AI Exam Notes",
              "Curated YouTube Video Lectures",
              "Mermaid Flowcharts & Weightage",
              "Instant PDF Export",
              "Priority Generation Queue"
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
            description="Entire semester exam pass"
            features={[
              "35 Full Multi-Modal Generations",
              "Gemini AI Exam Notes",
              "Curated YouTube Video Lectures",
              "Mermaid Flowcharts & Weightage",
              "Instant PDF Export",
              "All Exam Boards Supported"
            ]}
            popular={false}
            onSelect={handlePaying}
            paying={paying}
            payingAmount={payingAmount}
          />

        </div>

      </main>

      <Footer />
    </div>
  )
}

export default Pricing
