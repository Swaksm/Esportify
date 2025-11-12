// app/wheel/page.tsx
'use client'
import { useState, useEffect } from 'react'

export default function WheelPage() {
  const [spinning, setSpinning] = useState(false)
  const [gain, setGain] = useState<number | null>(null)
  const [tokens, setTokens] = useState<number | null>(null)
  const [cooldown, setCooldown] = useState<number>(0)
  const [message, setMessage] = useState<string | null>(null)

  const getCreds = () => {
    const id = Number(localStorage.getItem('user_id'))
    const pseudo = (localStorage.getItem('pseudo') || '').trim()
    return {
      user_id: Number.isFinite(id) && id > 0 ? id : undefined,
      pseudo: pseudo || undefined,
    }
  }

  useEffect(() => {
    const t = setInterval(() => setCooldown(x => (x > 0 ? x - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])

  async function spinWheel() {
    const { user_id, pseudo } = getCreds()
    if (!user_id && !pseudo) { setMessage('Tu dois être connecté.'); return }
    if (cooldown > 0) return

    setSpinning(true)
    setGain(null)
    setMessage(null)

    try {
      const res = await fetch('/api/wheel/spin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id, pseudo }),
      })
      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        if (res.status === 429 && typeof data?.retry_after === 'number') {
          setCooldown(Math.max(0, data.retry_after))
          setMessage(`Patiente encore ${data.retry_after}s avant de rejouer.`)
        } else {
          setMessage(data?.error || 'Erreur API')
        }
        setSpinning(false)
        return
      }

      setTimeout(() => {
        setSpinning(false)
        const g = Number(data.gain) || 0
        const t = Number(data.tokens) || 0
        setGain(g)
        setTokens(t)
        setCooldown(60)
        setMessage(`🎉 Tu as gagné ${g} tokens !`)
        window.dispatchEvent(new Event('tokens-updated'))
      }, 3000)
    } catch {
      setSpinning(false)
      setMessage('Erreur réseau')
    }
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">🎡 Wheel of Fortune 🎡</h1>
      {message && <p className="mb-2 text-sm opacity-80">{message}</p>}
      <div className="relative">
        <div className={`w-64 h-64 border-[8px] border-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold transition-transform duration-[3000ms] ease-out ${spinning ? 'rotate-[1440deg]' : ''}`}>
          {spinning ? '...' : 'SPIN'}
        </div>
        <button
          disabled={spinning || cooldown > 0}
          onClick={spinWheel}
          className={`mt-6 px-6 py-3 text-lg rounded font-semibold transition ${
            spinning || cooldown > 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {cooldown > 0 ? `Réessaie dans ${cooldown}s` : 'Tourner la roue'}
        </button>
      </div>
      {gain !== null && <p className="mt-6 text-xl">🎉 Tu as gagné <span className="font-bold text-yellow-400">{gain}</span> tokens !</p>}
      {tokens !== null && <p className="mt-2 text-sm opacity-70">Total : <span className="font-semibold">{tokens}</span> tokens</p>}
    </main>
  )
}
