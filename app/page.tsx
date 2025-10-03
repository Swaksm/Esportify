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
    <div className="flex items-center justify-center h-full min-h-screen">
      <div className="card text-center">
        <h1 className="title">Bienvenue {pseudo} !</h1>
        <p className="subtitle mt-4">
         Ici, vous pouvez perdre 100% de votre capital  … ou gagner jusqu’à 999 999% ! 😎
        </p>
        <button className="btn-primary mt-6">
          GET STARTED
        </button>
      </div>
    </div>
  )
}
