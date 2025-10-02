'use client'

import { useEffect, useState } from 'react'

export default function HomePage() {
  const [pseudo, setPseudo] = useState('Visiteur')

  useEffect(() => {
    const storedPseudo = localStorage.getItem('pseudo')
    if (storedPseudo) {
      setPseudo(storedPseudo)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Bienvenue {pseudo} !
      </h1>
      <p className="mt-4 text-gray-700">
        Ceci est ma première page avec Next.js 13.
      </p>
      <button className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Cliquer ici
      </button>
    </div>
  )
}
