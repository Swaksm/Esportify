'use client'

import { ReactNode, useEffect, useState } from 'react'

export default function AppWrapper({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 20
        if (next >= 100) {
          clearInterval(interval)
          setProgress(100)
          setTimeout(() => setLoading(false), 100)
        }
        return Math.min(next, 100)
      })
    }, 30)
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 z-50">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">Esportify</h1>
        <div className="w-64 h-4 bg-gray-300 rounded overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-150"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-4 text-gray-700">{progress < 100 ? `Chargement ${Math.round(progress)}%` : 'Prêt !'}</p>
      </div>
    )
  }

  return <>{children}</>
}
